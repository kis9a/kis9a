package main

import (
	"io/ioutil"
	"log"
	"os"
	"strings"
)

func main() {
	// get all files in directory
	files, err := ioutil.ReadDir(".")
	// check error
	if err != nil {
		log.Println(err)
	}
	// go through all the files
	for _, file := range files {
		// check if it's a txt file (can change this)
		if strings.HasSuffix(file.Name(), "txt") { // you can change this
			// read the lines
			line, _ := ioutil.ReadFile(file.Name())
			// turn the byte slice into string format
			strLine := string(line)
			// split the lines by a space, can also change this
			lines := strings.Split(strLine, " ")
			// remove the duplicates from lines slice (from func we created)
			RemoveDuplicates(&lines)
			// get the actual file
			f, err := os.OpenFile(file.Name(), os.O_APPEND|os.O_WRONLY, 0600)
			// err check
			if err != nil {
				log.Println(err)
			}
			// delete old one
			os.Remove(file.Name())
			// create it again
			os.Create(file.Name())
			// go through your lines
			for e := range lines {
				// write to the file without the duplicates
				f.Write([]byte(lines[e] + " ")) // added a space here, but you can change this
			}
			// close file
			f.Close()
		}
	}
}

func RemoveDuplicates(lines *[]string) {
	found := make(map[string]bool)
	j := 0
	for i, x := range *lines {
		if !found[x] {
			found[x] = true
			(*lines)[j] = (*lines)[i]
			j++
		}
	}
	*lines = (*lines)[:j]
}
