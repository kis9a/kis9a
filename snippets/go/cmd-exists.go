package main

import (
	"log"
	"os/exec"
)

func main() {
	path, err := exec.LookPath("ls")
	if err != nil {
		log.Fatal(err)
	}
	
	log.Println(path) // bin/ls
}

// as util
func commandExists(cmd string) bool {
	_, err := exec.LookPath(cmd)
	return err == nil
}
