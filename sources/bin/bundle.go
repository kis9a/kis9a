package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/tdewolff/minify/v2"
)

func bundle() {
	pages := filepath.Join(paths.Src, "pages")
	minifyWalkBase = pages
	if err := filepath.Walk(pages, bundleWalk); err != nil {
		log.Fatal(err)
	}
}

func bundleWalk(path string, fi os.FileInfo, err error) error {
	if err != nil {
		log.Fatal(err)
	}
	bundleByFileType(path)
	return nil
}

func bundleByFileType(path string) error {
	m := minify.New()
	ft := getFileType(path)
	pages := filepath.Join(paths.Src, "pages")
	minifyWalkBase = pages
	switch ft {
	case JS:
		fmt.Println(path, minifyWalkBase)
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
