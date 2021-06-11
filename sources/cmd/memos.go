package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strings"
)

func diffMemos2Json() {
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
				c.Content, err = getMemoContentString(fnn)
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

func allMemos2Json() {
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
		content.Content, err = getMemoContentString(name)
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
	fmt.Println(string(contentsJson))
	err = writeFile(paths.MemosContentsJson, contentsJson)
	if err != nil {
		log.Fatal(err)
	}
}

func getMemoContentString(name string) (string, error) {
	fs, err := readFile(filepath.Join(paths.Memos, name))
	if err != nil {
		return "", err
	}
	str := minifyStrings(string(fs))
	return str, err
}
