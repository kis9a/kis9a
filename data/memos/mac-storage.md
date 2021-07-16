# 1000M以上のファイルを抽出
sudo du -x -m -d 5 / | awk '$1 >= 1000{print}'

メモリ解放
sudo purge
メモリ解放（そこそこ時間かかります）
du -sx /

https://gist.github.com/bright23/6dc8fd43432a42e8edc7c95589098014

#!/bin/sh

sudo purge
du -sx /
sudo rm -rf ~/Library/Developer/Xcode/DerivedData/*
sudo rm -rf ~/Library/Developer/Xcode/Archives/*
sudo rm -rf ~/Library/Caches/*
sudo rm -rf ~/Library/Logs/iOS\ Simulator
sudo rm -rf ~/Library/Developer/Xcode/iOS\ DeviceSupport/*

duコマンドを使用してMacの5GB以上のフォルダを確認
ハードディスクの空き容量が極端に少なくなる場合の対処方法

sudo du -g -x -d 5 / | awk '$1 >= 5{print}'
