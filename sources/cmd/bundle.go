package main

import (
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"

	"github.com/evanw/esbuild/pkg/api"
	"github.com/tdewolff/minify/v2"
	"github.com/tdewolff/minify/v2/html"
)

func bundle() error {
	if err := bundlePages(); err != nil {
		return err
	}
	if err := bundleComponents(); err != nil {
		return err
	}
	return nil
}

func bundlePages() error {
	pages := filepath.Join(getSrcPath(), "pages")
	bundleWalk := func(path string, fi os.FileInfo, err error) error {
		fmt.Println(path)
		if err != nil {
			return err
		}
		if err := bundleByFileType(path, pages); err != nil {
			return err
		}
		return nil
	}
	if err := filepath.Walk(pages, bundleWalk); err != nil {
		return err
	}
	return nil
}

func bundleComponents() error {
	components := filepath.Join(getSrcPath(), "components")
	bundleWalk := func(path string, fi os.FileInfo, err error) error {
		fmt.Println(path)
		if err != nil {
			return err
		}
		if fi.IsDir() {
			return filepath.SkipDir
		}
		if err := bundleByFileType(path, components); err != nil {
			return err
		}
		return nil
	}
	if err := filepath.Walk(components, bundleWalk); err != nil {
		return err
	}
	return nil
}

func getBundleWp(path string, base string) (string, error) {
	name := filepath.Base(base)
	rp, err := filepath.Rel(base, path)
	if err != nil {
		return "", err
	}
	if name == "pages" {
		return filepath.Join(getDistPath(), rp), err
	} else {
		return filepath.Join(getDistPath(), name, rp), err
	}
}

func bundleByFileType(path string, base string) error {
	wp, err := getBundleWp(path, base)
	if err != nil {
		return err
	}
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
	wp, err := getBundleWp(filepath.Join(path, "index.html"), base)
	if err != nil {
		return err
	}
	nf, err := os.Create(wp)
	if err != nil {
		return err
	}
	defer nf.Close()
	err = tpl.Execute(nf, nil)
	if err != nil {
		return err
	}
	wfs, err := ioutil.ReadFile(wp)
	m := htmlMinifier()
	str, err := m.String("text/html", string(wfs))
	if err != nil {
		log.Fatal(err)
	}
	err = ioutil.WriteFile(wp, []byte(str), 0644)
	if err != nil {
		log.Fatal(err)
	}
	return nil
}

func htmlMinifier() *minify.M {
	m := minify.New()
	m.AddFunc("text/html", html.Minify)
	return m
}

func copyFileToDist(path string, base string) error {
	rp, err := filepath.Rel(base, path)
	if err != nil {
		return err
	}
	wp := filepath.Join(getDistPath(), rp)
	copyFile(path, wp)
	return err
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
