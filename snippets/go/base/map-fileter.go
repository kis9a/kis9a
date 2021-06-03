package main

import "reflect"

type (
	mapf    func(interface{}) interface{}
	reducef func(interface{}, interface{}) interface{}
	filterf func(interface{}) bool
)

func Map(in interface{}, fn mapf) interface{} {
	val := reflect.ValueOf(in)
	out := make([]interface{}, val.Len())
	for i := 0; i < val.Len(); i++ {
		out[i] = fn(val.Index(i).Interface())
	}
	return out
}

func Reduce(in interface{}, memo interface{}, fn reducef) interface{} {
	val := reflect.ValueOf(in)
	for i := 0; i < val.Len(); i++ {
		memo = fn(val.Index(i).Interface(), memo)
	}
	return memo
}

func Filter(in interface{}, fn filterf) interface{} {
	val := reflect.ValueOf(in)
	out := make([]interface{}, 0, val.Len())
	for i := 0; i < val.Len(); i++ {
		current := val.Index(i).Interface()

		if fn(current) {
			out = append(out, current)
		}
	}
	return out
}
