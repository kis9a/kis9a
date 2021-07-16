```tmux

# set {{{
set -g base-index 1
set -s escape-time 0
set -g display-time 10000
set -g history-limit 10000
set -g focus-events on
set -g visual-activity off
set -g default-command "$SHELL"
set -g default-terminal 'screen-256color'
set -ga terminal-overrides ',xterm-256color:Tc'
set -ga terminal-overrides ',screen-256color:Tc'
set -ga terminal-overrides '*:Ss=\E[%p1%d q:Se=\E[ q'
# set -g status on
# set -g status-bg default
# set -g status-style fg=colour240,bg=black
# set -g status-left-length 100
# set -g status-right-length 100
# set -g status-right ''
# set -g status-left '#[fg=red,bg=black]< #S#(${HOME}/dotfiles/bin/tmux-git-branch) > #[default]'
# set -g pane-border-style fg=colour240,bg=black
# set -g pane-active-border-style fg=colour240,bg=black
# set -g window-status-separator ""
# set -g display-panes-colour 'red'
# set -g display-panes-active-colour 'red'
# set -g clock-mode-colour "red"
# set -g clock-mode-style 24
# set -g message-style fg=red,bg=black
# set -g message-command-style fg=red,bg=black
# set -g mode-style fg=red,bg=black

# }}}

# set-window-option {{{
setw -g mode-keys vi
setw -g pane-base-index 1
setw -g monitor-activity on
# setw -g window-status-format '#{?pane_synchronized,#[bg=red],}#I:#W  '
# setw -g window-status-current-format '#{?pane_synchronized,#[bg=red],}#I:#W  '
# setw -g window-status-current-style fg=red,bg=black
# setw -g window-status-activity-style fg=colour240,bg=black
# setw -g window-status-style fg=colour240,bg=black
# }}}

# set-option {{{
set-option -g mouse on
set-option -g set-titles on
set-option -g repeat-time 0
set-option -g status-position top
set-option -g status-interval 1
set-option -g status-justify "left"
# }}}

# --- Key bindings --- {{{
## set prefix ctrl - a
set -g prefix "C-a"

## disable default bindings
unbind "C-b"
unbind '"'
unbind %

## reload ~/.tmux.conf file
bind r source-file ~/.tmux.conf

## Move jkhl
bind j select-pane -D
bind k select-pane -U
bind h select-pane -L
bind l select-pane -R

bind | split-window -hc "#{pane_current_path}"
bind - split-window -vc "#{pane_current_path}"

bind c new-window -c "#{pane_current_path}"
bind + break-pane

bind H resize-pane -L 10
bind J resize-pane -D 5
bind K resize-pane -U 5
bind L resize-pane -R 10
bind-key o resize-pane -Z

bind i choose-tree
bind w choose-tree -w
bind P switch-client -n
bind N switch-client -p

## binded run custom shell script ~/bin/tmux-session-fzf
bind f run -b tmux-session-fzf

## brew install reattach-to-user-namespace
## reattach-to-user-namespace to share clipboard while tmux and macos.
## echo $0 # expected current shell name
set-option -g default-command "reattach-to-user-namespace -l $0"
## To start copy-mode, type (ctrl - a - ])
## when typed v, start select text
bind-key -T copy-mode-vi v send-keys -X begin-selection
## when typed y, selected text is clipped
bind-key -T copy-mode-vi y send-keys -X copy-pipe-and-cancel "reattach-to-user-namespace pbcopy"
# }}}

# --- Plugins ---{{{
## tmux-tpm auto installation
if "test ! -d ~/.tmux/plugins/tpm" \
   "run 'git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm && ~/.tmux/plugins/tpm/bin/install_plugins'"

run -b '~/.tmux/plugins/tpm/tpm'

set -g @plugin 'tmux-plugins/tpm'

## https://github.com/tmux-plugins/tmux-yank
set -g @plugin 'tmux-plugins/tmux-yank'

## ctrl - a - F
## https://github.com/sainnhe/tmux-fzf
set -g @plugin 'sainnhe/tmux-fzf'

## ctrl - a - u
## https://github.com/wfxr/tmux-fzf-url
set -g @plugin 'wfxr/tmux-fzf-url'

set -g @plugin 'jabirali/tmux-powertab'
set -g @powertab-pathname on
# }}}
```

| コマンド          | 役割                                   |
| ----------------- | -------------------------------------- |
| prefix + ?        | キーバインド一覧                       |
| prefix + s        | セッションの一覧表示                   |
| prefix + c        | 新規ウィンドウ作成・追加               |
| prefix + w        | ウィンドウの一覧                       |
| prefix + &        | ウインドウの破棄                       |
| prefix + n        | 次のウインドウへ移動                   |
| prefix + p        | 前のウインドウへ移動                   |
| prefix + \|       | 左右にペイン分割                       |
| prefix + *-        | 上下にペイン分割                       |
| prefix + h        | 左のペインに移動                       |
| prefix + j        | 下のペインに移動                       |
| prefix + k        | 上のペインに移動                       |
| prefix + l        | 右のペインに移動                       |
| prefix + H        | ペインを左にリサイズ                   |
| prefix + J        | ペインを下にリサイズ                   |
| prefix + K        | ペインを上にリサイズ                   |
| prefix + L        | ペインを右にリサイズ                   |
| prefix + x        | ペインの破棄                           |
| prefix + スペース | ペインのレイアウト変更                 |
| prefix + Ctrl + o | ペインの入れ替え                       |
| prefix + {        | ペインの入れ替え(上方向)               |
| prefix + }        | ペインの入れ替え(下方向)               |
| prefix + [        | コピーモードの開始(カーソルキーで移動) |
| prefix + v        | コピー開始位置決定(vi モード)          |
| prefix + y        | コピー終了位置決定(vi モード)          |
| prefix + Crtl + p | コピー内容の貼り付け                   |
