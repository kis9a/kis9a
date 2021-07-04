package main

import (
	"log"
	"os"
	"path/filepath"

	"github.com/evanw/esbuild/pkg/api"
	"github.com/tdewolff/minify/v2"
)

func bundlePages() error {
	pages := filepath.Join(getSrcPath(), "pages")
	bundleWalk := func(path string, fi os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if err := bundleByFileType(path, pages); err != nil {
			log.Println(err)
		}
		return nil
	}
	if err := filepath.Walk(pages, bundleWalk); err != nil {
		log.Fatal(err)
	}
	return nil
}

func bundleByFileType(path string, base string) error {
	rp, err := filepath.Rel(base, path)
	if err != nil {
		return err
	}
	wp := filepath.Join(getDistPath(), rp)
	m := minify.New()
	ft := getFileType(path)
	switch ft {
	case JS:
		if err := bundleJS(path, wp); err != nil {
			return err
		}
	case CSS:
		if err := bundleCSS(path, wp); err != nil {
			return err
		}
	case HTML:
		if err := minifyHTML(m, path); err != nil {
			return err
		}
	}
	return nil
}

func bundleJS(path string, wp string) error {
	var err error
	result := api.Build(api.BuildOptions{
		EntryPoints:       []string{path},
		Outfile:           wp,
		Bundle:            true,
		Write:             true,
		MinifyIdentifiers: true,
		MinifySyntax:      true,
		MinifyWhitespace:  true,
		Incremental:       true,
		AllowOverwrite:    true,
	})
	if len(result.Errors) > 0 {
		log.Println(result.Errors)
		return err
	}
	return err
}

func bundleCSS(path string, wp string) error {
	var err error
	result := api.Build(api.BuildOptions{
		EntryPoints:       []string{path},
		Outfile:           wp,
		Bundle:            true,
		Write:             true,
		MinifyIdentifiers: true,
		MinifySyntax:      true,
		MinifyWhitespace:  true,
		Incremental:       true,
		AllowOverwrite:    true,
	})
	if len(result.Errors) > 0 {
		log.Println(result.Errors)
		return err
	}
	return err
}
