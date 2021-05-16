package main

import (
	"encoding/json"
	"fmt"
)

func main() {
	id := [5]string{"1", "2", "3", "4", "5"}
	name := [5]string{"A", "B", "C", "D", "E"}

	parseData := make([]map[string]interface{}, 0, 0)

	for counter, _ := range id {
		singleMap := make(map[string]interface{})
		singleMap["id"] = id[counter]
		singleMap["name"] = name[counter]
		parseData = append(parseData, singleMap)
	}
	b, _ := json.Marshal(parseData)
	fmt.Println(string(b))
}
