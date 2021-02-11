### delete all local branch

```sh
git branch | grep -v '^*' | xargs git branch -D
```

### find commits yet to be applied to upstream

https://git-scm.com/docs/git-cherry

```sh
git cherry [-v] [<upstream> [<head> [<limit>]]]

```

### new base branch --onto <newbase>

```sh
git rebase --onto
```

Starting point at which to create the new commits. If the --onto option is not specified, the starting point is <upstream>. May be any valid commit, and not just an existing branch name.

As a special case, you may use "A...B" as a shortcut for the merge base of A and B if there is exactly one merge base. You can leave out at most one of A and B, in which case it defaults to HEAD.

git rebase --root -i.
git log --pretty=fuller
git rebase --committer-date-is-author-date
