package main

import "fmt"

var logCounter int

func log(item interface{}) {
	logCounter++
	fmt.Printf("%d. %v\n", logCounter, item)
}

func main() {
	// Some numbers, please!
	numbers := []int{1, 2, 3, 4, 5}

	log(numbers)      // 1. [1 2 3 4 5]
	log(numbers[2:])  // 2. [3 4 5]
	log(numbers[1:3]) // 3. [2 3]

	// Fun fact: you can't use negative indices!
	//
	// numbers[:-1] from Python won't work. Instead,
	// you are supposed to do this:
	//
	log(numbers[:len(numbers)-1]) // 4. [1 2 3 4]

	// "Terrific" readability, Mr. Pike! Well done!
	//
	// Now let's say I want to append six:
	//
	numbers = append(numbers, 6)

	log(numbers) // 5. [1 2 3 4 5 6]

	// Let's now remove number 3 from it:
	//
	numbers = append(numbers[:2], numbers[3:]...)

	log(numbers) // 6. [1 2 4 5 6]

	// Wanna insert some number? Don't worry, there is
	// a Best Practice in Go!
	//
	numbers = append(numbers[:2], append([]int{3}, numbers[2:]...)...)

	log(numbers) // 7. [1 2 3 4 5 6]

	// In order to copy a slice, here is what you do:
	//
	copiedNumbers := make([]int, len(numbers))
	copy(copiedNumbers, numbers)

	log(copiedNumbers) // 8. [1 2 3 4 5 6]

	// And there's more.
}
