package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"strings"
)

func main() {
	files, err := ioutil.ReadDir("memos")
	if err != nil {
		log.Fatal(err)
	}
	indexes, contents := make([]map[string]interface{}, 0, 0), make([]map[string]interface{}, 0, 0)
	for _, file := range files {
		fname := file.Name()
		index, content := make(map[string]interface{}), make(map[string]interface{})
		index["name"], content["name"] = fname, fname
		index["upt"] = file.ModTime().String()
		indexes = append(indexes, index)
		content["content"] = getContentStr(fname)
		contents = append(contents, content)
	}
	reWriteFile("src/data/memos-indexes.json", arr2json(indexes))
	reWriteFile("src/data/memos-contents.json", arr2json(contents))
}

func arr2json(arr []map[string]interface{}) []byte {
	json, err := json.Marshal(arr)
	if err != nil {
		log.Fatal(err)
	}
	return json
}

func getContentStr(fname string) string {
	fc, err := ioutil.ReadFile("memos/" + fname)
	if err != nil {
		log.Fatal(err)
	}
	fcStr := string(fc)
	fcStr = strings.ReplaceAll(fcStr, "\n", "")
	fcStr = strings.ReplaceAll(fcStr, " ", "")
	fmt.Println(fcStr)
	return fcStr
}

func reWriteFile(fname string, fcontent []byte) {
	os.Remove(fname)
	os.Create(fname)
	ioutil.WriteFile(fname, fcontent, 0)
}
