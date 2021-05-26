package main

import (
	"os"
	"text/template"
)

func main() {
	const tmpl = `
<select>
{{range $val := .}}
     <option value="{{$val}}">{{$val}}</option>
{{end}}
</select>
`
	t := template.Must(template.New("tmpl").Parse(tmpl))

	t.Execute(os.Stdout, []int{1, 2, 3})
}
