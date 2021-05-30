package main

import (
	"fmt"
	"io/fs"
	"io/ioutil"
	"log"
	"os"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

type Item struct {
	Service     string
	Description string
}

func getItems(lang string) []Item {
	baseUrl := "https://aws.amazon.com/"
	url := strings.Join([]string{baseUrl, lang}, "")
	doc, err := goquery.NewDocument(url)
	if err != nil {
		log.Fatal(err)
	}
	res := []Item{}
	items := doc.Find(".lb-content-item")
	items.Each(func(_ int, item *goquery.Selection) {
		name := item.Find("span").Text()
		description := item.Find("cite").Text()
		path, _ := item.Find("a").Attr("href")
		path = strings.Join([]string{baseUrl, path[1:]}, "")
		name = strings.Join([]string{"[", name, "](", path, ")"}, "")
		res = append(res, Item{Service: name, Description: description})
	})
	return res
}

func outputItem(items []Item, langs []string, lang string, isDef bool) {
	header := "| Service | Description |\n| - | - |\n"
	content := ""
	for _, item := range items {
		content = strings.Join([]string{content, "| ", item.Service, " | ", item.Description, " |\n"}, "")
	}
	navs := getNavs(langs, isDef)
	res := strings.Join([]string{navs, header, content}, "")
	fmt.Println(res)
	if _, err := os.Stat("./languages"); os.IsNotExist(err) {
		if err := os.Mkdir("./languages", 0755); err != nil {
			log.Fatal(err)
		}
	}
	if isDef {
		if err := WriteFile("./README.md", []byte(res), 0644); err != nil {
			log.Fatal(err)
		}
	}
	if err := WriteFile(strings.Join([]string{"./languages/README.", lang, ".md"}, ""), []byte(res), 0644); err != nil {
		log.Fatal(err)
	}
}

func getNavs(langs []string, isDef bool) string {
	res := ""
	for _, lang := range langs {
		if isDef {
			res = strings.Join([]string{res, " | [", lang, "](./languages/README.", lang, ".md)"}, "")
		} else {
			res = strings.Join([]string{res, " | [", lang, "](./README.", lang, ".md)"}, "")
		}
	}
	res = strings.Join([]string{res, " |\n"}, "")
	return res
}

func WriteFile(path string, data []byte, perm fs.FileMode) error {
	err := ioutil.WriteFile(path, data, perm)
	return err
}

func checkLanguageSupport(langs []string, lang string) {
	is := false
	for _, v := range langs {
		if lang == v {
			is = true
		}
	}
	if is == false {
		fmt.Println(lang + " language is not supported\nsupported languages:")
		for _, v := range langs {
			fmt.Println(v)
		}
		os.Exit(0)
	}
}

func main() {
	defaultLanguage := "en"
	supportedLanguages := []string{"ar", "cn", "de", "en", "es", "fr", "id", "it", "jp", "ko", "pt", "ru", "th", "tr", "tw", "vi"}
	if len(os.Args) > 1 {
		arg := os.Args[1]
		items := getItems(arg)
		checkLanguageSupport(supportedLanguages, arg)
		outputItem(items, supportedLanguages, arg, arg == defaultLanguage)
	} else {
		for _, lang := range supportedLanguages {
			items := getItems(lang)
			checkLanguageSupport(supportedLanguages, lang)
			outputItem(items, supportedLanguages, lang, lang == defaultLanguage)
		}
	}
}
