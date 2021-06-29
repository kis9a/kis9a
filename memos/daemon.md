/etc/systemd/system/<任意の名前>.service

```
[Unit]
Description=<任意の説明>
After=network.target

[Service]
Type=simple
WorkingDirectory=/home/ec2-user # ← 作業ディレクトリも指定しておきましょう。
ExecStart=/home/ec2-user/main # ←実行パスを指定します
Restart = always

[Install]
WantedBy=multi-user.target
```

# 設定ファイルの再読み込み

ec2-user@<ip アドレス> ~]$ sudo systemctl daemon-reload

# サービスの自動起動有効化

ec2-user@<ip アドレス> ~]$ sudo systemctl enable <任意の名前>.service

# サービス起動

ec2-user@<ip アドレス> ~]$ sudo systemctl start <任意の名前>.service

# サービスの状態確認
