package main

import "fmt"

// Functional Option Pattern

type GreetOpts struct {
	GreetingWord string
}

type option func(*GreetOpts)

// GreetingWord引数を設定する関数
func GreetingWord(v string) option {
	return func(g *GreetOpts) {
		g.GreetingWord = v
	}
}

func Greet(name string, opts ...option) {
	// デフォルトパラメータを定義
	g := &GreetOpts{
		GreetingWord: "Hello",
	}

	// ユーザーから渡された値だけ上書き
	for _, opt := range opts {
		opt(g)
	}

	fmt.Printf("%s, %s!\n", g.GreetingWord, name)
}

func main() {
	Greet("gopher")                      // Hello, gopher!
	Greet("gopher", GreetingWord("Hey")) // Hey, gopher!
}
