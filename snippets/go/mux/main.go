package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

// Books Struct (Model)
type Book struct {
	ID     string  `json:"id"`
	Isbn   string  `json:"isbn"`
	Title  string  `json:"title"`
	Author *Author `json:"author"`
}

// Author Struct (Model)
type Author struct {
	FirstName string `json:"firstname"`
	Lastname  string `json:"lastname"`
}

// Initialize Books
var books []Book

// Get All Books
// curl http://localhost:8000/api/books
func getBooks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(books)

}

// Get Single Book
// curl http://localhost:8000/api/books/{id}
func getBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	// Loop throught books and find with id
	for _, item := range books {
		if item.ID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
	json.NewEncoder(w).Encode(&Book{})
}

// Create a Book
// curl -X POST -H "Content-Type: application/json" -d '{ "isbn": "222222", "title": "Books Three", "author": { "firstname": "App", "lastname": "Mux" } }' localhost:8000/api/books
func createBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var book Book
	_ = json.NewDecoder(r.Body).Decode(&book)
	book.ID = strconv.Itoa(rand.Intn(1000))
	books = append(books, book)
	json.NewEncoder(w).Encode(book)
}

// Update a Book
// curl -X PUT -H "Content-Type: application/json" -d '{ "isbn": "222222", "title": "New title", "author": { "firstname": "App", "lastname": "New" } }' localhost:8000/api/books/1
func updateBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, item := range books {
		if item.ID == params["id"] {
			// delete
			books = append(books[:index], books[index+1:]...)
			var book Book
			_ = json.NewDecoder(r.Body).Decode(&book)
			// create
			book.ID = strconv.Itoa(rand.Intn(1000))
			books = append(books, book)
			json.NewEncoder(w).Encode(book)
			return
		}
	}
}

// Delete a Book
// curl -X DELETE localhost:8000/api/books/{id}
func deleteBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, item := range books {
		if item.ID == params["id"] {
			books = append(books[:index], books[index+1:]...)
			break
		}
	}
	json.NewEncoder(w).Encode(books)
}

// app.get('', (req, res))

func main() {
	fmt.Println(`
// Route Handler / Endpoints
r.HandleFunc("/api/books", getBooks).Methods("GET")
r.HandleFunc("/api/books/{id}", getBook).Methods("GET")
r.HandleFunc("/api/books", createBook).Methods("POST")
r.HandleFunc("/api/books/{id}", updateBook).Methods("PUT")
r.HandleFunc("/api/books/{id}", deleteBook).Methods("DELETE")

// Get All Books
curl http://localhost:8000/api/books

// Get Single Book
curl http://localhost:8000/api/books/{id}

// Create a Book
curl -X POST -H "Content-Type: application/json" -d '{ "isbn": "222222", "title": "Books Three", "author": { "firstname": "App", "lastname": "Mux" } }' localhost:8000/api/books

// Update a Book
curl -X PUT -H "Content-Type: application/json" -d '{ "isbn": "222222", "title": "New title", "author": { "firstname": "App", "lastname": "New" } }' localhost:8000/api/books/1

// Listen Port
log.Fatal(http.ListenAndServe(":8000", r))
  `)
	r := mux.NewRouter()

	books = append(books, Book{ID: "1", Isbn: "12", Title: "Books One", Author: &Author{FirstName: "Jack", Lastname: "Hey"}})
	books = append(books, Book{ID: "2", Isbn: "13", Title: "Books Two", Author: &Author{FirstName: "Marry", Lastname: "Pick"}})

	// var age int = 35
	// age := 35

	// Route Handler / Endpoints
	r.HandleFunc("/api/books", getBooks).Methods("GET")
	r.HandleFunc("/api/books/{id}", getBook).Methods("GET")
	r.HandleFunc("/api/books", createBook).Methods("POST")
	r.HandleFunc("/api/books/{id}", updateBook).Methods("PUT")
	r.HandleFunc("/api/books/{id}", deleteBook).Methods("DELETE")

	log.Fatal(http.ListenAndServe(":8000", r))

}
