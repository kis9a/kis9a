package main

import (
	"encoding/json"
	"image"
	"image/gif"
	"image/jpeg"
	"image/png"
	"io/ioutil"
	"log"
	"math"
	"os"
	"path/filepath"

	"golang.org/x/image/draw"
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
		fname := f.Name()
		fbase := filepath.Base(fname)
		ext := filepath.Ext(fname)
		if ext != ".png" {
			inputPath := filepath.Join(paths.Images, f.Name())
			pngfs := changeExt(fbase, ".png")
			outputPath := filepath.Join(paths.Images, pngfs)
			err = imageConvert(inputPath, outputPath)
			if err != nil {
				log.Fatal(err)
			}
		}
	}
}

func imageConvert(path string, outPath string) error {
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
	if err := imageEncode(path, input, output); err != nil {
		log.Fatal(err)
	} else {
		log.Println("convert ", input, " to ", output)
	}
	return nil
}

func imageEncode(path string, input image.Image, output *os.File) error {
	var err error
	ft := getFileType(path)
	switch ft {
	case JPEG:
		if err = jpeg.Encode(output, input, &jpeg.Options{Quality: 100}); err != nil {
			return err
		}
	case PNG:
		if err = png.Encode(output, input); err != nil {
			return err
		}
	case GIF:
		if err = gif.Encode(output, input, nil); err != nil {
			return err
		}
	}
	return nil
}

func imagesResize() {
	fs, err := readDir(paths.Images)
	if err != nil {
		log.Fatal(err)
	}
	for _, f := range fs {
		err = imageResize(f.Name())
		if err != nil {
			log.Fatal(err)
		}
	}
}

func imageResize(path string) error {
	data, err := os.Open(path)
	if err != nil {
		return err
	}
	defer data.Close()
	imgData, _, err := image.Decode(data)
	if err != nil {
		return err
	}
	imgRectangle := imgData.Bounds()
	width := imgRectangle.Dx()
	height := imgRectangle.Dy()
	limitEdge := 750
	newImgData := &image.RGBA{}
	if height >= width {
		f := float64((width * limitEdge))
		w := math.Round(f / float64(height))
		newImgData = image.NewRGBA(image.Rect(0, 0, int(w), limitEdge))
	} else {
		f := float64((limitEdge * height))
		h := math.Round(f / float64(width))
		newImgData = image.NewRGBA(image.Rect(0, 0, int(h), limitEdge))
	}
	draw.CatmullRom.Scale(newImgData, newImgData.Bounds(), imgData, imgRectangle, draw.Over, nil)
	newImg, err := os.Create(path)
	if err != nil {
		return err
	}
	defer newImg.Close()
	if err := imageEncode(path, newImgData, newImg); err != nil {
		log.Fatal(err)
	}
	return err
}
