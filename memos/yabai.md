```
#!/usr/bin/env sh

# global settings

## マネジメント
yabai -m config layout bsp

## マウスがフォーカスに追従する(マウスカーソルが移動する)(on|off)
yabai -m config mouse_follows_focus off

## フォーカスをマウスに追従させる(autoraise|off)
yabai -m config focus_follows_mouse off

## 追加ウィンドウの発生箇所(first_child 上、左|second_child 下、右)
yabai -m config window_placement first_child

## フローティングウィンドウは常に上に表示(on|off)
yabai -m config window_topmost off

## ウィンドウの影を変更(on|off|float)
yabai -m config window_shadow off
yabai -m config insert_feedback_color 0xaad75f5f

# ウィンドウの透過設定
yabai -m config window_opacity on
yabai -m config window_opacity_duration 0.0
yabai -m config active_window_opacity 0.5
yabai -m config normal_window_opacity 0.5

# 割比率
yabai -m config split_ratio 0.15
yabai -m config auto_balance on

# mouseによる即編集(無効にした)
# yabai -m config mouse_modifier               fn
# yabai -m config mouse_action1                move
# yabai -m config mouse_action2                resize

# general space settings
yabai -m config top_padding 05
yabai -m config bottom_padding 05
yabai -m config left_padding 05
yabai -m config right_padding 05
yabai -m config window_gap 06

echo "yabai configuration loaded.."分

# general space settings
yabai -m config layout bsp
yabai -m config top_padding 400
yabai -m config bottom_padding 150
yabai -m config left_padding 1000
yabai -m config right_padding 400
yabai -m config window_gap 10
```
