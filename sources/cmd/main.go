package main

import (
	"bytes"
	"flag"
	"fmt"
	"io"
	"io/fs"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

type CmdImages struct {
	FlagSet *flag.FlagSet
	Resize  bool
	Convert bool
}

type CmdServer struct {
	FlagSet *flag.FlagSet
	Port    string
}

type CmdOptions struct {
	Images CmdImages
	Server CmdServer
}

var (
	profile string
	cmdopts CmdOptions
)

type FileType int

const (
	PNG FileType = iota
	JPEG
	GIF
	JS
	CSS
	HTML
	JSON
	SVG
	UNKNOWN
)

func init() {
	profile = os.Getenv("PROFILE")
	if profile == "" {
		log.Fatalf("$PROFILE is not found")
	}
	flag.CommandLine.Init("kis9a", flag.ExitOnError)
	cmdopts.Images.FlagSet = flag.NewFlagSet("kis9a images", flag.ExitOnError)
	cmdopts.Server.FlagSet = flag.NewFlagSet("kis9a server", flag.ExitOnError)
	cmdopts.Images.FlagSet.BoolVar(&cmdopts.Images.Resize, "r", false, "resize")
	cmdopts.Images.FlagSet.BoolVar(&cmdopts.Images.Convert, "c", false, "convert")
	cmdopts.Server.FlagSet.StringVar(&cmdopts.Server.Port, "p", "9000", "port")
	log.SetFlags(log.LstdFlags | log.Lshortfile)
}

func main() {
	flag.Parse()
	if flag.NArg() > 0 {
		args := flag.Args()
		switch args[0] {
		case "memos":
			allMemos2Json()
		case "images":
			cmdopts.Images.FlagSet.Parse(args[1:])
			if cmdopts.Images.Convert {
				images2Png()
			} else if cmdopts.Images.Resize {
				imagesResize()
			} else {
				images2Json()
			}
		case "data":
			initializeData()
		case "dist":
			err := initializeDist()
			log.Fatal(err)
		case "server":
			cmdopts.Server.FlagSet.Parse(args[1:])
			server(cmdopts.Server.Port)
		case "bundle":
			bundle()
		case "ws":
			ws()
		}
	}
}

func readDir(path string) ([]fs.FileInfo, error) {
	return ioutil.ReadDir(path)
}

func readFile(path string) ([]byte, error) {
	return ioutil.ReadFile(path)
}

func writeFile(path string, data []byte) error {
	return ioutil.WriteFile(path, data, 0666)
}

func execOutput(c string) (io.Reader, error) {
	out, err := exec.Command("/bin/sh", "-c", c).Output()
	return bytes.NewReader(out), err
}

func minifyStrings(str string) string {
	str = removeParagraph(str)
	return removeParagraph(str)
}

func removeParagraph(str string) string {
	return strings.ReplaceAll(str, "\n", "")
}

func removeWhiteSpace(str string) string {
	return strings.ReplaceAll(str, " ", "")
}

func isExistPath(path string) bool {
	_, err := os.Stat(path)
	return !os.IsNotExist(err)
}

func copyFile(from, to string) error {
	bd := filepath.Dir(to)
	if !isExistPath(bd) {
		os.MkdirAll(bd, 0755)
	}
	f, err := ioutil.ReadFile(from)
	if err != nil {
		log.Fatal(err)
	}
	err = ioutil.WriteFile(to, f, 0644)
	if err != nil {
		log.Fatal(err)
	}
	return err
}

func changeExt(path string, ext string) string {
	return strings.Join([]string{path[:len(path)-len(filepath.Ext(path))], ext}, "")
}

func withoutExt(fname string) string {
	ext := filepath.Ext(fname)
	return fname[:len(fname)-len(ext)]
}

func getFileType(path string) FileType {
	extension := filepath.Ext(path)
	switch extension {
	case ".jpeg", ".jpg", ".JPEG", ".JPG":
		return JPEG
	case ".png", ".PNG":
		return PNG
	case ".gif", ".GIF":
		return GIF
	case ".js":
		return JS
	case ".css":
		return CSS
	case ".html":
		return HTML
	case ".json":
		return JSON
	case ".svg":
		return SVG
	}
	return UNKNOWN
}

func isYes(msg string) bool {
	var r string
	fmt.Println(strings.Join([]string{msg, " [y/n]"}, ""))
	fmt.Scan(&r)
	return r == "y" || r == "Y"
}

func isFlag(str string) bool {
	return strings.HasPrefix(str, "-")
}

func getImagesPath() string {
	return filepath.Join(profile, "images")
}

func getSourcesPath() string {
	return filepath.Join(profile, "sources")
}

func getDistPath() string {
	return filepath.Join(getSourcesPath(), "dist")
}

func getDataPath() string {
	return filepath.Join(getDistPath(), "/data")
}

func getWakaPath() string {
	return filepath.Join(profile, "waka")
}

func getMemosPath() string {
	return filepath.Join(profile, "memos")
}

func getMemosIndexesJson() string {
	return filepath.Join(getDataPath(), "memos-indexes.json")
}

func getMemosContentsJson() string {
	return filepath.Join(getDataPath(), "memos-contents.json")
}

func getImagesIndexesJson() string {
	return filepath.Join(getDataPath(), "images-indexes.json")
}

func getSrcPath() string {
	return filepath.Join(getSourcesPath(), "src")
}

func waka2Json() {
	copyFile(filepath.Join(getWakaPath(), "wakatime.json"),
		filepath.Join(getDataPath(), "wakatime.json"))
}

func initializeData() {
	if !isExistPath(getDataPath()) {
		os.MkdirAll(getDistPath(), 0755)
	}
	images2Json()
	allMemos2Json()
	waka2Json()
}

func initializeDist() error {
	initializeData()
	if !isExistPath(getDistPath()) {
		os.MkdirAll(getDistPath(), 0755)
	}
	err := copyAssetsDirectory()
	if err != nil {
		return err
	}
	if err = bundlePages(); err != nil {
		return err
	}
	return err
}

func copyAssetsDirectory() error {
	dir := filepath.Join(getSrcPath(), "assets")
	walk := func(path string, fi os.FileInfo, err error) error {
		fmt.Println(path)
		rp, err := filepath.Rel(getSrcPath(), path)
		if err != nil {
			return err
		}
		if !fi.IsDir() {
			wp := filepath.Join(getDistPath(), rp)
			if err := copyFile(path, wp); err != nil {
				return err
			}
		}
		return nil
	}
	if err := filepath.Walk(dir, walk); err != nil {
		return err
	}
	return nil
}
