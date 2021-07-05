package main

import (
	"html/template"
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
	}
	is, err := isDirectory(path)
	if err != nil {
		return err
	}
	if is {
		err = genHTML(path, base)
		if err != nil {
			return err
		}
	}
	return nil
}

func genHTML(path string, base string) error {
	tpl, err := template.ParseFiles(filepath.Join(getSrcPath(), "layouts/index.html"))
	if err != nil {
		return err
	}
	rp, err := filepath.Rel(base, path)
	if err != nil {
		return err
	}
	wp := filepath.Join(getDistPath(), rp, "index.html")
	nf, err := os.Create(wp)
	if err != nil {
		return err
	}
	defer nf.Close()
	err = tpl.Execute(nf, nil)
	if err != nil {
		return err
	}
	m := minify.New()
	if err := toMinifyHTML(m, wp, wp); err != nil {
		return err
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

func isDirectory(path string) (bool, error) {
	fileInfo, err := os.Stat(path)
	if err != nil {
		return false, err
	}
	return fileInfo.IsDir(), err
}
