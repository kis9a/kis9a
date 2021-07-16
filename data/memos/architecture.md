アプリケーション全般
クラウド: GCP
言語: golang
実行基盤: GAE
インタフェースと認証
認証基盤: Firebase Authentication
WEB API: protocol buffers on HTTP 1.1
ルーティング FW: Echo
DB 周り
DB: Cloud SQL for MySQL
ORM: sqlboiler
ER 図生成ツール: schemaspy
マイグレーション: golang-migrate
CI/CD 基盤 & テスト
CI・CD: Github Actions
アサーション・モック: testify
データ生成ツール: testfixtures
コード診断: gosec & reviewdog
ログ周り
収集基盤: Cloud Logging
ログライブラリ: zerolog
監視: Cloud Monitoring
分析: BigQuery

- [少人数での爆速開発を目指して golang×GCP の技術選定をした話](https://zenn.dev/sh_komine/articles/35527f84a2be3a)

Next.js

styled-components：毎回迷いつつもなんだかんだで採用することになる CSS in JS。今後パフォーマンスの問題があれば置き換えるかも。
twemoji：Apple の OS 以外の絵文字が Zenn のテイストにマッチしなかったため使用。
markdown-it：マークダウンを HTML へ変換するために使用。
など

Google App Engine（GAE）

Cloud Build：CI ツール。自動テストと自動デプロイを実行。
KMS：秘匿情報の管理。Cloud Build でのビルド時に暗号化された秘匿情報を復号。
Cloud Storage：ユーザーがアップロードする画像の保存先。
Cloud SQL：DB。PostgreSQL を利用。
Google Analytics Reporting API：各コンテンツの PV や滞在時間などの統計情報を取得するため。
Stripe：決済のため。
SendGrid：メール配信のため。
GitHub Apps：ユーザーが連携したリポジトリからコンテンツを同期するため。
Cloudinary：OGP 画像を動的に生成するため。

- [Zenn を支える技術とサービス構成](https://zenn.dev/catnose99/articles/zenn-dev-stack)
