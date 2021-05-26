package main

import (
	"os"
	"text/template"
)

const tmplStr = `
and: {{and 0 0}} {{and 1 0}} {{and 0 1}} {{and 1 1}}
or: {{or 0 0}} {{or 1 0}} {{or 0 1}} {{or 1 1}}

not: {{not "ok"}} {{0 | not}}

html: {{html "<a href=\"https://golang.org/\">Go</a>"}}
js: {{js "<script>alert('XSS');</script>"}}
urlquery: {{urlquery "http://example.com/path?key=val"}}
slice: {{slice "golang" 1 4}}

eq: {{eq "🍣" "🍣"}}    {{eq "🍣" "🍺"}}    {{eq "🍺" "🍣"}}
ne: {{ne "🍣" "🍣"}}    {{ne "🍣" "🍺"}}    {{ne "🍺" "🍣"}}
lt: {{lt "🍣" "🍣"}}    {{lt "🍣" "🍺"}}    {{lt "🍺" "🍣"}}
le: {{le "🍣" "🍣"}}    {{le "🍣" "🍺"}}    {{le "🍺" "🍣"}}
gt: {{gt "🍣" "🍣"}}    {{gt "🍣" "🍺"}}    {{gt "🍺" "🍣"}}
ge: {{ge "🍣" "🍣"}}    {{ge "🍣" "🍺"}}    {{ge "🍺" "🍣"}}
`

var tmpl = template.Must(template.New("functions").Parse(tmplStr))

func main() {
	if err := tmpl.Execute(os.Stdout, nil); err != nil {
		panic(err)
	}
}
