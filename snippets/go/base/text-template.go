package main

import (
	"math"
	"os"
	"text/template"
)

type Point struct {
	X float64
	Y float64
}

func Distance(a, b Point) float64 {
	return math.Sqrt((a.X-b.X)*(a.X-b.X) + (a.Y-b.Y)*(a.Y-b.Y))
}

const tmplStr = `
p1: {{printf "%#v" .p1}}
p2: {{printf "%#v" .p2}}
{{/* {{.distance .p1 .p2}} はダメ */}}
distance: {{call .distance .p1 .p2}}
`

var tmpl = template.Must(template.New("call").Parse(tmplStr))

func main() {
	data := map[string]interface{}{
		"p1":       Point{X: 3.0, Y: 0.0},
		"p2":       Point{X: 0.0, Y: 4.0},
		"distance": Distance,
	}
	if err := tmpl.Execute(os.Stdout, data); err != nil {
		panic(err)
	}
}
