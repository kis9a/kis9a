package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
)

type Post struct {
	Id      int     `json:"id"`
	Author  string  `json:"author"`
	Content string  `json:"content"`
	Comment Comment `json:"comment"`
	Books   []Book  `json:"books"`
}

type Comment struct {
	Comment_id int    `json:"comment_id"`
	Message    string `json:"message"`
}

type Book struct {
	Book_id int    `json:"book_id"`
	Title   string `json:"title"`
}

func main() {
	// read json
	fmt.Println("===== Read json =====")
	json_file, err := os.Open("./json_sample.json")
	if err != nil {
		fmt.Println("Error opening", err)
		return
	}
	defer json_file.Close()

	json_data, err := ioutil.ReadAll(json_file)
	if err != nil {
		fmt.Println("Error reading", err)
		return
	}

	var post_read Post
	json.Unmarshal(json_data, &post_read)
	fmt.Println(post_read)
	fmt.Println(post_read.Comment.Message)
	fmt.Println(post_read.Books[2].Title)

	// write json
	fmt.Println("===== Write json =====")
	post_write := Post{
		Id:     11111,
		Author: "hey",
		Comment: Comment{
			Comment_id: 999999,
			Message:    "sugeeeeeee",
		},
		Books: []Book{
			Book{
				Book_id: 1004,
				Title:   "shika",
			},
			Book{
				Book_id: 2006,
				Title:   "aki",
			},
			Book{
				Book_id: 4005,
				Title:   "niti",
			},
		},
	}

	fmt.Println(post_write)
	output, err := json.MarshalIndent(&post_write, "", "\t")
	if err != nil {
		fmt.Println("Error marshalling", err)
		return
	}
	err = ioutil.WriteFile("json_output.json", output, 0644)
	if err != nil {
		fmt.Println("Error write file", err)
		return
	}
}
