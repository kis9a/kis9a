package main

import (
	"fmt"
	"log"
	"net/http"

	jwthandler "github.com/nirasan/go-jwt-handler"
)

func main() {
    // ハンドラーの初期化
    jwth, err := jwthandler.New(jwthandler.Option{
        // 署名アルゴリズムの指定
        SigningAlgorithm: "HS256",
        // 署名アルゴリズムが HMAC SHA なので鍵の文字列を指定
        // RSA や ECDSA など公開鍵暗号の場合は秘密鍵と公開鍵のファイルのパスを指定する
        HmacKey:          []byte("MYKEY"),
        // 認証処理を定義する
        // 実際に使用する場合はここでデータベースなどを参照する想定
        Authenticator:    func(u, p string) bool { return u == "admin" && p == "admin" },
        // 認証処理に使うユーザー名とパスワードの取得処理を定義する
        LoginDataGetter:  func(r *http.Request) (string, string) { return r.FormValue("username"), r.FormValue("password") },
    })
    if err != nil {
        log.Fatal(err)
    }
    // ログインフォームの表示
    http.HandleFunc("/", index)
    // 認証とトークンの発行
    http.Handle("/login", jwth.AuthenticationHandler(http.HandlerFunc(login)))
    // 認証が必要なコンテンツの返却例
    http.Handle("/hello", jwth.AuthorizationHandler(http.HandlerFunc(hello)))
    // トークンの有効期限延長
    http.Handle("/refresh", jwth.TokenRefreshHandler(http.HandlerFunc(refresh)))
    log.Fatal(http.ListenAndServe(":8080", nil))
}

func index(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, `
    <html>
        <head>
            <title>index</title>
        </head>
        <body>
            <form method="post" action="/login">
                <input type="text" name="username" />
                <input type="password" name="password" />
                <input type="submit" value="login" />
            </form>
        </body>
    </html>
    `)
}

// Input: curl -F 'username=admin' -F 'password=admin' http://localhost:8080/login
// Output: Your token is eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0NzM3MzEzNTQsInN1YiI6ImFkbWluIn0.zB6hoNjEHrcYhCx7KD_JdlauqTc08s_cB9IS7w49fyI
func login(w http.ResponseWriter, r *http.Request) {
    // 発行されたトークンをコンテキストから取得
    token, ok := jwthandler.SignedTokenFromContext(r.Context())
    if !ok {
        http.Error(w, "unauthorized", http.StatusUnauthorized)
    }
    fmt.Fprint(w, "Your token is "+token)
}

// Input: curl -H 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0NzM3MzEzNTQsInN1YiI6ImFkbWluIn0.zB6hoNjEHrcYhCx7KD_JdlauqTc08s_cB9IS7w49fyI' http://localhost:8080/hello
// Output: Your name is admin
func hello(w http.ResponseWriter, r *http.Request) {
    // 認証に使われたトークンをコンテキストから取得
    token, ok := jwthandler.TokenFromContext(r.Context())
    if !ok {
        http.Error(w, "unauthorized", http.StatusUnauthorized)
    }
    // トークンからユーザーIDを取得
    username, ok := jwthandler.SubjectFromToken(token)
    if !ok {
        http.Error(w, "unauthorized", http.StatusUnauthorized)
    }
    fmt.Fprint(w, "Your name is "+username)
}

// Input: curl -H 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0NzM3MzEzNTQsInN1YiI6ImFkbWluIn0.zB6hoNjEHrcYhCx7KD_JdlauqTc08s_cB9IS7w49fyI' http://localhost:8080/refresh
// Output: Your new token is eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0NzM3MzE0MDgsInN1YiI6ImFkbWluIn0.nPpJka3zzUdhVrK-hOV5tRYizmc82cmbfWRvmZNgWGo
func refresh(w http.ResponseWriter, r *http.Request) {
    // 再発行されたトークンをコンテキストから取得
    token, ok := jwthandler.SignedTokenFromContext(r.Context())
    if !ok {
        http.Error(w, "unauthorized", http.StatusUnauthorized)
    }
    fmt.Fprint(w, "Your new token is "+token)
}
