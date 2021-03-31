### delete all local branch

```sh
git branch | grep -v '^*' | xargs git branch -D
```

### find commits yet to be applied to upstream

https://git-scm.com/docs/git-cherry

```sh
git cherry [-v] [<upstream> [<head> [<limit>]]]

```

```
o search the commit log (across all branches) for the given text:

git log --all --grep='Build 0051'
To search the actual content of commits through a repo's history, use:

git grep 'Build 0051' $(git rev-list --all)
### new base branch --onto <newbase>

```

### git rebase --onto

```sh
git rebase --onto
```

Starting point at which to create the new commits. If the --onto option is not specified, the starting point is <upstream>. May be any valid commit, and not just an existing branch name.

As a special case, you may use "A...B" as a shortcut for the merge base of A and B if there is exactly one merge base. You can leave out at most one of A and B, in which case it defaults to HEAD.

git rebase --root -i.
git log --pretty=fuller
git rebase --committer-date-is-author-date

git clone -b v1 --depth=1 https://github.com/nkjm/bootcamp-sushi-bot.git

alias gco=gco
function gco() {
date=$(date -v -$1d)
git commit --date $date
}
alias gcoa='git rebase HEAD~ --committer-date-is-author-date'

```
UU（both modified）
3ウェイマージした結果のコンフリクトファイル．
=>コンフリクトしている箇所を編集する必要あり．

AA（both added）
マージされるブランチ（HEAD）にあるファイルと、マージするブランチにあるファイルをマージした結果、変更箇所がコンフリクトしているファイル
=>コンフリクトしている箇所を編集する必要あり．

UD（deleted by them)
マージされるブランチ（HEAD)に存在するファイルが、マージするブランチでは削除されているファイル
=>ファイルを削除するか， 残すか選択

DU（deleted by us）
マージするブランチに存在するファイルが、マージされるブランチ（HEAD）では削除されているファイル.
=>ファイルを削除するか， 残すか選択

修正が不要
AU（added by us）
マージされるブランチ（HEAD）にのみ存在するファイル．
=>ファイルはそのまま

UA（added by them）
マージするブランチにのみ存在するファイルです。
=>自動的にstagingに乗る．

DD（both deleted)
マージされるブランチ（HEAD）及び、マージするブランチから削除されたファイル.
=>自動で削除
```
