package main

import (
	"io/fs"
	"io/ioutil"
	"log"
	"os"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

type TableRow struct {
	Service     string
	Description string
}

const defaultLanguage = "en"

var supportedLanguages = []string{"ar", "cn", "de", "en", "es", "fr", "id", "it", "jp", "ko", "pt", "ru", "th", "tr", "tw", "vi"}

func main() {
	if len(os.Args) > 1 {
		arg := os.Args[1]
		if errMsg := checkLanguageSupport(arg); errMsg != "" {
			log.Fatalf(errMsg)
		}
		if err := output(arg, arg == defaultLanguage); err != nil {
			log.Fatal(err)
		}
	} else {
		for _, lang := range supportedLanguages {
			if err := output(lang, lang == defaultLanguage); err != nil {
				log.Fatal(err)
			}
		}
	}
}

func checkLanguageSupport(lang string) string {
	is := false
	var errMsg string
	for _, v := range supportedLanguages {
		if lang == v {
			is = true
		}
	}
	if is == false {
		errMsg := strings.Join([]string{lang, " language is not supported\nsupported languages:"}, "")
		for _, v := range supportedLanguages {
			errMsg = strings.Join([]string{v, "\n"}, "")
		}
		return errMsg
	}
	return errMsg
}

func getTableRowItems(lang string) ([]TableRow, error) {
	res := []TableRow{}
	baseUrl := "https://aws.amazon.com/"
	url := strings.Join([]string{baseUrl, lang}, "")
	doc, err := goquery.NewDocument(url)
	if err != nil {
		return res, err
	}
	items := doc.Find(".lb-content-item")
	items.Each(func(_ int, item *goquery.Selection) {
		name := item.Find("span").Text()
		description := item.Find("cite").Text()
		path, _ := item.Find("a").Attr("href")
		path = strings.Join([]string{baseUrl, path[1:]}, "")
		name = strings.Join([]string{"[", name, "](", path, ")"}, "")
		res = append(res, TableRow{Service: name, Description: description})
	})
	return res, err
}

func getNav(isDefaultOutput bool) string {
	res := ""
	for _, lang := range supportedLanguages {
		isDefaultLanguage := lang == defaultLanguage
		if isDefaultOutput {
			if !isDefaultLanguage {
				res = strings.Join([]string{res, " | [", lang, "](./languages/README.", lang, ".md)"}, "")
			}
		} else {
			if isDefaultLanguage {
				res = strings.Join([]string{res, " | [", lang, "](../README.md)"}, "")
			} else {
				res = strings.Join([]string{res, " | [", lang, "](./README.", lang, ".md)"}, "")
			}
		}
	}
	return strings.Join([]string{res, " |\n"}, "")
}

func output(lang string, isDefault bool) error {
	var err error
	items, err := getTableRowItems(lang)
	if err != nil {
		return err
	}
	nav := getNav(isDefault)
	tableHeader := "| Service | Description |\n| --- | --- |\n"
	tableContent := ""
	for _, item := range items {
		tableContent = strings.Join([]string{tableContent, "| ", item.Service, " | ", item.Description, " |\n"}, "")
	}
	res := strings.Join([]string{nav, "\n", tableHeader, tableContent}, "")
	if _, err := os.Stat("./languages"); os.IsNotExist(err) {
		if err := os.Mkdir("./languages", 0755); err != nil {
			return err
		}
	}
	if isDefault {
		if err := WriteFile("./README.md", []byte(res), 0644); err != nil {
			return err
		}
	} else {
		if err := WriteFile(strings.Join([]string{"./languages/README.", lang, ".md"}, ""), []byte(res), 0644); err != nil {
			return err
		}
	}
	return err
}

func WriteFile(path string, data []byte, perm fs.FileMode) error {
	return ioutil.WriteFile(path, data, perm)
}
