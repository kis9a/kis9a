## workflow

\# example

### installation

```sh
curl -sL https://raw.githubusercontent.com/kis9a/kis9a/master/sources/install | bash
cd $PROFILE
make link
make server

```

### deployment

```sh

make pbs
make pbz

```

### command

````

### command

```sh
# if $PROFILE=kis9a

kis9a server
kis9a bundle
kis9a images -r # resize
kis9a images -c # comvert
kis9a data
kis9a dist
````

### src

modules/\*.esm.js

### src components

https://localhost:9000/components

### src to dist

<details>
  <summary>src</summary>

```
src
├── assets
│   ├── icons
│   │   ├── favicon.ico
│   │   ├── icon-128x128.png
│   │   ├── icon-144x144.png
│   │   ├── icon-152x152.png
│   │   ├── icon-160x160.png
│   │   ├── icon-180x180.png
│   │   ├── icon-192x192.png
│   │   ├── icon-196x196.png
│   │   ├── icon-256x256.png
│   │   └── icon-512x512.png
│   └── manifest.json
├── components
│   ├── header
│   │   ├── index.css
│   │   ├── index.js
│   │   └── path.js
│   ├── icons
│   │   └── index.js
│   ├── index.css
│   ├── index.html
│   ├── index.js
│   └── link
│       ├── index.css
│       └── index.js
├── jsconfig.json
├── layouts
│   ├── index.css
│   └── index.html
├── modules
│   ├── css
│   │   ├── memos.css
│   │   ├── mvp.css
│   │   └── normalize.css
│   └── js
│       ├── Http.js
│       ├── hyperapp.js
│       ├── lazysize.js
│       ├── matter.min.js
│       ├── nanoid.js
│       ├── router.js
│       ├── snarkdown.js
│       └── utils.js
└── pages
    ├── images
    │   ├── index.css
    │   └── index.js
    ├── index.css
    ├── index.js
    ├── memos
    │   ├── index.css
    │   └── index.js
    └── waka
        ├── index.css
        └── index.js
```

</details>

<details>
  <summary>dist</summary>

```
dist
├── assets
│   ├── icons
│   │   ├── favicon.ico
│   │   ├── icon-128x128.png
│   │   ├── icon-144x144.png
│   │   ├── icon-152x152.png
│   │   ├── icon-160x160.png
│   │   ├── icon-180x180.png
│   │   ├── icon-192x192.png
│   │   ├── icon-196x196.png
│   │   ├── icon-256x256.png
│   │   └── icon-512x512.png
│   └── manifest.json
├── components
│   ├── index.css
│   ├── index.html
│   └── index.js
├── data
│   ├── images -> $PROFILE/images
│   ├── images-indexes.json
│   ├── memos -> $PROFILE/memos
│   ├── memos-contents.json
│   ├── memos-indexes.json
│   └── wakatime.json
├── images
│   ├── index.css
│   ├── index.html
│   └── index.js
├── index.css
├── index.html
├── index.js
├── memos
│   ├── index.css
│   ├── index.html
│   └── index.js
└── waka
    ├── index.css
    ├── index.html
    └── index.js

```

</details>

### options

```sh
go get https://github.com/kis9a/sar

kis9a ws

(cd $PROFILE/sources/; sar)
```
