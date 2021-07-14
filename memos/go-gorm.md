- [Go 言語の Gorm を実践投入する時に最低限知っておくべきことのまとめ【ORM】 - Qiita](https://qiita.com/ttiger55/items/3606b8dd570637c12387)

新規レコードを作成する時は Create
既存レコードを更新する時はできるだけ Update
更新時に空値を含めて Struct で更新したい場合は Save
更新時に空値を含めて Map で更新したい時は Update
