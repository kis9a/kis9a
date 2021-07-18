package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
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

type MemosCategory struct {
	Name  string   `json:"name"`
	Files []string `json:"files"`
}

func allMemos2Json() {
	files, err := ioutil.ReadDir(getMemosPath())
	if err != nil {
		log.Fatal(err)
	}
	var indexes []MmoesIndex
	var contents []MemosContent
	mapCategory := make(map[string][]string)
	for _, f := range files {
		name := f.Name()
		var index MmoesIndex
		var content MemosContent
		index.Name = name
		content.Name = name

		// indexes
		index.Upt = f.ModTime().String()
		indexes = append(indexes, index)

		// contents
		content.Content, err = getMemoContentString(name)
		if err != nil {
			log.Fatal(err)
		}
		contents = append(contents, content)

		// categories
		cname := strings.Split(name, ".")[0]
		cname = strings.Split(cname, "-")[0]
		mapCategory[cname] = append(mapCategory[cname], name)
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
	var categories []MemosCategory
	for i, c := range mapCategory {
		var category MemosCategory
		category.Name = i
		category.Files = c
		categories = append(categories, category)
	}
	categoriesJson, err := json.Marshal(categories)
	if err != nil {
		log.Fatal(err)
	}
	err = writeFile(getMemosCategoriesJson(), categoriesJson)
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
