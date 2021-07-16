- [GoのコードからPlantUMLコードを生成する静的解析ツールを作っている - 日記マン](https://i101330.hatenablog.com/entry/2019/04/14/205522)

# plantuml

https://plantuml.com/sequence-diagram>
<https://zenn.dev/kitabatake/articles/ff586edd162789862d71>
<https://qiita.com/ogomr/items/0b5c4de7f38fd1482a48>
<https://qiita.com/sky0621/items/8b6e88f4327b42ade5d7>
<https://qiita.com/munieru_jp/items/088dfc3e5e91b5ea17c3>

@startuml
Bob -> Alice : hello
@enduml

---

@startuml

class ユーザー
class 記事
class コメント
class マガジン
class タグ
class ジャンル

class 支払先 {

- 銀行コード
- 支店コード
- 口座番号
  }
  note left of 支払先 : サービス上で得た報酬を振り込む先の情報

class 個人支払先 {

- 姓
- 名
  }
  class 法人支払先 {
- 法人名
  }

note top of カード情報 : サービス上で支払を行うための情報
class カード情報 {

- カード番号
- カード名義
  }
  ユーザー "1" -up- "0..1" カード情報

ユーザー "1" -up- "0..1" "支払先"
"個人支払先" --|> "支払先"
"法人支払先" --|> "支払先"

ユーザー "1" -- "_" 記事
記事 "1" -- "_" コメント
ユーザー "1" -- "\*" コメント

ジャンル "1.._" -- "_" 記事

タグ "_" -- "_" 記事

マガジン "0..1" -- "\*" 記事

package リアクション {
class サポート { - サポートするユーザー - サポートされるユーザー - 金額
}
ユーザー "1" --> "_" サポート
サポート "_" --> "1" ユーザー

    class フォロー {
        - フォローするユーザー
        - フォローされるユーザー
    }

    (ユーザー, ユーザー).. フォロー

    class スキ
    ユーザー "1" -- "*" スキ
    スキ "*" -- "1" 記事

}

class SNS アカウント
ユーザー "1"-up-"\*" SNS アカウント
class Twitter アカウント
class Facebook アカウント
Twitter アカウント --|> SNS アカウント
Facebook アカウント --|> SNS アカウント

@enduml

```

Cross platform (macos/linux/windows)
Synchronised scrolling
Fast asynchronous updates
Katex for typesetting of math
Plantuml
Mermaid
Chart.js
sequence-diagrams
flowchart
dot
Toc
Emoji
Task lists
Local images
Flexible configuration

```

@startuml

' 可視性のアイコンを非表示にする
skinparam classAttributeIconSize 0

' モノクロにする
skinparam monochrome true

' 影をなくす
skinparam shadowing false

' 手描き風にする
skinparam handwritten true

class 車 { +車種 +ナンバープレート +走る() +止まる() +曲がる()
}
note left: 車

class タイヤ {
}

class ドライバー { +アクセルを踏む() +ブレーキを踏む() +ハンドルを切る()
}

class 運転免許証 {
}

車 "1" \*-- "4" タイヤ
車 -- ドライバー
ドライバー "1" o-- "1" 運転免許証

@enduml
