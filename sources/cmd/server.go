package main

import (
	"log"
	"net/http"
	"os"
	"os/exec"
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
					bundle()
				}
			case err, ok := <-watcher.Errors:
				if !ok {
					return
				}
				log.Println(err)
			}
		}
	}()
	if err := filepath.Walk(getSrcPath(), watchSrcDir); err != nil {
		log.Println(err)
	}
	if commandExists("live-server") {
		var cmd string
		if port != "" {
			cmd = strings.Join([]string{"live-server ", getDistPath(), " --port=", port}, "")
		} else {
			cmd = strings.Join([]string{"live-server ", getDistPath()}, "")
		}
		log.Println("Listening...", port)
		_, err := execOutput(cmd)
		if err != nil {
			log.Fatal(err)
		}
	} else {
		fs := http.FileServer(http.Dir(getDistPath()))
		http.Handle("/", fs)
		port = strings.Join([]string{":", port}, "")
		log.Println("Listening...", port)
		err = http.ListenAndServe(port, nil)
	}
	<-done
}

func commandExists(cmd string) bool {
	if _, err := exec.LookPath(cmd); err != nil {
		return false
	} else {
		return true
	}
}

func ws() {
	port := cmdopts.Server.Port
	fs := http.FileServer(http.Dir(getDistPath()))
	http.Handle("/", fs)
	port = strings.Join([]string{":", port}, "")
	log.Println("Listening...", port)
	err := http.ListenAndServe(port, nil)
	if err != nil {
		log.Fatal(err)
	}
}
