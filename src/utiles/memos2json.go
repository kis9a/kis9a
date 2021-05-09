package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"strings"
)

func main() {
	if len(os.Args) > 1 {
		switch arg := os.Args[1]; arg {
		case "all":
			fmt.Println("all")
			all()
		default:
			fmt.Println("dif")
			diff()
		}
	} else {
		diff()
	}
}

func diff() {
	gs, err := exec.Command("git", "status", "-s").Output()
	checkError(err)
	fmt.Println(string(gs))
}

func all() {
	files, err := ioutil.ReadDir("memos")
	checkError(err)
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
	checkError(err)
	return json
}

func getContentStr(fname string) string {
	fc, err := ioutil.ReadFile("memos/" + fname)
	checkError(err)
	fcStr := string(fc)
	fcStr = strings.ReplaceAll(fcStr, "\n", "")
	fcStr = strings.ReplaceAll(fcStr, " ", "")
	return fcStr
}

func reWriteFile(fname string, fcontent []byte) {
	os.Remove(fname)
	os.Create(fname)
	ioutil.WriteFile(fname, fcontent, 0)
}

func checkError(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
