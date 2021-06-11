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
