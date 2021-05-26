package main

import (
	"bytes"
	"fmt"
	"log"
	"text/template"
)

func main() {
	funcMap := template.FuncMap{
		"add": func(a, b int) int { return a + b },
		"sub": func(a, b int) int { return a - b },
		"mul": func(a, b int) int { return a * b },
		"div": func(a, b int) int { return a / b },
	}

	var buf bytes.Buffer
	tp, _ := template.New("test.tpl").Funcs(funcMap).ParseFiles("./test.tpl")
	err := tp.Execute(&buf, nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(buf.String())
}
