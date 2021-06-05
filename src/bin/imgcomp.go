package main

import (
	"flag"
	"image"
	"image/gif"
	"image/jpeg"
	"image/png"
	"log"
	"os"
	"path/filepath"
	"strings"
	"sync"
)

type FileType int

const (
	PNG FileType = iota
	JPG
	GIF
	ERR
)

func getFileType(input string) FileType {
	switch input {
	case "jpg":
		fallthrough
	case "jpeg":
		return JPG
	case "png":
		return PNG
	case "gif":
		return GIF
	default:
		return ERR
	}
}

func getFileExtension(input FileType) string {
	switch input {
	case JPG:
		return "jpg"
	case PNG:
		return "png"
	case GIF:
		return "gif"
	default:
		return ""
	}
}

func convert(files []string, outputDir string, fileType FileType) {
	var wg sync.WaitGroup
	for _, currPath := range files {
		wg.Add(1)
		go convertFile(&wg, currPath, outputDir, fileType)
	}

	wg.Wait()
}

func convertFile(wg *sync.WaitGroup, currPath string, outputDir string, fileType FileType) {
	// call done when finished
	defer wg.Done()

	ext := strings.ToLower(filepath.Ext(currPath))
	newExt := getFileExtension(fileType)

	_, filename := filepath.Split(currPath)
	filenameNoExt := filename[0 : len(filename)-len(ext)]
	newFileName := filenameNoExt + "." + newExt
	newFilePath := outputDir + "/" + newFileName

	// validate file type
	startType := getFileType(ext[1:])
	if startType == ERR {
		log.Fatalf("input file type not valid")
	}

	// open files
	file, err := os.Open(currPath)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	outFile := openOrCreate(newFilePath)
	defer outFile.Close()

	// decode
	imageData, _, err := image.Decode(file)
	if err != nil {
		log.Fatalf("error decoding image")
	}

	// encode in new type
	switch fileType {
	case JPG:
		err := jpeg.Encode(outFile, imageData, nil)
		if err != nil {
			log.Fatalf("error converting to jpeg")
		}
	case PNG:
		err := png.Encode(outFile, imageData)
		if err != nil {
			log.Fatal(err)
		}
	case GIF:
		err := gif.Encode(outFile, imageData, nil)
		if err != nil {
			log.Fatalf("error converting to gif")
		}
	}
}

func openOrCreate(filename string) *os.File {
	if _, err := os.Stat(filename); os.IsNotExist(err) {
		file, err := os.Create(filename)
		if err != nil {
			log.Fatalf("error creating output file")
		}
		return file
	} else {
		file, err := os.Open(filename)
		if err != nil {
			log.Fatalf("error opening output file")
		}
		return file
	}
}

func testimg() {
	files, outputDir, fileType := parseConvertInput(os.Args[2:])
	convert(files, outputDir, fileType)
}

func parseConvertInput(args []string) ([]string, string, FileType) {
	fset := flag.NewFlagSet("fset", flag.ContinueOnError)
	typePtr := fset.String("type", "", "Target image type")
	outPtr := fset.String("out", "", "Directory to write to")

	fset.Parse(args)

	if *typePtr == "" || *outPtr == "" {
		log.Fatalf("type or output dir not provided")
	}

	outputPath, err := filepath.Abs(*outPtr)
	if err != nil {
		log.Fatalf("invalid file path")
	}

	outputStat, err := os.Stat(outputPath)
	if err != nil {
		log.Fatalf("error getting outputdir stats")
	}
	if !outputStat.Mode().IsDir() {
		log.Fatalf("output path is not directory")
	}

	targetType := getFileType(*typePtr)
	if targetType == ERR {
		log.Fatalf("invalid target file type")
	}

	files := formatFiles(args[4:])

	return files, outputPath, targetType
}

func parseMergeInput(args []string) ([]string, string) {
	fset := flag.NewFlagSet("fset", flag.ContinueOnError)
	outPtr := fset.String("out", "", "Directory to write to")

	fset.Parse(args)

	if *outPtr == "" {
		log.Fatalf("no output dir specified")
	}

	outputPath, err := filepath.Abs(*outPtr)
	if err != nil {
		log.Fatalf("invalid file path")
	}

	files := formatFiles(args[2:])

	return files, outputPath
}

func formatFiles(args []string) []string {
	cleanedFiles := make([]string, len(args))

	for index, file := range args {
		if _, err := os.Stat(file); os.IsNotExist(err) {
			log.Fatalf("invalid file")
		}

		absPath, err := filepath.Abs(file)
		if err != nil {
			log.Fatalf("invalid file")
		}
		fileStat, err := os.Stat(absPath)
		if err != nil {
			log.Fatalf("error checking input file stats")
		}

		if !fileStat.Mode().IsRegular() {
			log.Fatalf("input file is not a regular file")
		}

		cleanedFiles[index] = absPath
	}

	return cleanedFiles
}
