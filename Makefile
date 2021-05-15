PROFILE := $(realpath $(dir $(lastword $(MAKEFILE_LIST))))
EXCLUDES := Makefile .git .gitignore
DIRS := $(filter-out $(EXCLUDES), $(wildcard ??*))
.DEFAULT_GOAL := help

all:
	@:

# aliases
p: push
s: server
ls: show-list
help: show-help

push: ## push ${dir}
	@git reset .
	@git add ${dir}/*
	@make check-staged
	@git commit -m "update: ${dir}"
	@git push

test-staged:
	@echo "start"
	@make check-staged
	@echo "end"

check-staged:
	@git status --short | grep '^\w.' # show staged files or error stop

images-resize: ## images resize
	@ls ./images | xargs -I {} sips -Z 480 images/{}

images-format: ## images format
	# (cd ./images; ls -1 *.jpg | xargs -n 1 bash -c 'convert "$0" "${0%.jpg}.png"')
	# (cd ./images; ls | xargs -I {} -n 1 bash -c 'sips -s format ')

memos2json: ## memos export json
	# MEMO if only names: @tree memos -J | jq '.[0].contents | .[] | { "name": .name }'  > ./src/data/memos.json
	# @bash ./src/utiles/memos2json.sh
	# @go run ./src/utiles/memos2json.go
	@go run ./src/utiles/memos2json.go all

push-images: ## push optimized images
	@make images-resize
	@make images-format
	@git reset
	@git add ./images/*
	@make check-staged
	@git commit -m "images: update"
	@git push

push-src: ## push src
	@git reset
	@git add ./src/*
	@make check-staged
	@git commit -m "src: update"
	@git push

push-memos: ## push memos with build
	@git reset
	@git add ./memos/*
	@git add ./src/memos.json
	@make check-staged
	@git commit -m "memos: update"
	@git push
	@make ghpush

push-tasks: ## push tasks
	@git reset
	@git add ./tasks/*
	@make check-staged
	@git commit -m "tasks: udpate"
	@git push

push-cv: ## push cv
	@git reset
	@git add ./cv/*
	@make check-staged
	@git commit -m "cv: update"
	@git push

push-gh: ## push src to gh-pages
	@rm -rf src/memos
	@make memos2json
	@cp -rf memos/ src/memos
	@npx gh-pages -d src -t
	-@(which curl >/dev/null && gh-pages -d src -t)
	-@(which curl >/dev/null || npx gh-pages -d src -t)
	@rm -rf src/memos

server: ## live-server --port 9000
	-@(which curl >/dev/null && live-server --port=9000)
	-@(which curl >/dev/null || npx live-server --port=9000)

show-list: ## show list dir
	@$(foreach val, $(DIRS), /bin/ls -dF $(val);)

show-help: ## show help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
