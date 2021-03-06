p2p 100sec

webrtc realtime comunication.
chrome, safari.

- <https://gist.github.com/voluntas/e914aa245fc26f3133c2>

getUserMedia

```
navigator.mdeiaDevices.getUserMedia(streamContraints).then(function (stream) {
  localStream = stream;
  localVideo.srcObject = stream;
})
```

R/Users/evolany36/dev/kis9a/hugo-blog/static/kis9a.jpgTCPeerConnection

Data Channel

KVS WebRTC の感想

- 現状はビデオチャットのようなコミュニケーションアプリを作るためのものではない
- 1 対 1 なら可能だが、Master（主催者）と Viewer（参加者）がはっきり区別される
- n 対 n は不可能
- ただし今後 SFU のようなサーバー側の仕組みが登場する可能性はある
- 1 対少数の配信は可能だが、大規模配信はできない
- それは(WebRTC ではない)Kinesis Video Streams を使うのが筋が良さそう

VS WebRTC のサーバーが提供する機能は、次の通りです。

- シグナリング ... Offer/Answer SDP の交換、ICE candidate の交換
- STUN/TURN ... P2P 通信で NAT 越えを行ったり、UDP が通らない場合でも通信を行うための仕組み

sample

<https://github.com/webrtc/samples>
<https://qiita.com/mobilebiz/items/8256732f00d96ac8eab5>

- P2P(Peer to Peer)方式
  ブラウザ同士が直接映像などをやり取りする
  もっとも高解像度で自由度が高い
  WebRTC が前提としている接続方式でリアルタイム通信に向いている
  接続する相手が増えてくるとブラウザ側の負担が大きくなる（特にモバイル）
  Twilio Video の「Go」と「Peer-to-peer」で利用される方式

- SFU（Selective Forwarding Unit）方式
  映像や音声を中継するサーバーを配置
  録画などの付加機能を実施することが可能
  上りのコネクションは１本、下りは相手の数分必要
  ブラウザが増えた場合に、ブラウザ側の負担が P2P に比べて少ない
  SFU 側では画像の加工などは行わないため、SFU 自体の負担は低い
  Twilio Video の「Group」「Group-small」で利用される方式

  <https://webrtc.ecl.ntt.com/>

- [WebRTC を今から学ぶ人に向けて](https://zenn.dev/voluntas/scraps/82b9e111f43ab3)
- シグナリング

WebRTC サーバで考えるべきこと
WebRTC のサーバサイドインフラストラクチャを考えるに辺り、4 つのサーバについて本セッションでは述べる。

シグナリングサーバ
NAT 越えサーバ
メディアサーバ(音声・映像・データ)
ゲートウェイサーバ

ユーザ認証
アクセスコントロール、セキュリティ
プッシュ通知 (特にバッテリ消費に注意) ->
フェデレーション（他のサービスプロバイダとの相互接続）
その他、現実社会で必要とされる機能

anybot line screen

-> adfadfadf

<- adfadfadf

-> hey starting live, https://livestreeming.com.

-> p2p starting live, https://livestreeming.com. token は自動的に.

WebRTC の P2P 利用は、配信者が視聴者分の変換を行うという負担があることから、最大でも 10 名程度までしか配信できません。
配信の場合は P2P で WebRTC という考えを捨てましょう。

- クラサバモデル大規模配信
  大規模配信を行う場合は P2P ではなく、あまり馴染みのない WebRTC でのクラサバモデルが前提となります。
  P2P では配信者が直接視聴者に配信しますが、クラサバモデルの場合は、配信者は WebRTC サーバに配信します。視聴者と直接やり取りするのは WebRTC サーバになります。 WebRTC は UDP をベースとしているプロトコルで、さらに低遅延を目的としているため CDN を利用することはできません。 まず多くの配信を行うには CDN が前提となりますが、それが利用できないというのを念頭に置いていただければと思います。
  さて、大規模配信ですが実際どのくらいを大規模というのでしょうか。感覚的に 1 万接続への配信は大規模だと感じています。
  そのため 1 万接続以上への配信が WebRTC で可能かどうか、という話をここではしようと思います。
  現実的には可能だと思います。ただ遅延は 200–300 ミリ秒ではなく 1 秒以内、程度のものになると思います。
  この場合は複数の WebRTC サーバを多段型にすることで多くの接続へ配信をする仕組みが前提となります。
  WebRTC を利用した超低遅延配信は一定の接続数までなら現実的です。別に夢物語ではありません。一定以上の場合は HLS/MPEG-DASH を採用して困ることはないでしょう。つまり住み分けすべきです。
  そう考えると現実としては上の仕組みを使い最大 3000 接続までは WebRTC で配信を行い、それ以降は HLS での変換を同時に行うなどの仕組みが現実的だと思います。
  3000 接続の配信が 1000 あるだけで、実質同時 300 万接続をさばく必要があります。サーバが 100 台あっても 1 サーバ 1 万接続を処理できる必要がでてきてしまいます。

- サイマルキャスト
  WebRTC は超低遅延の双方向の配信を前提としているため 1:N の場合は、N 側の様々な環境を考慮し配信側がビットレートを変更するという仕組みを取ることはできません。
  回線が細く、遅い PC で見ている人もいれば、ゲーミング PC で見てる人もいれば、スマートフォンで見てる人もいるでしょう。
  そのための技術としてサイマルキャストがあります。簡単に言えば配信側に数種類の画質での配信をしてもらい、サーバ側で視聴者の帯域を推定し、視聴者毎の帯域に合わせた画質の映像を配信するという仕組みです。

- WebRTC はどのブラウザをサポートしている？
  IE を除き、主要なブラウザはほぼサポートしている
  コーデックは VP8, H.264, Opus への対応が求められる
  将来的には VP9, AV1, H.265 あたりの対応が予想される
  WebRTC はなぜリアルタイムで配信できるのか？
  UDP ベースの通信方式を採用している
  また、HTTP ベースのストリーミング形式は基本的にチャンク（映像を決められた感覚で区切って送出する）である為、遅延が発生する
  WebRTC はチャンクという概念はなく、とにかくストリームを送り続けるイメージ
  その為、よりリアルタイムな配信が実現できる
  WebRTC の仕組み
  様々な要素が登場する複雑な仕組みとなっている
  接続
  UDP, ICE, STUN, TURN, SDP, シグナリング
  独自フレームワーク
  メディアチャネル, データチャネル, 輻輳制御, 再送制御
  暗号化通信
  DTLS, SRTP, SRTCP, SCTP
  WebRTC はどうやって接続を確立する？
  ICE によって接続経路と接続の候補が確認される
  STUN によって NAT 越えが実現され, SDP（Session Description Protocol）で通信に必要な情報を交換する
  P2P 通信ができない環境などでは、中継サーバとして　 TURN が使用されることもある
  WebRTC で使用されているプロトコルは？
  IP の上に様々なプロトコルが乗っており、非常に複雑
  ベースは UDP による通信で、DTLS と呼ばれる TLS に似たプロトコルで通信の暗号化を行う
  DTLS によって暗号化された経路上で、SRTP や SRTCP といった各種情報をやりとりするためのプロトコルが使用されている
  SCTP とは
  データチャネルがやりとりされるプロトコル
  UDP 上で TCP の様な輻輳制御等を行ってくれるプロトコルだが、まだ未熟な部分も存在
  SCTP に変わるプロトコルとして、Google が研究開発している　 QUIC というプロトコルが期待されている
  WebRTC の性能は？
  実際に環境を用意してテストを実施した
  遅延
  250ms - 300ms で安定して超低遅延を実現
  画質
  基本的に高いビットレートで鮮明な映像を配信できる
  一方で、変化の大きい映像には対応しきれない部分も

- 課題
  低遅延と止まらない再生はトレードオフ。仕組み上、コマ落ちなどはどうしても発生する
  同時接続数の拡張に課題
  今後もより大規模な配信に対応する事が求められるはず
  UDP や配信プロトコルのフェイルオーバーなどに課題
  優位性
  超低遅延であることのレスポンス性
  チャットなどの双方向通信が与える臨場感
  超低遅延な複数視点を切り替えて視聴する AR 的体験の構築
  ライムライト社が提供する Limelight Realtime Streaming - RTS は何を解決するのか？
  超低遅延配信における課題を解決し、優位性についてはより拡張する事を目指し、アップデートが行われている

- 4 つのキーワード
  Resilience
  超低遅延ライブビデオストリームでも安定的かつ、より多くの同時視聴者数をサポートする、協力なアーキテクチャ
  Scalability
  ニーズに基づき、継続的に拡張ができる事
  Picture Quality
  より高いビットレートのビデオストリームをサポートする
  Interactive Data
  Shared object のサポートを容易に

[ぼくのかんがえたさいきょうの超低遅延大規模配信 · GitHub](https://gist.github.com/voluntas/0eb505cb5d53fefec6708aa93fd2410d)

ただし 10 万人などの超大規模に対しては HLS/MPEG-DASH + CDN という世界を利用すべきだと考えています。超大規模で超低遅延の需要はスポーツ中継とかでしょうか ... このあたりは、まだなんとも言えないのが現状です。

1:1 であれば WebRTC P2P を検討しても良い
それ以外は WebRTC SFU を検討するべき
WebRTC SFU の自作はコスト面からいってメリットが少ない

- 自力で WebRTC SFU を作るメリットはない
  既存製品の劣化版になる
  メンテナンスのコストが高い
  機能追加のコストが高い
  劣化版を作り上げるなら、既存製品を利用していくべき
