.DEFAULT_GOAL := help

null:
	@:

tasks-push:
	@git reset
	@git add ./tasks/*
	@git commit -m "tasks: udpate"
	@git push

cv-push:
	@git reset
	@git add ./cv/*
	@git commit -m "cv: update"
	@git push

images-push:
	# TODO: compression and fix size of images
	@git reset
	@git add ./images/*
	@git commit -m "images: update"
	@git push

src-push:
	@git reset
	@git add ./src/*
	@git commit -m "src: update"
	@git push

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
