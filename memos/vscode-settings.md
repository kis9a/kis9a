{
    "window.zoomLevel": -1,
    "window.nativeTabs": false,
    "window.titleBarStyle": "native",
    "editor.tabSize": 2,
    "editor.minimap.enabled": false,
    "editor.fastScrollSensitivity": 21,
    "editor.fontSize": 16,
    "editor.lineHeight": 23,
    "editor.suggestSelection": "first",
    "editor.lineNumbers": "relative",
    "editor.fontFamily": "Victor Mono",
    "editor.glyphMargin": false,
    "editor.folding": false,
    "workbench.editor.tabCloseButton": "off",
    "workbench.editor.enablePreviewFromQuickOpen": false,
    "workbench.editor.enablePreview": false,
    "workbench.statusBar.visible": false,
    "workbench.activityBar.visible": true,
    "workbench.iconTheme": "chalice-icon-theme",
    "terminal.integrated.fontSize": 21,
    "terminal.integrated.lineHeight": 1,
    "customizeUI.titleBar": "inline",
    "customizeUI.font.regular": "HiraMaruProN-W4",
    "customizeUI.font.monospace": "Cascadia Code",
    "customizeUI.activityBar": "bottom",
    "vim.useSystemClipboard": true,
    "vim.visualstar": true,
    "vim.hlsearch": true,
    "vim.leader": "<space>",
    "vim.easymotion": true,
    "vim.easymotionKeys": "sdfghjklqwertyuiopcvbnm",
    "vim.easymotionMarkerBackgroundColor": "nord",
    "vim.easymotionMarkerForegroundColorOneChar": "crimson",
    "vim.handleKeys": {
        "<C-G>": false
    },
    "vim.normalModeKeyBindingsNonRecursive": [
        {
            "before": [
                ","
            ],
            "after": [
                "leader",
                "leader",
                "s"
            ]
        },
        {
            "before": [
                "leader",
                "|"
            ],
            "after": [
                ":",
                "v",
                "s",
                "CR"
            ]
        },
        {
            "before": [
                "leader",
                "-"
            ],
            "after": [
                ":",
                "s",
                "p",
                "CR"
            ]
        },
    ],
    "markdown.preview.fontSize": 21,
    "zenMode.silentNotifications": false,
    "diffEditor.ignoreTrimWhitespace": false,
    "explorer.confirmDelete": false,
    "extensions.ignoreRecommendations": true,
    "breadcrumbs.enabled": true,
    "tabnine.experimentalAutoImports": true,
    "saveAndRun": {
        "commands": [
            {
                "match": "\\.lua$",
                "cmd": "nginx -s reload"
            },
            {
                "match": "nginx.*\\.conf$",
                "cmd": "nginx -s reload"
            },
            {
                "match": "/lua/html/.*",
                "cmd": "nginx -s reload"
            }
        ]
    },
    "workbench.colorTheme": "gruvboxConcoctis dark medium"
}
