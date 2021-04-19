```

// mirror

for (${1:int} ${2:i} = ${3:0}; $2 < ${4}; $2++) {
    ${0}
}

// placeholder
snippet     if
    if ${1:foo} {
        ${2:bar}
    }

// tab stop
snippet     if
    if ${1} {
        ${2}
    }

// snippet triger
snippet     if
    if (${1:#:condition}) {
        ${0:TARGET}
    }
```
