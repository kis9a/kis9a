package main

import (
	"reflect"
	"sort"
)

// Sort sorts and deduplicated data.
func Sort(data sort.Interface) int {
	sort.Sort(data)
	return deduplicate(data.Len(), data.Swap, data.Less)
}

// Stable sorts and deduplicates data while keeping the original order of equal elements.
func Stable(data sort.Interface) int {
	sort.Stable(data)
	return deduplicate(data.Len(), data.Swap, data.Less)
}

// IsSorted reports if data is sorted and deduplicated.
func IsSorted(data sort.Interface) bool {
	return isSortedAndDeduplicated(data.Len(), data.Less)
}

// Slice sorts and deduplicates the provided slice given the provided less function.
func Slice(slice interface{}, less func(i, j int) bool) int {
	sort.Slice(slice, less)
	rv := reflect.ValueOf(slice)
	return deduplicate(rv.Len(), reflect.Swapper(slice), less)
}

// SliceStable sorts and deduplicates the provided slice given the provided less function while keeping the original order of equal elements.
func SliceStable(slice interface{}, less func(i, j int) bool) int {
	sort.SliceStable(slice, less)
	rv := reflect.ValueOf(slice)
	return deduplicate(rv.Len(), reflect.Swapper(slice), less)
}

// SliceIsSorted reports if slice is sorted and deduplicated.
func SliceIsSorted(data interface{}, less func(i, j int) bool) bool {
	rv := reflect.ValueOf(data)
	return isSortedAndDeduplicated(rv.Len(), less)
}

func deduplicate(length int, swap func(i, j int), less func(i, j int) bool) int {
	if length < 2 {
		return length
	}
	j := 0
	for i := 1; i < length; i++ {
		if !less(i, j) && !less(j, i) {
			continue
		}
		j++
		swap(i, j)
	}
	return j + 1
}

func isSortedAndDeduplicated(length int, less func(i, j int) bool) bool {
	for i := length - 1; i > 0; i-- {
		if less(i, i-1) || (!less(i, i-1) && !less(i-1, i)) {
			return false
		}
	}
	return true
}
