PROFILE_PATH := $(realpath $(dir $(lastword $(MAKEFILE_LIST))))
PROFILE_NAME := $(shell basename $(PROFILE_PATH))
LINKFILES := memos images
EXCLUDES := Makefile .git .gitignore
DIRS := $(filter-out $(EXCLUDES), $(wildcard ??*))
DATE := $(shell date +"%F")
.DEFAULT_GOAL := help

ss: serve-sources
sz: serve-zenn
ls: show-list
pbz: publish-zenn
pbs: publish-sources
help: show-help

install: ## install
	@$(0) sources/install

push: ## push ${dir}
	@git reset .
	@git add ${dir}
	@make check-staged
	@git commit -m "${dir}: update ${DATE} ${msg}"
	@git push

publish-sources: ## publish sources
	-@(which gh-pages >/dev/null && gh-pages -b dist -d sources/dist -t)
	-@(which gh-pages >/dev/null || npx gh-pages -b dist -d sources/dist -t)

publish-zenn: ## publish zenn
	-@(which gh-pages >/dev/null && gh-pages -b zenn -d zenn -t)
	-@(which gh-pages >/dev/null || gh-pages -b zenn -d zenn -t)

serve-sources: ## serve sources
	@${PROFILE_NAME} server

serve-zenn: ## serve zenn
	-@(which zenn >/dev/null && (cd ./zenn; zenn preview -p 7000 &))
	-@(which zenn >/dev/null || (cd ./zenn; npx zenn preview -p 7000 &))

link: ## link data files
	@$(foreach val, $(LINKFILES), ln -sfnv $(abspath $(val)) $(PROFILE_PATH)/sources/dist/data/$(val);)

unlink: ## unlink data files
	@$(foreach val, $(LINKFILES), unlink $(PROFILE_PATH)/sources/dist/data/$(val);)

check-staged:
	@git status --short | grep '^\w.' # show staged files or error stop

show-list: ## show list dir
	@$(foreach val, $(DIRS), /bin/ls -dF $(val);)

show-help: ## show help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
