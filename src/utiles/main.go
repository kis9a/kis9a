package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"flag"
	"io"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

type MemosContent struct {
	Name    string `json:"name"`
	Content string `json:"content"`
}

type MmoesIndex struct {
	Name string `json:"name"`
	Upt  string `json:"upt"`
}

type ImagesIndex struct {
	Name string `json:"name"`
}

type GitOutput struct {
	Branch      string
	FilesStatus []string
}

type CmdMemos struct {
	FlagSet *flag.FlagSet
	Diff    bool
}

type CmdImages struct {
	FlagSet *flag.FlagSet
}

type PATHS struct {
	Memos             string
	MemosContentsJson string
	MemosIndexesJson  string
	ImagesIndexesJson string
	Images            string
	Tasks             string
	Waka              string
	Data              string
}

type CmdOptions struct {
	Memos  CmdMemos
	Images CmdImages
}

var (
	paths   PATHS
	cmdopts CmdOptions
)

func init() {
	profile := os.Getenv("PROFILE")
	paths.Memos = filepath.Join(profile, "memos")
	paths.Images = filepath.Join(profile, "images")
	paths.Data = filepath.Join(profile, "src/data")
	paths.MemosContentsJson = filepath.Join(paths.Data, "/memos-contents.json")
	paths.MemosIndexesJson = filepath.Join(paths.Data, "/memos-indexes.json")
	paths.ImagesIndexesJson = filepath.Join(paths.Data, "/images-indexes.json")

	flag.CommandLine.Init("cmd", flag.ExitOnError)
	cmdopts.Memos.FlagSet = flag.NewFlagSet("cmd memos", flag.ExitOnError)
	cmdopts.Memos.FlagSet.BoolVar(&cmdopts.Memos.Diff, "d", false, "diff")
}

func main() {
	flag.Parse()
	if flag.NArg() > 0 {
		args := flag.Args()
		switch args[0] {
		case "memos":
			cmdopts.Memos.FlagSet.Parse(args[1:])
			if cmdopts.Memos.Diff {
				buildMemosDiff()
			} else {
				buildMemosAll()
			}
		case "images":
			buildImages()
		}
	}
}

func buildImages() {
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

func buildMemosDiff() {
	gs, err := execOutput("git status -b -s")
	if err != nil {
		log.Fatal(err)
	}
	gitStatus := getGitStatus(gs)
	memos := []string{}
	for _, v := range gitStatus.FilesStatus {
		s := strings.Split(v, " ")
		ns := s[len(s)-1]
		nss := strings.Split(ns, "/")[0]
		if strings.TrimSpace(nss) == "memos" {
			memos = append(memos, ns)
		}
	}
	contentsJson, err := os.Open(paths.MemosContentsJson)
	if err != nil {
		log.Fatal(err)
	}
	defer contentsJson.Close()
	byteValue, err := ioutil.ReadAll(contentsJson)
	if err != nil {
		log.Fatal(err)
	}
	var contents []MemosContent
	err = json.Unmarshal([]byte(byteValue), &contents)
	if err != nil {
		log.Fatal(err)
	}
	for _, f := range memos {
		fn := strings.Split(f, "/")
		fnn := fn[len(fn)-1]
		for i, c := range contents {
			if c.Name == fnn {
				c.Content, err = getContentString(fnn)
				if err != nil {
					log.Fatal(err)
				}
			}
			contents[i] = c
		}
	}
	json, err := json.Marshal(contents)
	if err != nil {
		log.Fatal(err)
	}
	err = writeFile(paths.MemosContentsJson, json)
	if err != nil {
		log.Fatal(err)
	}
}

func getGitStatus(r io.Reader) GitOutput {
	s := bufio.NewScanner(r)
	var branch string
	for s.Scan() {
		if len(s.Text()) < 1 {
			continue
		}
		branch = parseGitBranch(s.Text())
		break
	}
	var fs []string
	for s.Scan() {
		if len(s.Text()) < 1 {
			continue
		}
		fs = append(fs, s.Text())
	}
	return GitOutput{
		Branch:      branch,
		FilesStatus: fs,
	}
}

func parseGitBranch(input string) string {
	s := bufio.NewScanner(strings.NewReader(input))
	s.Split(bufio.ScanWords)
	s.Scan()
	if s.Text() != "##" {
		return ""
	}
	s.Scan()
	b := strings.Split(s.Text(), "...")
	return b[0]
}

func buildMemosAll() {
	files, err := ioutil.ReadDir(paths.Memos)
	if err != nil {
		log.Fatal(err)
	}
	var indexes []MmoesIndex
	var contents []MemosContent
	for _, f := range files {
		name := f.Name()
		var index MmoesIndex
		var content MemosContent
		index.Name = name
		content.Name = name
		index.Upt = f.ModTime().String()
		indexes = append(indexes, index)
		content.Content, err = getContentString(name)
		if err != nil {
			log.Fatal(err)
		}
		contents = append(contents, content)
	}
	indexesJson, err := json.Marshal(indexes)
	if err != nil {
		log.Fatal(err)
	}
	err = writeFile(paths.MemosIndexesJson, indexesJson)
	if err != nil {
		log.Fatal(err)
	}
	contentsJson, err := json.Marshal(contents)
	if err != nil {
		log.Fatal(err)
	}
	err = writeFile(paths.MemosContentsJson, contentsJson)
	if err != nil {
		log.Fatal(err)
	}
}

func getContentString(name string) (string, error) {
	f, err := readFile(filepath.Join(paths.Memos, name))
	if err != nil {
		return "", err
	}
	str := string(f)
	str = strings.ReplaceAll(str, "\n", "")
	str = strings.ReplaceAll(str, " ", "")
	return str, err
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
