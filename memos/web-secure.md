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
