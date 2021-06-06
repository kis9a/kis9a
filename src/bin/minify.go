package main

import (
	"log"
	"os"
	"path/filepath"

	"github.com/tdewolff/minify/v2"
	"github.com/tdewolff/minify/v2/js"
)

func allMinify(data []byte) {
	inputPath := filepath.Join(paths.Src, "bin", "test.js")
	outputPath := filepath.Join(paths.Src, "bin", "minify.test.js")
	input, err := os.Open(inputPath)
	if err != nil {
		log.Fatal(err)
	}
	output, err := os.Create(outputPath)
	err = js.Minify(minify.New(), output, input, nil)
	if err != nil {
		log.Fatal(err)
	}
}
