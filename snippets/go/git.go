package git

import (
	"bufio"
	"io"
	"strings"
)

type GitOutput struct {
	Branch      string
	FilesStatus []string
}

func getGitStatus(r io.Reader) GitOutput {
	s := bufio.NewScanner(r)
	var branch string
	for s.Scan() {
		if len(s.Text()) < 1 {
			continue
		}
		branch = parseGitBranch(s.Text())
		break
	}
	var fs []string
	for s.Scan() {
		if len(s.Text()) < 1 {
			continue
		}
		fs = append(fs, s.Text())
	}
	return GitOutput{
		Branch:      branch,
		FilesStatus: fs,
	}
}

func parseGitBranch(input string) string {
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
