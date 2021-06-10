package main

import (
	"flag"
	"fmt"
	"math"
	"os"
	"regexp"
	"strings"
)

var regex = regexp.MustCompile("^-v+$")

// 引数からメッセージ詳細度を算出する。算出に使わなかった引数は戻り値のスライスに返却する。
func Verbosity(xs []string) (int, []string) {
	var v float64
	others := make([]string, 0, len(xs))
	for _, x := range xs {
		if regex.MatchString(x) {
			v = math.Max(v, float64(strings.Count(x, "v")))
		} else {
			others = append(others, x)
		}
	}
	return int(v), others
}

func main() {
	help := flag.NewFlagSet("help", flag.ExitOnError)
	var verbosity int
	help.IntVar(&verbosity, "verbosity", 0, "")

	money := flag.NewFlagSet("money", flag.ExitOnError)
	if len(os.Args) == 1 {
		fmt.Println("usage: argparse <command> [<args>]")
		fmt.Println("\thelp: ヘルプをプリントします")
		fmt.Println("\tmoney: 為替レートを調べます")
		return
	}

	switch os.Args[1] {
	case "help":
		v, others := Verbosity(os.Args[2:])
		// fmt.Println()
		help.Parse(others)
		if verbosity < v {
			// e.g. <cmd> help -verbosity=0 -vvv
			// help.Set("verbosity", strconv.Itoa(v))
		}
	case "money":
		money.Parse(os.Args[2:])
	default:
		fmt.Printf("%q is not valid command.\n", os.Args[1])
		os.Exit(2)
	}

	if help.Parsed() {
		message := "Help me."
		if verbosity == 1 {
			message = "Help me!"
		}
		if verbosity == 2 {
			message = "Help me!!"
		}
		if verbosity >= 3 {
			message = "HELP ME!!"
		}
		fmt.Println(message)
	}

	if money.Parsed() {
		if len(money.Args()) < 2 {
			// e.g. $ <cmd> money USD
			fmt.Println("エラー: 通貨をふたつ入力してください")
			return
		}

		from, to := money.Arg(0), money.Arg(1)
		if from == "" || to == "" {
			// e.g. $ <cmd> money USD ''
			fmt.Println("エラー: 通貨をふたつ入力してください")
			return
		}
		fmt.Printf("%v/%v: 100円/$\n", from, to) // 適当
	}
}

// $ go run foo.go help -verbosity=0 -vvv
// # => HELP ME!!

// $ go run foo.go help -vv
// # => Help me!!

// $ go run foo.go money USD JPY
// # => USD/JPY: 100円/$
