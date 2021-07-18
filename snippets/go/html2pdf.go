package main

import (
	"fmt"
	"log"

	"github.com/SebastiaanKlippert/go-wkhtmltopdf"
)

func main() {
	// Create new PDF generator
	pdfg, err := wkhtmltopdf.NewPDFGenerator()
	if err != nil {
		log.Fatal(err)
	}
	tmp1 := "./tmp/tmp1.html"
	tmp2 := "./tmp/tmp2.html"
	tmp3 := "./tmp/tmp3.html"

	pdfg.AddPage(wkhtmltopdf.NewPage(tmp1))
	pdfg.AddPage(wkhtmltopdf.NewPage(tmp2))
	pdfg.AddPage(wkhtmltopdf.NewPage(tmp3))

	// PDF作成
	err = pdfg.Create()
	if err != nil {
		log.Fatal(err)
	}

	// 出力
	err = pdfg.WriteFile("./test.pdf")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("tada!")
}
