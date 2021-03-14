.DEFAULT_GOAL := help

null:
	@:

memos-push:
	@git reset
	@git add ./memos/*
	@git add ./src/memos.json
	@git commit -m "memos: update"
	@git push

memos2json:
	@tree memos -J | jq '.[0].contents | .[] | { "name": .name }'  > ./src/memos.json

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
