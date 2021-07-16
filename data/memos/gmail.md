@startuml
Alice->Bob : hello
note left: this is a first note

Bob->Alice : ok
note right: this is another note

Bob->Bob : I am thinking
note left
a note
can also be defined
on several lines
end note
@enduml

---

@startuml

== Initialization ==

Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

== Repetition ==

Alice -> Bob: Another authentication Request
Alice <-- Bob: another authentication Response

@enduml

---

@startuml
Bob ->x Alice
Bob -> Alice
Bob ->> Alice
Bob -\ Alice
Bob \\- Alice
Bob //-- Alice

Bob ->o Alice
Bob o\\-- Alice

Bob <-> Alice
Bob <->o Alice
@enduml

---

@startuml
Alice -> Bob: Authentication Request

alt successful case

    Bob -> Alice: Authentication Accepted

else some kind of failure

    Bob -> Alice: Authentication Failure
    group My own label
    Alice -> Log : Log attack start
        loop 1000 times
            Alice -> Bob: DNS Attack
        end
    Alice -> Log : Log attack end
    end

else Another type of failure

   Bob -> Alice: Please repeat

end
@enduml

---

@startuml

Title: アプリケーションサービス・シーケンス
ユーザー->クライアントアプリ: アプリ起動
クライアントアプリ-->OAUTH認証先: ログイン
OAUTH認証先->>WEBアプリケーション: 認証OK
WEBアプリケーション->WEBアプリケーション: データベース\nとのやり取り等\n各種処理
WEBアプリケーション-->>ユーザー: ログイン認証完了・セッション開始

@enduml

---

@startuml

Title: Google authorization
FE->GM: アプリ起動
LUA->GM
DB->FE:get cache message by mid


@enduml

