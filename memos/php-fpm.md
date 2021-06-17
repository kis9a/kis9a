PHP: FastCGI Process Manager (FPM) - Manual

FPM ( FastCGI Process Manager ) は PHP の FastCGI 実装のひとつで、 主に高負荷のサイトで有用な追加機能を用意しています。

/etc/php5/fpm/pool.d/www.conf

```
; The address on which to accept FastCGI requests.
; Valid syntaxes are:
;   'ip.add.re.ss:port'    - to listen on a TCP socket to a specific address on
;                            a specific port;
;   'port'                 - to listen on a TCP socket to all addresses on a
;                            specific port;
;   '/path/to/unix/socket' - to listen on a unix socket.
; Note: This value is mandatory.
; listen = /var/run/php5-fpm.sock
; nginxのsites-available/defaultのfastcgi_passと同じpassにする
;listen = 127.0.0.1:9000
;listen = /var/run/php5-fpm.sock
```

/etc/nginx/nginx.conf
```
# デフォルトサーバの設定
server {
    # バーチャルサーバが使用するアドレス、ポートを指定
    listen 80 default_server;

    # サーバの公開ディレクトリを指定
    # $document_root の値になる
    root /var/www;
    # インデックスページを指定
    index index.php index.html index.htm;

    # バーチャルサーバで使用するホスト名を指定
    server_name localhost;

    # URIごとにどのファイルを配信するか設定
    location / {
        # 指定したパスにファイルが存在するかどうか
        if (-f $request_filename) {
            # キャッシュの有効期限を設定
            expires 30d;
            break;
        }
    }

    location ~ [^/]\.php(/|$) {
        # PATH_INFO 部の分割に使用する正規表現を指定
        # 一つ目 ( .+\.php ) は $fastcgi_script_name の値になり、二つ目 ( /.+ ) は $fastcgi_path_info の値になる
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        if (!-f $document_root$fastcgi_script_name) {
            return 404;
        }
        # FastCGI サーバへリクエストをプロキシする
        #fastcgi_pass 127.0.0.1:9000;
        
        #fastcgi_pass unix:/var/run/php5-fpm.sock;
        # スラッシュで終わる URI の後に追加されるファイル名を設定
        # $fastcgi_script_name の値になる
        fastcgi_index index.php;
        # 設定ファイルを読み込む
        include fastcgi_params;
        # FastCGI サーバに渡されるべきパラメータを設定
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
        fastcgi_param PATH_TRANSLATED $document_root$fastcgi_path_info;
    }
}
```
