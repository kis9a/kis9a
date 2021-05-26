package main

import (
	"html/template"
	"net/http"
	"strconv"
)

var funcMap = template.FuncMap{
	"minus": minus,
}

const tmpl = `
<html><body>
    <div>
        <span>{{minus 1 2}}</span>
    </div>
</body></html>`

var tmplGet = template.Must(template.New("").Funcs(funcMap).Parse(tmpl))

func minus(a, b int64) string {
	return strconv.FormatInt(a-b, 10)
}

func getPageHandler(w http.ResponseWriter, r *http.Request) {
	if err := tmplGet.Execute(w, nil); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func main() {
	http.HandleFunc("/", getPageHandler)
	http.ListenAndServe(":8080", nil)
}

// t, err := template.New("").Funcs(template.FuncMap{
//     "makeGoName": makeGoName,
//     "makeDBName": makeDBName,
// }).ParseFiles("templates/struct.tpl")
