#!/usr/bin/env bash

get_memo() {
	local memo_names=($(ls "$MEMOS"))
	local memo_name
	local memo_content
	local json

	for memo_name in "${memo_names[@]}"; do
		memo_content=$(cat $MEMOS/"$memo_name")
		json=$(jq -n '$ARGS.named' --arg name "$memo_name" --arg content "$memo_content")
		echo "$json"
	done
}

main() {
	local result
	result=$(get_memo)
	echo "$result" | jq -s >"$KIS9A"/src/memos.json
}

main
