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

type CmdMemos struct {
	FlagSet *flag.FlagSet
	Diff    bool
	All     bool
}

type CmdImages struct {
	FlagSet *flag.FlagSet
	Resize  bool
	Convert bool
}

type CmdServer struct {
	FlagSet *flag.FlagSet
	Port    string
}

type CmdMinify struct {
	FlagSet *flag.FlagSet
	Target  string
}

type CmdOptions struct {
	Memos  CmdMemos
	Images CmdImages
	Server CmdServer
	Minify CmdMinify
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
	profile := os.Getenv("PROFILE")
	if profile == "" {
		log.Fatalf("$PROFILE is not found")
	}

	flag.CommandLine.Init("cmd", flag.ExitOnError)
	cmdopts.Memos.FlagSet = flag.NewFlagSet("cmd memos", flag.ExitOnError)
	cmdopts.Images.FlagSet = flag.NewFlagSet("cmd images", flag.ExitOnError)
	cmdopts.Server.FlagSet = flag.NewFlagSet("cmd server", flag.ExitOnError)
	cmdopts.Minify.FlagSet = flag.NewFlagSet("cmd minify", flag.ExitOnError)

	cmdopts.Memos.FlagSet.BoolVar(&cmdopts.Memos.Diff, "d", false, "diff")
	cmdopts.Memos.FlagSet.BoolVar(&cmdopts.Memos.All, "a", false, "all")
	cmdopts.Images.FlagSet.BoolVar(&cmdopts.Images.Resize, "r", false, "resize")
	cmdopts.Images.FlagSet.BoolVar(&cmdopts.Images.Convert, "c", false, "convert")
	cmdopts.Server.FlagSet.StringVar(&cmdopts.Server.Port, "p", "9000", "port")
	cmdopts.Minify.FlagSet.StringVar(&cmdopts.Minify.Target, "t", "all", "minify")

	log.SetFlags(log.LstdFlags | log.Lshortfile)

	// escape
	if len(os.Args) > 1 {
		firstArg := os.Args[1]
		if firstArg == "help" || isFlag(firstArg) {
			showHelp()
		}
	} else {
		showHelp()
	}
}

func showHelp() {
	visit := func(f *flag.Flag) {
		fmt.Println(strings.Join([]string{"  -", f.Name, "\t", f.Usage}, ""))
	}
	fmt.Println("\nimages:")
	cmdopts.Images.FlagSet.VisitAll(visit)
	fmt.Println("\nmemos:")
	cmdopts.Memos.FlagSet.VisitAll(visit)
	fmt.Println("\ndelete:")
	cmdopts.Minify.FlagSet.VisitAll(visit)
	fmt.Println("\nserver:")
	cmdopts.Server.FlagSet.VisitAll(visit)
	os.Exit(0)
}

func main() {
	flag.Parse()
	if flag.NArg() > 0 {
		args := flag.Args()
		switch args[0] {
		case "memos":
			cmdopts.Memos.FlagSet.Parse(args[1:])
			if cmdopts.Memos.Diff {
				diffMemos2Json()
			} else if cmdopts.Memos.All {
				allMemos2Json()
			} else {
				fmt.Println(args[1:])
			}
		case "images":
			cmdopts.Images.FlagSet.Parse(args[1:])
			if cmdopts.Images.Convert {
				images2Png()
			} else if cmdopts.Images.Resize {
				imagesResize()
			} else {
				images2Json()
			}
		case "waka":
			waka2Json()
		case "data":
			cmdopts.Images.FlagSet.Parse(args[1:])
			images2Json()
			allMemos2Json()
			waka2Json()
		case "server":
			cmdopts.Server.FlagSet.Parse(args[1:])
			server(cmdopts.Server.Port)
		case "minify":
			cmdopts.Minify.FlagSet.Parse(args[1:])
			minifySrc()
		case "bundle":
			cmdopts.Minify.FlagSet.Parse(args[1:])
			bundle()
		case "ws":
			cmdopts.Minify.FlagSet.Parse(args[1:])
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
