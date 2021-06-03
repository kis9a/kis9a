package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"io"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"strings"
)

type Content struct {
	Name    string `json:"name"`
	Content string `json:"content"`
}

type Index struct {
	Name string `json:"name"`
	Upt  string `json:"upt"`
}

type Output struct {
	Branch      string
	FilesStatus []string
}

func main() {
	if len(os.Args) > 1 {
		switch arg := os.Args[1]; arg {
		case "all":
			all()
		default:
			diff()
		}
	} else {
		diff()
	}
}

func diff() {
	gs, err := execOutput("git status -b -s")
	if err != nil {
		log.Fatal(err)
	}
	status := ParseShort(gs)
	memos := []string{}
	for _, v := range status.FilesStatus {
		s := strings.Split(v, " ")
		ns := s[len(s)-1]
		nss := strings.Split(ns, "/")[0]
		if strings.TrimSpace(nss) == "memos" {
			memos = append(memos, ns)
		}
	}
	buildDiff(memos)
}

var execOutput = func(c string) (io.Reader, error) {
	out, err := exec.Command("/bin/sh", "-c", c).Output()
	return bytes.NewReader(out), err
}

func ParseShort(r io.Reader) Output {
	s := bufio.NewScanner(r)
	var branch string
	for s.Scan() {
		if len(s.Text()) < 1 {
			continue
		}

		branch = parseBranch(s.Text())
		break
	}
	var fs []string
	for s.Scan() {
		if len(s.Text()) < 1 {
			continue
		}
		fs = append(fs, s.Text())
	}
	return Output{
		Branch:      branch,
		FilesStatus: fs,
	}
}

func parseBranch(input string) string {
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

func all() {
	files, err := ioutil.ReadDir("memos")
	if err != nil {
		log.Fatal(err)
	}
	var indexes []Index
	var contents []Content
	for _, f := range files {
		name := f.Name()
		var index Index
		var content Content
		index.Name = name
		content.Name = name
		index.Upt = f.ModTime().String()
		indexes = append(indexes, index)
		content.Content, err = getContentStr(name)
		if err != nil {
			log.Fatal(err)
		}
		contents = append(contents, content)
	}
	indexesJson, err := json.Marshal(indexes)
	if err != nil {
		log.Fatal(err)
	}
	err = writeFile("src/data/memos-indexes.json", indexesJson)
	if err != nil {
		log.Fatal(err)
	}
	contentsJson, err := json.Marshal(contents)
	if err != nil {
		log.Fatal(err)
	}
	err = writeFile("src/data/memos-contents.json", contentsJson)
	if err != nil {
		log.Fatal(err)
	}
}

func buildDiff(files []string) {
	contentsJson, err := os.Open("src/data/memos-contents.json")
	if err != nil {
		log.Fatal(err)
	}
	defer contentsJson.Close()
	byteValue, err := ioutil.ReadAll(contentsJson)
	if err != nil {
		log.Fatal(err)
	}
	var contents []Content
	err = json.Unmarshal([]byte(byteValue), &contents)
	if err != nil {
		log.Fatal(err)
	}
	for _, f := range files {
		fn := strings.Split(f, "/")
		fnn := fn[len(fn)-1]
		for i, c := range contents {
			if c.Name == fnn {
				c.Content, err = getContentStr(fnn)
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
	err = writeFile("src/data/memos-contents.json", json)
	if err != nil {
		log.Fatal(err)
	}
}

func getContentStr(fname string) (string, error) {
	f, err := readFile("memos/" + fname)
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

func checkError(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
