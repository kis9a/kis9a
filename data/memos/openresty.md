OpenResty は nginx のほかに ngx_lua をはじめとする C で書かれた各種サードパーティモジュールと ngx_lua の API を利用した resty モジュール、そして Lua/LuaJIT で構成されています。

OpenResty に含まれている nginx 自体は本家の nginx と基本同じなので、別に OpenResty を利用しなくても自分で ngx_lua を組み込んだり、サーバ上に resty モジュールを配布することで似たような環境を構築することは可能ですが、OpenResty であれば主要なモジュールやライブラリが./configure、make、make install の一連の流れですべてゴソッとインストールされますし、OpenResty の configure スクリプトは nginx の configure スクリプトを継承したものなので nginx の configure オプションをほぼそのまま利用することもできます。
