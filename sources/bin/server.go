package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/fsnotify/fsnotify"
)

func server(port string) {
	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		log.Fatal(err)
	}
	defer watcher.Close()
	watchSrcDir := func(path string, fi os.FileInfo, err error) error {
		if fi.Mode().IsDir() {
			return watcher.Add(path)
		}
		return nil
	}
	done := make(chan bool)
	go func() {
		for {
			select {
			case event, ok := <-watcher.Events:
				if !ok {
					return
				}
				if event.Op&fsnotify.Write == fsnotify.Write {
					path := event.Name
					bundleByFileType(path)
					log.Println("Wrote", path)
				}
			case err, ok := <-watcher.Errors:
				if !ok {
					return
				}
				log.Println(err)
			}
		}
	}()
	if err := filepath.Walk(paths.Src, watchSrcDir); err != nil {
		log.Println(err)
	}
	fs := http.FileServer(http.Dir(paths.Dist))
	http.Handle("/", fs)
	port = strings.Join([]string{":", port}, "")
	log.Println("Listening...", port)
	err = http.ListenAndServe(port, nil)
	if err != nil {
		log.Fatal(err)
	}
	<-done
}
