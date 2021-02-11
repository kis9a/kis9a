Command:

curl https://git.io/ -i -F "url=https://github.com/YOUR_GITHUB_URL" -F "code=YOUR_CUSTOM_NAME"
URLs that can be created is from:

https://github.com/_
https://_.github.com
https://_.github.com/_
https://_.github.io
https://_.github.io/_
https://_.githubusercontent.com/\*
If you accidentally make a typo in the custom name, you can add .git (only the repository name) or ? at the end in your GitHub URL.

curl https://git.io/ -i -F "url=https://github.com/YOUR_GITHUB_URL.git" -F "code=YOUR_CUSTOM_NAME"
curl https://git.io/ -i -F "url=https://github.com/YOUR_GITHUB_URL?" -F "code=YOUR_CUSTOM_NAME"
If you want to revoke your custom name, you should contact GitHub Support Team. As of 23 September 2020, you can no longer request to revoke your outdated or incorrect git.io URL.

Shortcut to this Gist: git.io/customurl
