### commonly

feat: A new feature
fix: A bug fix
docs: Documentation only changes
readme: readme only changes
style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
refactor: A code change that neither fixes a bug nor adds a feature
perf: A code change that improves performance
test: Adding missing or correcting existing tests
chore: Changes to the build process or auxiliary tools and libraries such as documentation generation

### project

#### notes

tasks: tasks/ changes
memos: memos/ changes


[【必須】Gitコミットの書き方・作法【prefix/emoji】 ](https://suwaru.tokyo/%E3%80%90%E5%BF%85%E9%A0%88%E3%80%91git%E3%82%B3%E3%83%9F%E3%83%83%E3%83%88%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9%E3%83%BB%E4%BD%9C%E6%B3%95%E3%80%90prefix-emoji%E3%80%91/)

fix	バグ修正
クリティカルなバグ修正なら hotfix
add
feat	新規機能・新規ファイル追加
feat は feature の略
update	バグではない機能修正
change	仕様変更による機能修正
clean
refactor
improve	整理 (リファクタリング等)
disable	無効化 (コメントアウト等)
remove
delete	ファイル削除、コードの一部を取り除く
rename	ファイル名の変更
move	ファイル移動
upgrade	バージョンアップ
revert	修正取り消し
docs	ドキュメントのみ修正
style	空白、セミコロン、行、コーディングフォーマットなどの修正
perf	性能向上する修正
perf は perfomance の略
test	テスト追加や間違っていたテストの修正
chore	ビルドツールやライブラリで自動生成されたものをコミットするとき


# ==== Format ====
# prefix(scope): :emoji: Commit body...
#
# backlog task key

# ==== prefix ====
# fix: バグやタイポなどの修正
# feat: 新しい機能の追加
# refactor: リファクタリング
# style: スタイリングに関わる変更(css/sass)
# chore: 細務(ファイル整備、移動、削除、名前変更など)
# test: テストファイルに対する変更や修正
# docs: ドキュメントの加筆や修正
# breaking: 破壊的変更
# build: ビルド周りの設定(主にgulpやwebpack周り)
# ci: CIに関わる設定
# pref: パフォーマンスの改善
# revert: 削除や変更の取り消し
# other: その他

# ==== scope ====
# eslint | eslint の設定を変更
# stylelint | stylelint の設定を変更
# config | config.json を変更
# readme | README.md を変更
# gulp | gulp の設定を変更
# webpack | webpack の設定を変更
# html | htmlファイル変更
# php | phpファイル変更
# js | jsファイル変更

# ==== Emojis ====
# 🐛  :bug: バグの修正
# 🎉  :tada: 新機能の実装
# 👍  :+1: 機能改善
# 💊  :pill: 機能修正
# 💉  :syringe: linterの設定やエラー修正
# 🔥  :fire: 不要ファイルの削除
# 🚚  :truck: ファイル移動
# 📛  :name: ファイル名変更
# 📝  :memo: markdownファイルの変更
# 📑  :bookmark: タグ切り(リリース)
# 👮  :cop: 認証周り
# ✅  :white_check_mark: テストの作成
# 💚  :green_heart: テストの修正
# 🆙  :up: モジュールのバージョンアップ
# 👻  :ghost: 作業途中

# ==== 7つのルール ====
# 1. タイトルの後は1行空けて本文を書く
# 2. タイトルを50字以内におさめる
# 3. タイトルの文頭を大文字にする
# 4. タイトルの文末にピリオドを付けない
# 5. タイトルは命令形で記述する
# 6. 本文は1行あたり72字以内におさめる
# 7. 本文ではどのようにではなく何をとなぜを説明する
#
# 詳細は https://postd.cc/how-to-write-a-git-commit-message/
