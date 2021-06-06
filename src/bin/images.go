package main

import (
	"encoding/json"
	"fmt"
	"image"
	"image/gif"
	"image/jpeg"
	"image/png"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strings"
)

func images2Json() {
	files, err := ioutil.ReadDir(paths.Images)
	if err != nil {
		log.Fatal(err)
	}
	var index ImagesIndex
	var indexes []ImagesIndex
	for _, f := range files {
		index.Name = f.Name()
		indexes = append(indexes, index)
	}
	indexesJson, err := json.Marshal(indexes)
	if err != nil {
		log.Fatal(err)
	}
	err = writeFile(paths.ImagesIndexesJson, indexesJson)
	if err != nil {
		log.Fatal(err)
	}
}

func images2Png() {
	fs, err := readDir(paths.Images)
	if err != nil {
		log.Fatal(err)
	}
	for _, f := range fs {
		slice := strings.Split(f.Name(), ".")
		extension := slice[len(slice)-1]
		if extension != "png" {
			inputPath := filepath.Join(paths.Images, f.Name())
			bases := slice[:len(slice)-1]
			basename := strings.Join(bases[:], ".")
			outputPath := filepath.Join(paths.Images, strings.Join([]string{basename, ".png"}, ""))
			err = imageConvert(inputPath, outputPath)
			if err != nil {
				log.Fatal(err)
			}
			filepath.Join()
		}
	}
}

func imageConvert(path string, outPath string) error {
	fmt.Println(path, outPath)
	slice := strings.Split(outPath, ".")
	extension := slice[len(slice)-1]
	f, err := os.Open(path)
	if err != nil {
		return err
	}
	defer f.Close()
	input, _, err := image.Decode(f)
	if err != nil {
		return err
	}
	output, err := os.Create(outPath)
	if err != nil {
		return err
	}
	defer output.Close()
	switch extension {
	case "jpeg", "jpg", "JPEG", "JPG":
		if err = jpeg.Encode(output, input, &jpeg.Options{}); err != nil {
			return err
		}
		log.Printf(strings.Join([]string{"convert ", path, " to ", outPath}, ""))
	case "png", "PNG":
		if err = png.Encode(output, input); err != nil {
			return err
		}
		log.Printf(strings.Join([]string{"convert ", path, " to ", outPath}, ""))
	case "gif", "GIF":
		if err = gif.Encode(output, input, nil); err != nil {
			return err
		}
		log.Printf(strings.Join([]string{"convert ", path, " to ", outPath}, ""))
	}
	return nil
}
