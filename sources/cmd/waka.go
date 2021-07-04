package main

import (
	"fmt"
	"path/filepath"
)

func waka2Json() {
	wj := filepath.Join(getWakaPath(), "wakatime.json")
	oj := filepath.Join(getWakaPath(), "wakatime.json")
	fmt.Println(wj, oj)
	copyFile(wj, oj)
}
