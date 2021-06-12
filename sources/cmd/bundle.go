package main

import (
	"log"
	"os"
	"path/filepath"

	"github.com/evanw/esbuild/pkg/api"
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
		if err := bundleJS(path); err != nil {
			log.Fatal(err)
		}
	case CSS:
		if err := bundleCSS(path); err != nil {
			log.Fatal(err)
		}
	case HTML:
		if err := minifyHTML(m, path); err != nil {
			log.Fatal(err)
		}
	}
	return nil
}

func bundleJS(path string) error {
	rp, err := filepath.Rel(minifyWalkBase, path)
	if err != nil {
		return err
	}
	wp := filepath.Join(paths.Dist, rp)
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

func bundleCSS(path string) error {
	rp, err := filepath.Rel(minifyWalkBase, path)
	if err != nil {
		return err
	}
	wp := filepath.Join(paths.Dist, rp)
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
