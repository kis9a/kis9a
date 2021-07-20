# kis9a - sources

## Workflow

### Installation

install script: [install](./install)  
curl -sL https://raw.githubusercontent.com/kis9a/kis9a/master/sources/install | bash  
cd \$PROFILE  
\$PROFILE dist  
make link

### Development

make server-sources # alias ss  
make serve-zenn # alias sz

### Commands

\# if $PROFILE=kis9a

kis9a server # serve dist/  
kis9a bundle # bundle src to dist  
kis9a images -r # resize  
kis9a images -c # comvert  
kis9a data # initialize datas  
kis9a dist # initialize dist directory

### Deployment

make publish-sources # alias pbs  
make publish-zenn # alias pbz

use [github-pages](https://github.com/tschaub/gh-pages) for push each branches

github actions

- [terraform](../.github/workflows/terraform.yml) on change sources/terraform/\*
- [publish](../.github/workflows/publish.yml) on push dist branch upload to s3

### infrastructure

- s3 + cloudfront + acm + route53 + lambda@Edge

why ?

- cloudfront cach is powerful and preformance.
- I used before Github Pages but it's can't cache-controll

why use lambda@Edge ?

- when case of s3 object access, sub directory index.html can't resolve.  
  redirect to subdirectory index.html when origin request sub-directory/

[example-redirect-function](./terraform/folder_index_redirect.js)

### Options

##### - javascript poricy

- don't use npm module  
  use modules/\*.esm.js

- use [sar](https://github.com/kis9a/sar) command  
  go get https://github.com/kis9a/sar
  (cd $PROFILE/sources/; sar)

- [imgcmp](../.github/workflows/imgcmp.yml) for compress images.

##### - data images to webp

- cd $PROFILE/images
- for file in _; do cwebp "$file" -o "${file%._}.webp"; done

### Improvement

- bundle mode "Development", "Production"
- incremental bundle
- components manage and easy to distribute
- data files lifecycle
- terraform clean up and more cover management resources
- gh-pages command self made
- abstract and separation for application and devOps staff
