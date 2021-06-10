package main

import (
	"log"
	"os"
	"path/filepath"

	"github.com/tdewolff/minify/v2"
)

func bundleWalk() {
	pages := filepath.Join(paths.Src, "pages")
	minifyWalkBase = pages
	if err := filepath.Walk(pages, bundleByFileType); err != nil {
		log.Fatal(err)
	}
}

func bundleByFileType(path string, fi os.FileInfo, err error) error {
	if err != nil {
		log.Fatal(err)
	}
	m := minify.New()
	ft := getFileType(path)
	switch ft {
	case JS:
		if err := bundleJS(path); err != nil {
			log.Fatal(err)
		}
	case CSS:
		if err := minifyCSS(m, path); err != nil {
			log.Fatal(err)
		}
	case HTML:
		if err := minifyHTML(m, path); err != nil {
			log.Fatal(err)
		}
	}
	return nil
}
