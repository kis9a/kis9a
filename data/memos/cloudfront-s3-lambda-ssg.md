```js
'use strict';
exports.handler = (event, context, callback) => {
    var request = event.Records[0].cf.request;
    var olduri = request.uri;
    var newuri = olduri.replace(/\/$/, '\/index.html');
    request.uri = newuri;
    return callback(null, request);
};
```

```js
exports.handler = async (event) => {
    var request = event.Records[0].cf.request;
    const olduri = request.uri;
    if (olduri.match(/\/$/)) {
        var newuri = olduri.replace(/\/$/, '\/index.html');
    } else {
        var newuri = olduri.replace(/\/[^.\/]+$/, '$&\/index.html');
    }
    request.uri = newuri;
    return request;
};
```
