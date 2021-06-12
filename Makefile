PROFILE_PATH := $(realpath $(dir $(lastword $(MAKEFILE_LIST))))
PROFILE := $(shell basename $(PROFILE_PATH))
LINKFILES := memos images
EXCLUDES := Makefile .git .gitignore
DIRS := $(filter-out $(EXCLUDES), $(wildcard ??*))
.DEFAULT_GOAL := help
DATE := $(shell date +"%F")

all:
	@:

# aliases
p: push
ss: serve-sources
sz: serve-zenn
ls: show-list
pbz: publish-zenn
pbs: publish-sources
help: show-help

date:
	@echo ${DATE}

push: ## push ${dir}
	@git reset .
	@git add ${dir}/*
	@make check-staged
	@git commit -m "${dir}: update ${DATE}"
	@git push

check-staged:
	@git status --short | grep '^\w.' # show staged files or error stop

images-resize: ## images resize
	@ls ./images | xargs -I {} sips -Z 480 images/{}

publish-sources: ## publish sources
	@rm -rf sources/memos
	@make memos2json
	@cp -rf memos/ sources/memos
	-@(which gh-pages >/dev/null && gh-pages -d sources -t)
	-@(which gh-pages >/dev/null || npx gh-pages -d sources -t)
	@rm -rf sources/memos

publish-zenn: ## publish zenn
	-@(which gh-pages >/dev/null && gh-pages -b zenn -d zenn -t)
	-@(which gh-pages >/dev/null || gh-pages -b zenn -d zenn -t)

link:
	@$(foreach val, $(LINKFILES), ln -sfnv $(abspath $(val)) $(PROFILE_PATH)/sources/dist/data/$(val);)

unlink:
	@$(foreach val, $(LINKFILES), unlink $(PROFILE_PATH)/sources/dist/data/$(val);)

serve-sources: ## serve sources
	@kis9a server

serve-zenn: ## serve zenn
	-@(which zenn >/dev/null && (cd ./zenn; zenn preview -p 7000 &))
	-@(which zenn >/dev/null || (cd ./zenn; npx zenn preview -p 7000 &))

show-list: ## show list dir
	@$(foreach val, $(DIRS), /bin/ls -dF $(val);)

show-help: ## show help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
