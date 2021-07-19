### sql injection.

.summary

SQL インジェクションの脆弱性がある場合、悪意あるリクエストにより、データベースの不正利用をまねく可能性があります。 1.1 SQL インジェクション 61.1SQL インジェクションデータベースと連携したウェブアプリケーションの多くは、利用者からの入力情報を基に SQL 文（データベースへの命令文）を組み立てています。ここで、SQL 文の組み立て方法に問題がある場合、攻撃によってデータベースの不正利用をまねく可能性があります。このような問題を「SQL インジェクションの脆弱性」と呼び、問題を悪用した攻撃を、「SQL インジェクション攻撃」と呼びます。■ 発生しうる脅威 SQL インジェクション攻撃により、発生しうる脅威は次のとおりです。-データベースに蓄積された非公開情報の閲覧個人情報の漏えい等-データベースに蓄積された情報の改ざん、消去ウェブページの改ざん、パスワード変更、システム停止等-認証回避による不正ログイン 4 ログインした利用者に許可されている全ての操作を不正に行われる-ストアドプロシージャ等を利用した OS コマンドの実行システムの乗っ取り、他への攻撃の踏み台としての悪用等

.resolve

- SQL 文の組み立ては全てプレースホルダで実装する。
- SQL 文の組み立てを文字列連結により行う場合は、エスケープ処理等を行うデータベースエンジンの API を用いて、SQL 文のリテラルを正しく構成する。
- ウェブアプリケーションに渡されるパラメータに SQL 文を直接指定しない。
- エラーメッセージをそのままブラウザに表示しない。
- データベースアカウントに適切な権限を与える。

.references

IPA：安全な SQL の呼び出し方http://www.ipa.go.jp/security/vuln/websecurity.html#sqlIPA：知っていますか？脆弱性(ぜいじゃくせい) 「1. SQL インジェクション」http://www.ipa.go.jp/security/vuln/vuln_contents/sql.htmlhttp://www.ipa.go.jp/security/vuln/vuln_contents/sql_flash.htmlIPA：セキュア・プログラミング講座「SQL注入: #1 実装における対策」http://www.ipa.go.jp/security/awareness/vendor/programmingv2/contents/502.htmlIPA：セキュア・プログラミング講座「SQL注入: #2 設定における対策」http://www.ipa.go.jp/security/awareness/vendor/programmingv2/contents/503.htmlIPA：情報セキュリティ白書2009 第 2 部「10 大脅威攻撃手法の『多様化』が進む」http://www.ipa.go.jp/security/vuln/10threats2009.htmlIPA：情報セキュリティ白書2008 第 2 部「10 大脅威ますます進む『見えない化』」http://www.ipa.go.jp/security/vuln/20080527_10threats.html

### os command injection.

.summary

### path parameter check directory trapaserror.

### http header injection.

### mail header injection.

- XSS (クロスサイトスクリプティング)
- SQL インジェクション
- LDAP インジェクション
- コードインジェクション
- OS コマンドインジェクション
- メールヘッダーインジェクション
- Null バイトインジェクション
- サイズ制限の無いファイルアップロード
- 拡張子制限の無いファイルアップロード
- オープンリダイレクト可能なログイン画面
- ブルートフォース攻撃可能なログイン画面
- セッション固定攻撃可能なログイン画面
- 親切過ぎる認証エラーメッセージ
- 危険なファイルインクルード
- パストラバーサル
- 意図しないファイル公開
- CSRF (クロスサイトリクエストフォージェリ)
- クリックジャッキング
- XEE (XML エンティティ拡張)
- XXE (XML 外部エンティティ)

XSRF 脆弱性

クロスドメイン通信では、デフォルトでユーザー定義ヘッダーを参照できない
ブラウザでヘッダーの参照を許可するには、サーバーサイドのレスポンスヘッダに Access-Control-Expose-Headers を付加する。
例えば golang の gin framework をでは以下のようにする。

// ブラウザがレスポンスヘッダーの読み取りを許可
c.Header("Access-Control-Expose-Headers", "X-HogeApp-Hogeid")

Same-Origin Policy
Web セキュリティの重要なポリシーの一つに Same-Origin Policy (同一オリジンポリシー)があります。
これは、オリジン間のリソース共有に制限をかけるもので、次のような脆弱性を防ぐことを目的としたものです。

- XSS (Cross Site Scripting)
  ユーザーが Web サイトにアクセスすることで不正なスクリプトが Client (Web ブラウザ) で実行されてしまう脆弱性。
  被害例は、Cookie 内のセッション情報を抜き取られて不正ログインを行われる、など。

- CSRF (Cross-Site Request Forgeries)
  Web アプリケーションのユーザーが、意図しない処理を Web アプリケーション (Web Server) 上で実行される脆弱性。通称「しーさーふ」。
  被害例は、本来はログインしたユーザーしか実行できない記事の投稿処理を勝手にされる、など。

JavaScript の組み込み API で、Ajax 通信を実現する XMLHttpRequest (XHR) や Fetch API などは、これらの脆弱性を回避するため、Same-Origin Policy に従います。

- XSS と CSRF
  https://qiita.com/att55/items/a50ca43adde206017525

- XSS とは
  XSS とは一言で表すと ユーザー（被害者）の Web ブラウザで任意の JavaScript を実行させることを許す脆弱性または攻撃手法 です。
  ちなみに略称が CSS ではなく XSS なのは、Cascading Style Sheets とかぶってるのでややこしいからのようです。

- CSRF
  続いて CSRF です。CSRF を一言で表すと 正規ユーザを誘導し、強制的に特定の処理を実行させる攻撃を許す脆弱性または攻撃手法 と言えます。
  forgeries/forgery ってあまり聞かないですよね... 偽造 という意味らしいですよ。(サイトをまたがってリクエストを偽造する :thinking: )

具体的な実装
