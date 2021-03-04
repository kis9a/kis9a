brew install nginx

```nginx

worker_processes 1;

events {
  worker_connections 1024;
}

http {
  server {
    listen 8080 reuseport;

    location / {
      default_type text/plain;
      content_by_lua_block { ngx.say("Hello") }
    }
  }
}


---

worker_processes 1;

events {
  worker_connections 1024;
}

http {
  lua_package_path "$prefix/lua/?.lua;;";
  server {
    listen 8080 reuseport;

    location / {
      default_type text/plain;
      content_by_lua_block {
        local hello = require "hello"
          hello.greet("hello")
      }
    }
  }
}

```

```sh
< ~/dev/Nginx > nginx -p $pwd/ -t
nginx: the configuration file /usr/local/etc/nginx/nginx.conf syntax is ok
nginx: configuration file /usr/local/etc/nginx/nginx.conf test is successful


< ~dev/Nginx > ps aux | grep nginx | grep -v /tmp/

kis9a            76202   0.0  0.0  4277624    696 s004  S+   12:59PM   0:00.00 grep nginx
kis9a            74857   0.0  0.0  4283720   1028   ??  S    12:57PM   0:00.00 nginx: worker process
kis9a            74856   0.0  0.0  4283280    532   ??  Ss   12:57PM   0:00.00 nginx: master process nginx -p -t
kis9a            73298   0.0  0.1  4316060  12060 s002  S+   12:54PM   0:02.78 nvim conf/nginx.conf
```
