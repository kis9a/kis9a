package main

import (
	"flag"
	"fmt"
)

type Add struct {
	FlagSet *flag.FlagSet
	Verbose bool
	Force   bool
}

type Commit struct {
	FlagSet *flag.FlagSet
	Verbose bool
	Signoff bool
}

type Options struct {
	Add     Add
	Commit  Commit
	Version bool

	// サブコマンド含め全てに共通するフラグ
	UserName string
}

var o Options

func init() {
	flag.CommandLine.Init("cmd", flag.ExitOnError)

	o.Add.FlagSet = flag.NewFlagSet("cmd add", flag.ExitOnError)
	o.Add.FlagSet.BoolVar(&o.Add.Verbose, "v", false, "describe")
	o.Add.FlagSet.BoolVar(&o.Add.Force, "f", false, "describe")

	o.Commit.FlagSet = flag.NewFlagSet("cmd commit", flag.ExitOnError)
	o.Commit.FlagSet.BoolVar(&o.Commit.Verbose, "v", false, "describe")
	o.Commit.FlagSet.BoolVar(&o.Commit.Signoff, "s", false, "describe")

	fmt.Println("adfasdf")

	flag.BoolVar(&o.Version, "version", false, "output version information and exit")
	flag.StringVar(&o.UserName, "name", "", "describe")
	fmr.Println("hell")
}

func main() {
	flag.Parse()
	// if o.Version {
	// 	fmt.Fprintf(os.Stderr, "%s v0.0.1\n", flag.CommandLine.Name())
	// 	os.Exit(2)
	// }

	// if flag.NArg() > 0 {
	// 	args := flag.Args()
	// 	switch args[0] {
	// 	case "add":
	// 		o.Add.FlagSet.Parse(args[1:])
	// 	case "commit":
	// 		o.Commit.FlagSet.Parse(args[1:])
	// 	}
	// }

	// fmt.Println("Commit - verbose:", o.Commit.Verbose,
	//     ", signoff:", o.Commit.Signoff)
	// fmt.Println("Add - verbose:", o.Add.Verbose,
	//     ", force:", o.Add.Force)
	// fmt.Println("UserName:", o.UserName)
}
