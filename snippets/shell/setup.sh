# S3 のエンドポイント URL を指定
S3_URL=s3-ap-northeast-1.amazonaws.com/oreno-company-tools
# ツール名
TOOL_NAME=tool-a

# 画面出力用の関数
function incho() {
	printf "\e[34m$1\e[m\n"
}

function wacho() {
	printf "\e[33m$1\e[m\n"
}

# AWS CLI や docker がインストールされていることをチェック
for cmd in aws docker; do
	which ${cmd} >/dev/null 2>&1
	if [ ! $? -eq 0 ]; then
		wacho "[warn] ${cmd} がインストールされていません. ${cmd} をインストールしてから, 改めてお試し下さい."
		exit 1
	fi
done
incho "[info] 依存するツールがインストールされていることをチェックしました."

# スクリプト本体のインストール
if [ -d ${HOME}/bin ]; then
	curl https://${S3_URL}/${TOOL_NAME}/script.sh --output ${HOME}/bin/${TOOL_NAME} && chmod +x ${HOME}/bin/${TOOL_NAME}
else
	wacho "[warn] ${HOME}/bin が存在していません. ${HOME}/bin を作成してから, 改めてお試し下さい."
	exit 1
fi
incho "[info] スクリプトをインストールしました."
