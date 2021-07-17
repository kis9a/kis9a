package main

import (
	"log"
	"os"
	"strings"
	"text/template"

	"github.com/PuerkitoBio/goquery"
)

const tmplStr = `
export const {{.Name}} = '{{.Svg}}'
`

func main() {
	url := "https://heroicons.dev"
	doc, err := goquery.NewDocument(url)
	if err != nil {
		log.Fatal(err)
	}
	tmpl := template.Must(template.New("call").Parse(tmplStr))
	items := doc.Find(".pb-full")
	items.Each(func(_ int, item *goquery.Selection) {
		name := strings.Join([]string{"svg-", item.Find("p").Text()}, "")
		svg, err := item.Find("svg").Parent().Html()
		if err != nil {
			log.Fatal(err)
		}
		data := map[string]interface{}{
			"Name": name,
			"Svg":  svg,
		}
		if err := tmpl.Execute(os.Stdout, data); err != nil {
			panic(err)
		}
	})
}
