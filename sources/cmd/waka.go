package main

import (
	"fmt"
	"path/filepath"
)

func waka2Json() {
	wj := filepath.Join(paths.Waka, "wakatime.json")
	oj := filepath.Join(paths.Data, "wakatime.json")
	fmt.Println(wj, oj)
	copyFile(wj, oj)
}
