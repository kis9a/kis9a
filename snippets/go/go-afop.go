package main

import (
	"fmt"
	"reflect"
)

// P.S Appliable Functional Option Pattern (AFOP)

type GreetOpts struct {
	GreetingWord string
}

type option interface {
	Apply(*GreetOpts)
}

type GreetingWord string

func (o GreetingWord) Apply(g *GreetOpts) {
	g.GreetingWord = string(o)
}

func SetGreetingWord(v string) GreetingWord {
	return GreetingWord(v)
}

func Greet(name string, opts ...option) {
	g := &GreetOpts{
		GreetingWord: "Hello",
	}
	for _, opt := range opts {
		opt.Apply(g)
	}

	fmt.Printf("%s, %s!\n", g.GreetingWord, name)
}

func main() {
	Greet("gopher")
	Greet("gopher", SetGreetingWord("Hey"))
	fmt.Println(reflect.DeepEqual(GreetingWord("Hey"), GreetingWord("Hey")))
}
