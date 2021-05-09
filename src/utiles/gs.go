package main

import (
	"bufio"
	"bytes"
	"fmt"
	"io"
	"log"
	"os"
	"os/exec"
	"strings"
)

type Output struct {
	Branch      string
	FilesStatus []string
}

func main() {
	args := os.Args[1:]

	if len(args) < 1 {
		log.Fatalf("please, provide a git repository as command argument")
	}

	out, err := GetShortStatus(args[0])
	if err != nil {
		log.Fatalf("unable to read git repository status : %s", err.Error())
	}

	status := ParseShort(out)

	fmt.Println("Branch is ", status.Branch)
	for _, fs := range status.FilesStatus {
		fmt.Printf("    %s\n", fs)
	}
}

// Parse parses a git status output command
// It is compatible with the short version of the git status command
func ParseShort(r io.Reader) Output {
	s := bufio.NewScanner(r)

	var branch string
	// Extract branch name
	for s.Scan() {
		// Skip any empty line
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

	// check if input is a status branch line output
	s.Scan()
	if s.Text() != "##" {
		return ""
	}

	// read next word and return the branch name
	s.Scan()
	b := strings.Split(s.Text(), "...")
	return b[0]
}

// GetShortStatus read the git status of the repository located at path
func GetShortStatus(path string) (io.Reader, error) {
	return execOutput(fmt.Sprintf("git -C %s status -s -b --porcelain", path))
}

// It is useful to declare a var instead of a function for testing purpose
var execOutput = func(c string) (io.Reader, error) {
	out, err := exec.Command("/bin/sh", "-c", c).Output()

	return bytes.NewReader(out), err
}
