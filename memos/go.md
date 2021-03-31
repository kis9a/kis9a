// Go module

go mod init で、初期化する
go build などのビルドコマンドで、依存モジュールを自動インストールする
go list -m all で、現在の依存モジュールを表示する
go get で、依存モジュールの追加やバージョンアップを行う
go mod tidy で、使われていない依存モジュールを削除する

- [Go · GitHub](https://github.com/golang/)
- [Packages - The Go Programming Language](https://golang.org/pkg/)

```

// get post
function get($q)
{
  $id = $q["id"];

  if (empty($id)) {
    $posts = db_query("select distinct * from `posts`");
    $tags = db_query("select distinct * from `posts_tags`");

    $posts = array_map(function ($post) use ($tags) {
      $pid = $post["id"];
      $ptags = array_filter($tags, function ($tag) use ($pid) {
        return $tag["pid"] === $pid;
      });
      $post["tags"] = $ptags;
      return $post;
    }, $posts);
  } else {
    $posts = db_query("select distinct * from `posts` where id = $id");
    $ptags = db_query("select distinct * from `posts_tags` where pid = $id");

    $posts = array_map(function ($post) use ($ptags) {
      $post["tags"] = $ptags;
      return $post;
    }, $posts);
  }
  return render_json($posts);
}

```
