// Prints the counts, lines and names of files where
// a line is duplicated
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	counts := make(map[string]int)
	lineCountsInFiles := make(map[string]map[string]int)

	for _, filename := range os.Args[1:] {
		f, err := os.Open(filename)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Problem reading %v: %v\n", filename, err)
			continue
		}
		input := bufio.NewScanner(f)
		for input.Scan() {
			line := input.Text()
			counts[line]++
			if lineCountsInFiles[line] == nil {
				lineCountsInFiles[line] = make(map[string]int)
			}
			lineCountsInFiles[line][filename]++
		}
		f.Close()
	}

	for line, n := range counts {
		if n > 1 {
			fmt.Printf("%d, %v\n", n, line)
			for filename, count := range lineCountsInFiles[line] {
				fmt.Printf("\t%d,%v\n", count, filename)
			}
		}
	}
}
