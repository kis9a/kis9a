package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"reflect"
	"strings"
)

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

func typeof(i interface{}) interface{} {
	return reflect.TypeOf(i)
}

func diff() {
	gs, err := execOutput("git status -b -s")
	checkError(err)
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

func buildDiff(files []string) {
	contents, _ := ioutil.ReadFile("src/data/memos-contents.json")
	// fmt.Println(string(contents))
	var slice []string
	err := json.Unmarshal(contents, &slice)
	checkError(err)
	fmt.Println(slice)
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
