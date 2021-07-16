## Netcat Syntax #


### The most basic syntax of the Netcat utility takes the following form:

```
nc [options] host port
```


### By default, Netcat will attempt to start a TCP connection to the specified host and port. If you would like to establish a UDP connection, use the -u option:

```
nc -u host port
```

localhost

```
nc -l port
```


