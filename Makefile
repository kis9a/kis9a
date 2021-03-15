.DEFAULT_GOAL := help

null:
	@:

tasks-push: # push tasks
	@git reset
	@git add ./tasks/*
	@git commit -m "tasks: udpate"
	@git push

cv-push: # push cv
	@git reset
	@git add ./cv/*
	@git commit -m "cv: update"
	@git push

images-push: # push images
	@ls ./images | xargs -I {} sips -Z 720 images/{}
	@git reset
	@git add ./images/*
	@git commit -m "images: update"
	@git push

src-push: # push src
	@git reset
	@git add ./src/*
	@git commit -m "src: update"
	@git push

memos-push: # push memos
	@make memos2json
	@git reset
	@git add ./memos/*
	@git add ./src/memos.json
	@git commit -m "memos: update"
	@git push
	@rm -rf src/memos
	@cp -rf memos/ src/memos
	@npx gh-pages -d src -t

memos2json: # memos export json
	# MEMO if only names: @tree memos -J | jq '.[0].contents | .[] | { "name": .name }'  > ./src/memos.json
	@bash ./src/memos2json.sh

help: # show commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
