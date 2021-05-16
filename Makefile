PROFILE := $(realpath $(dir $(lastword $(MAKEFILE_LIST))))
EXCLUDES := Makefile .git .gitignore
DIRS := $(filter-out $(EXCLUDES), $(wildcard ??*))
.DEFAULT_GOAL := help
DATE := $(shell date +"%F")

all:
	@:

# aliases
p: push
ss: serve-src
sz: serve-zenn
ls: show-list
pbz: publish-zenn
pbs: publish-src
help: show-help

date:
	@echo ${DATE}

push: ## push ${dir}
	@git reset .
	@git add ${dir}/*
	@make check-staged
	@git commit -m "${dir}: update ${DATE}"
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
	@git commit -m "images: update ${DATE}"
	@git push

push-src: ## push src
	@git reset
	@git add ./src/*
	@make check-staged
	@git commit -m "src: update ${DATE}"
	@git push

push-waka: ## push waka
	@git reset
	@git add ./waka/*
	@make check-staged
	@git commit -m "waka: update ${DATE}"
	@git push

push-memos: ## push memos with build
	@git reset
	@git add ./memos/*
	@make check-staged
	@git commit -m "memos: update ${DATE}"
	@git push
	@make ghpush

push-tasks: ## push tasks
	@git reset
	@git add ./tasks/*
	@make check-staged
	@git commit -m "tasks: udpate ${DATE}"
	@git push

push-zenn: ## push zenn
	@git reset
	@git add ./zenn/*
	@make check-staged
	@git commit -m "zenn: update ${DATE}"
	@git push

push-snippets: ## push snippets
	@git reset
	@git add ./snippets/*
	@make check-staged
	@git commit -m "snippets: update ${DATE}"
	@git push

publish-src: ## publish src
	@rm -rf src/memos
	@make memos2json
	@cp -rf memos/ src/memos
	-@(which gh-pages >/dev/null && gh-pages -d src -t)
	-@(which gh-pages >/dev/null || npx gh-pages -d src -t)
	@rm -rf src/memos

publish-zenn: ## publish zenn
	-@(which gh-pages >/dev/null && gh-pages -b zenn -d zenn -t)
	-@(which gh-pages >/dev/null || gh-pages -b zenn -d zenn -t)

serve-src: ## serve src
	-@(which live-server >/dev/null && live-server --port=9000 &)
	-@(which live-server >/dev/null || npx live-server --port=9000 &)

serve-zenn: ## serve zenn
	-@(which zenn >/dev/null && (cd ./zenn; zenn preview -p 7000 &))
	-@(which zenn >/dev/null || (cd ./zenn; npx zenn preview -p 7000 &))

show-list: ## show list dir
	@$(foreach val, $(DIRS), /bin/ls -dF $(val);)

show-help: ## show help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
