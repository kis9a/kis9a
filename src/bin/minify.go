package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/tdewolff/minify/v2"
	"github.com/tdewolff/minify/v2/js"
)

func allMinify(data []byte) {
	if err := filepath.Walk(paths.Web, walkMinify); err != nil {
		fmt.Println("ERROR", err)
	}
}

func walkMinify(path string, fi os.FileInfo, err error) error {
	m := minify.New()
	fileType := getFileType(path)
	switch fileType {
	case JS:
		if err := minifyJS(m, path); err != nil {
			log.Fatal(err)
		}
	case CSS:
	case HTML:
	}
	return nil
}

func minifyJS(m *minify.M, path string) error {
	input, err := os.Open(path)
	if err != nil {
		log.Fatal(err)
		return fmt.Errorf(path, "%w", err)
	}
	relPath, err := filepath.Rel(paths.Web, path)
	if err != nil {
		log.Fatal(err)
		return fmt.Errorf(path, "%w", err)
	}
	outPath := filepath.Join(paths.Dist, relPath)
	baseDir := filepath.Dir(outPath)
	if !isExistPath(baseDir) {
		os.MkdirAll(baseDir, 0755)
	}
	output, err := os.Create(outPath)
	if err != nil {
		log.Fatal(err)
	}
	err = js.Minify(m, output, input, nil)
	if err != nil {
		log.Fatal(err)
	}
	return err
}
