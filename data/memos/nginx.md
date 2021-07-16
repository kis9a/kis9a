- [３つの nginx をうまく使い分けよう〜nginx、OpenResty、Tengine〜 | メルカリエンジニアリング](https://engineering.mercari.com/blog/entry/2016-05-25-170108/)
- [ハイパフォーマンス ngx_lua | メルカリエンジニアリング](https://engineering.mercari.com/blog/entry/2015-11-25-170049/)
- [lua-nginx-module を使いこなす - Qiita](https://qiita.com/kz_takatsu/items/e94805a8e3cc285f9b33)
- [Nginx を OpenID Connect の Relying Party として実装する - Qiita](https://qiita.com/kg0r0/items/954549ff0ea59c411f8a)

> パフォーマンスやスケーラビリティが要求される様々なコンポーネントでnginxをヘビーに活用しています。例えば、

コンテンツ配信／キャッシュ／リバースプロキシ／TLSターミネーション
20,000 req/secオーバーのAPI（HTTPS）リクエストを捌くロードバランサ
gRPC、Apache Solr、Gaurun等のミドルウェアのためのロードバランサ
ngx_luaによるログ分析基盤のフロントエンド、ロードバランサやリバースプロキシの拡張
といったものです。メルカリではこれらのコンポーネントをnginxやOpenRestyで用途に応じて使い分けながら構築・運用しています。


-? | -h - コマンドラインパラメータのヘルプを表示する。
-c file - デフォルトのファイルの代わりに別の設定 file を使用する。
-g directives - グローバル設定ディレクティブを設定する。例えば、
nginx -g "pid /var/run/nginx.pid; worker_processes `sysctl -n hw.ncpu`;"
-p prefix - nginx パスのプリフィックスを設定する。言い換えると、サーバファイルを保持するディレクトリ。(デフォルトの値は /usr/local/nginx です。)
-q - 設定のテストの間のエラーではないメッセージを抑制する。
-s signal - マスタープロセスに signal を送信する。引数の signal は以下の一つです:
stop - 高速にシャットダウンする
quit - gracefully にシャットダウンする
reload - 設定の変更、新しい設定で新しい worker プロセスを開始、古い worker プロセスの gracefully シャットダウン。
reopen - ログファイルを開きなおす
-t - 設定ファイルをテストする: nginx は設定ファイルを正しい構文かをチェックします。それから設定ファイルの中で参照されたファイルを開こうとします。
-T - -t と同じですが、さらに標準出力に設定ファイルをダンプします (1.9.2)。
-v - nginx のバージョンを出力する。
-V - nginx のバージョン、コンパイラバージョン、および設定パラメータを表示します。

```sh
< ~/dev/Nginx > nginx -p $pwd/ -t
nginx: the configuration file /usr/local/etc/nginx/nginx.conf syntax is ok
nginx: configuration file /usr/local/etc/nginx/nginx.conf test is successful

< ~dev/Nginx > ps aux | grep nginx | grep -v /tmp/

kis9a            76202   0.0  0.0  4277624    696 s004  S+   12:59PM   0:00.00 grep nginx
kis9a            74857   0.0  0.0  4283720   1028   ??  S    12:57PM   0:00.00 nginx: worker process
kis9a            74856   0.0  0.0  4283280    532   ??  Ss   12:57PM   0:00.00 nginx: master process nginx -p -t
kis9a            73298   0.0  0.1  4316060  12060 s002  S+   12:54PM   0:02.78 nvim conf/nginx.conf
```

C10K 問題
そこで、nginx や Node.js ではシングルスレッドで非同期 I/O に処理をすることにより、並行に処理を行を行うことで C10K 問題を解決しようとしました。

| ファイル                       | 説明                             |
| ------------------------------ | -------------------------------- |
| /etc/nginx/nginx.conf          | メイン設定ファイル               |
| /etc/nginx/conf.d/default.conf | デフォルトサーバーの設定ファイル |
| /etc/nginx/conf.d/ssl/conf     | SSL の設定ファイル               |
| /etc/nginx/conf.d/virtual.conf | バーチャルホストの設定ファイル   |

| ディレクティブ     | 説明                                                   | コンテキスト              |
| ------------------ | ------------------------------------------------------ | ------------------------- |
| include            | 他の設定ファイルを読み込む                             | 全て                      |
| user               | ワーカープロセスの実行ユーザー                         | main                      |
| worker_processes   | ワーカープロセス数                                     | main                      |
| worker_connections | 1 つのワーカープロセスが同時に処理できるコネクション数 | events                    |
| log_format         | アクセスログの書式定義                                 | http                      |
| access_log         | アクセスログのパスとログレベル                         | http,server,location      |
| error_log          | エラーログファイルのパスとログレベル                   | main,http,server.location |
| listen             | リクエストを受け付けるポート番号                       | server                    |
| server_name        | サーバー名                                             | server                    |
| keepalive_requests | 一度の接続で受け付けることのできるリクエスト数の上限   | http,server,location      |
| keepalive_timeout  | キープアライブのタイムアウトまでの秒数                 | http,server,location      |
| server_tokens      | バージョン番号の表示                                   | http,server,location      |
| root               | ドキュメントルート                                     | http,server,location      |
| index              | インデックスファイル                                   | http,server,location      |
| autoindex          | インデックスリスト表示の on/off                        | http,server,location      |
| error_page         | エラーコードとエラーページノ URI                       | http,server,location      |
| rewrite            | リダイレクトの設定                                     | server,location           |
| fastcgi_pass       | FastCGI サーバへリクエストをプロキシする               |                           |

| SSL 関連のディレクティブ | 説明                                           |
| ------------------------ | ---------------------------------------------- |
| ssl                      | on なら有効                                    |
| ssl_certificate          | サーバー証明書ファイル、中間 CA 証明書ファイル |
| ssl_certificate_key      | サーバー秘密鍵ファイル                         |
| ssl_protocols            | バージョン                                     |
| ssl_ciphers              | 暗号アルゴリズム                               |

| リバースプロキシ関連のディレクティブ | 説明                                       |
| ------------------------------------ | ------------------------------------------ |
| proxy_pass                           | プロキシ先 URI                             |
| proxy_http_version                   | http のバージョン                          |
| proxy_set_header                     | プロキシ先に送られるリクエストヘッダの定義 |

/var/www/html は、Web サーバーのデフォルトのルートフォルダーです。 Apache.conf ファイル（通常/etc/Apache/conf にあります）を編集し、DocumentRoot 属性を変更することで、任意のフォルダーに変更できます（ http：// httpd .Apache.org/docs/current/mod/core.html＃documentroot その情報について）

<https://www.tecmint.com/useful-nginx-command-examples/>

systemctl start nginx
systemctl status nginx
systemctl stop nginx
sudo systemctl reload nginx
sudo systemctl enable nginx
