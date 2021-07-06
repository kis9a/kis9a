package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"path/filepath"
)

type MemosContent struct {
	Name    string `json:"name"`
	Content string `json:"content"`
}

type MmoesIndex struct {
	Name string `json:"name"`
	Upt  string `json:"upt"`
}

func allMemos2Json() {
	files, err := ioutil.ReadDir(getMemosPath())
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
	err = writeFile(getMemosIndexesJson(), indexesJson)
	if err != nil {
		log.Fatal(err)
	}
	contentsJson, err := json.Marshal(contents)
	if err != nil {
		log.Fatal(err)
	}
	err = writeFile(getMemosContentsJson(), contentsJson)
	if err != nil {
		log.Fatal(err)
	}
}

func getMemoContentString(name string) (string, error) {
	fs, err := readFile(filepath.Join(getMemosPath(), name))
	if err != nil {
		return "", err
	}
	str := minifyStrings(string(fs))
	return str, err
}
