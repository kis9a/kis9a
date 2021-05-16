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

type (
	mapf    func(interface{}) interface{}
	reducef func(interface{}, interface{}) interface{}
	filterf func(interface{}) bool
)

type Content struct {
	Name    string `json:"name"`
	Content string `json:"content"`
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
	cjson, err := os.Open("src/data/memos-contents.json")
	checkError(err)
	defer cjson.Close()
	byteValue, _ := ioutil.ReadAll(cjson)
	var c []Content
	json.Unmarshal([]byte(byteValue), &c)

	for _, f := range files {
		fn := strings.Split(f, "/")
		fnn := fn[len(fn)-1]
		Map(c, func(ci interface{}) interface{} {
			if ci.(Content).Name == fnn {
				fmt.Println(typeof(ci.(Content).Content))
				fmt.Println(typeof(getContentStr(fnn)))
				// ci.(Content).Content = getContentStr(fnn)
			}
			return ci
		})
	}
	// fmt.Println(typeof(c))

	// fmt.Println("MAP:", b)

	// for _, f range files {
	// }
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

func Map(in interface{}, fn mapf) interface{} {
	val := reflect.ValueOf(in)
	out := make([]interface{}, val.Len())
	for i := 0; i < val.Len(); i++ {
		out[i] = fn(val.Index(i).Interface())
	}
	return out
}

func Reduce(in interface{}, memo interface{}, fn reducef) interface{} {
	val := reflect.ValueOf(in)
	for i := 0; i < val.Len(); i++ {
		memo = fn(val.Index(i).Interface(), memo)
	}
	return memo
}

func Filter(in interface{}, fn filterf) interface{} {
	val := reflect.ValueOf(in)
	out := make([]interface{}, 0, val.Len())
	for i := 0; i < val.Len(); i++ {
		current := val.Index(i).Interface()

		if fn(current) {
			out = append(out, current)
		}
	}
	return out
}
