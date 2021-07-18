package main

import (
	"log"

	"github.com/h2non/bimg"
)

func main() {
	buffer, err := bimg.Read("input.pdf")
	if err != nil {
		log.Fatal(err)
	}

	jpg, err := bimg.NewImage(buffer).Convert(bimg.PNG)
	if err != nil {
		log.Fatal(err)
	}

	thumb, err := bimg.NewImage(jpg).Resize(256, 256)
	if err != nil {
		log.Fatal(err)
	}

	bimg.Write("thumb.png", thumb)
}
