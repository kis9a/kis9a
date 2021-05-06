[manifest.webmanifest or manifest.json · Issue #689 · w3c/manifest · GitHub](https://github.com/w3c/manifest/issues/689)

```manifest.webmanifest
{
  "short_name": "Todolist",
  "name": "Hyperapp todolist",
  "description": "Hyperapp 2.0 todo list app",
  "display": "fullscreen",
  "scope": "/hyperapp-todolist/",
  "start_url": "/hyperapp-todolist/",
  "theme_color": "#06D19C",
  "background_color": "#323232",
  "orientation": "portrait",
  "dir": "ltr",
  "lang": "en",
  "icons": [
    {
      "src": "./assets/icon-180x180.png",
      "sizes": "180x180",
      "type": "image/png"
    },
    {
      "src": "./assets/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "./assets/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1" />

    <title>Hyperapp todolist</title>
    <meta name="description" content="Hyperapp 2.0 todo list app" />

    <link rel="home" href="https://loteoo.github.io/hyperapp-todolist/" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
    />
    <link rel="icon" type="image/png" href="./assets/favicon.png" />
    <link
      rel="canonical"
      href="https://github.com/loteoo/hyperapp-boilerplate"
    />

    <!-- Open graph -->
    <meta property="og:title" content="Hyperapp todolist" />
    <meta property="og:description" content="Hyperapp 2.0 todo list app" />
    <meta property="og:type" content="website" />
    <meta
      property="og:url"
      content="https://loteoo.github.io/hyperapp-todolist/"
    />
    <meta property="og:image" content="./assets/card.png" />
    <meta property="og:image:secure_url" content="./assets/card.png" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Hyperapp todolist" />

    <!-- Twitter Card -->
    <meta name="twitter:card" value="summary" />
    <meta
      name="twitter:url"
      content="https://loteoo.github.io/hyperapp-todolist/"
    />
    <meta name="twitter:title" content="Hyperapp todolist" />

    <!-- Android web app -->
    <link rel="manifest" href="./manifest.webmanifest" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="theme-color" content="#323232" />

    <!-- IOS web app -->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="#323232" />
    <meta name="apple-mobile-web-app-title" content="Hyperapp todolist" />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="./assets/icon-512x512.png"
    />

    <!-- Windows web app -->
    <meta name="msapplication-TileImage" content="./assets/icon-512x512.png" />
    <meta name="msapplication-TileColor" content="#323232" />

    <!-- Hyperapp -->
    <script defer src="./app/index.js"></script>
  </head>
  <body></body>
</html>
```
