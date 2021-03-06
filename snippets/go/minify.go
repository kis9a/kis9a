package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/evanw/esbuild/pkg/api"
	"github.com/tdewolff/minify/v2"
	"github.com/tdewolff/minify/v2/css"
	"github.com/tdewolff/minify/v2/html"
	"github.com/tdewolff/minify/v2/js"
	"github.com/tdewolff/minify/v2/json"
	"github.com/tdewolff/minify/v2/svg"
)

var minifyWalkBase = paths.Src

func minifySrc() {
	minifyWalkBase = paths.Src
	if err := filepath.Walk(minifyWalkBase, minifyWalk); err != nil {
		log.Fatal(err)
	}
}

func minifyWalk(path string, fi os.FileInfo, err error) error {
	if err != nil {
		log.Println(err)
	}
	minifyByFileType(path)
	return nil
}

func minifyByFileType(path string) {
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
	case JSON:
		if err := minifyJson(m, path); err != nil {
			log.Fatal(err)
		}
	case SVG:
		if err := minifySVG(m, path); err != nil {
			log.Fatal(err)
		}
	default:
		fs, err := os.Stat(path)
		if err != nil {
			log.Println(err)
		}
		if !fs.IsDir() {
			copyFileToDist(path)
		}
	}
}

func getMinifyRW(path string) (*os.File, *os.File, error) {
	var r *os.File
	var w *os.File
	var err error
	r, err = os.Open(path)
	if err != nil {
		return r, w, err
	}
	rp, err := filepath.Rel(minifyWalkBase, path)
	if err != nil {
		return r, w, err
	}
	wp := filepath.Join(paths.Dist, rp)
	bd := filepath.Dir(wp)
	if !isExistPath(bd) {
		os.MkdirAll(bd, 0755)
	}
	w, err = os.Create(wp)
	if err != nil {
		return r, w, err
	}
	return r, w, err
}

func bundleJS(path string) error {
	var err error
	rp, err := filepath.Rel(minifyWalkBase, path)
	if err != nil {
		return err
	}
	wp := filepath.Join(paths.Dist, rp)
	fmt.Println(wp)
	result := api.Build(api.BuildOptions{
		EntryPoints:       []string{path},
		Outfile:           wp,
		Bundle:            true,
		Write:             true,
		MinifyIdentifiers: true,
		MinifySyntax:      true,
		MinifyWhitespace:  true,
	})

	if len(result.Errors) > 0 {
		os.Exit(1)
	}
	return err
}

func minifyJS(m *minify.M, path string) error {
	r, w, err := getMinifyRW(path)
	if err != nil {
		return err
	}
	err = js.Minify(m, w, r, nil)
	if err != nil {
		return err
	}
	return err
}

func minifyCSS(m *minify.M, path string) error {
	r, w, err := getMinifyRW(path)
	if err != nil {
		return err
	}
	err = css.Minify(m, w, r, nil)
	if err != nil {
		return err
	}
	return err
}

func minifyHTML(m *minify.M, path string) error {
	r, w, err := getMinifyRW(path)
	if err != nil {
		return err
	}
	err = html.Minify(m, w, r, nil)
	if err != nil {
		return err
	}
	return err
}

func minifyJson(m *minify.M, path string) error {
	r, w, err := getMinifyRW(path)
	if err != nil {
		log.Fatal(err)
	}
	err = json.Minify(m, w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
	return err
}

func minifySVG(m *minify.M, path string) error {
	r, w, err := getMinifyRW(path)
	if err != nil {
		log.Fatal(err)
	}
	err = svg.Minify(m, w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
	return err
}

func copyFileToDist(path string) error {
	rp, err := filepath.Rel(minifyWalkBase, path)
	if err != nil {
		return err
	}
	wp := filepath.Join(paths.Dist, rp)
	copyFile(path, wp)
	return err
}
