local extra = require "extra"

local index = {}

index.main = function(oarg)
    local t = {
        stdout = index.stdout,
        log = index.log,
        forloop = index.forloop,
        type = index.type,
        modable = index.modable,
        numfunc = index.numfunc,
        strfunc = index.strfunc,
        commentout = index.commentout,
        table = index.table,
        os = index.os,
        boolean = index.boolean,
        switch = index.switch,
        compare = index.compare,
        pattern = index.pattern,
        range = index.range,
        extra = extra.greet
    }
    local function pkeys() for k, _ in pairs(index) do print(k) end end

    if oarg == nil or oarg == "-h" then pkeys() end
    return type(t[oarg]) == "function" and t[oarg]() or t[oarg]
end

index.range = function()
    for i in extra.range(10) do print(i) end
    for i in extra.range(-10) do print(i) end
    for i in extra.range(7, -2) do print(i) end
    for i in extra.range(3, 27, 3) do print(i) end
    for i in extra.range(0, 1, -1) do print(i) end
end

index.switch = function()
    -- <http://lua-users.org/wiki/SwitchStatement>
    local function greet() print("Hello") end
    local t = {a = "one", b = "two", c = "three", d = "four", e = greet}
    local function sayit(l)
        return type(t[l]) == "function" and t[l]() or t[l]
    end
    print(sayit("a"))
    sayit("e")
end

index.boolean = function()
    print(true)
    print(not (true))
    print(false)
    print(false or 1)
    print(50 > 20)
end

index.pattern = function()
    print(string.find('banana', 'an')) -- 'an'
    print(string.find("abcdefg", 'b..')) -- 2 4
    print(string.match("absolute", 'b..')) -- bso
    print(string.match("foo 123 bar", '%d%d')) -- 12
    print(string.match("text with an Uppercase letter", '%u')) -- U
    print(string.match("abcd", "[bc]|[bc]"))
    print(string.match("abcd", "[^ad]"))
    print(string.match("123", '[0-9]'))
    print(string.match("examples", 'examples?')) -- examples
    print(string.match("examples", 'notexamples?')) -- nil
    -- <http://lua-users.org/wiki/PatternsTutorial>
end

-- index.table = function()
--     local a = {1, 2, 5, 4}
--     print(table.of(a))
-- end

index.os = function()
    print(os.date())
    os.execute("sleep " .. 1)
    print(os.date("%Y-%m-%d"))
    print(os.clock())
    print(os.time())
end

index.strfunc = function()
    local s = "123456789"
    local t = "Hello World"
    print(string.len(s), #s, "length")
    print(string.sub(s, 3, 9), "sub")
    print(string.find(s, "345"), "find")
    print(string.gsub(s, "9", "1"), "gsub")
    print(tonumber(s))
    print(tostring(tonumber(s)))
    print(string.upper(t))
    print(string.lower(t))
    print(string.reverse(t))
    print(string.char(string.byte(t)))
    print(string.rep(t, 3))
    print(string.dump(function() print "hell" end))
    print(string.format("%04d", 10))

    local l = "one;two;;four"
    local words = {}
    for w in (l .. ";"):gmatch("([^;]*);") do table.insert(words, w) end
end

index.numfunc = function()
    print(math.min(1, 2, 3))
    print(math.max(1, 2, 3))
    print(math.ceil(2.1))
    print(math.floor(2.1))
    print(math.random())
    print(math.random(100))
    print(math.random(20, 800)) -- 20 ~ 800 の整数
end

index.stdout = function()
    print("print() function")
    print("io.write() function online stdout")
end

index.forloop = function()
    for i = 0, 9 do print(i) end
    for i = 0, 9, 2 do print(i) end
    local t = {a = "one", b = "two", c = "three"}
    for i, value in pairs(t) do print("for print", i, value) end
    local a = {12, 24, "hey"}
    for i, value in ipairs(a) do print(i, value) end
end

index.modable = function()
    local function a(...)
        local args = {...}
        local total = 0
        for i = 1, #args do total = total + args[i] end
        return total
    end
    print(a(1, 2, 3, 4, 5, 6))
end

index.type = function()
    print(type(123))
    print(type("string"))
    print(type(index.stdout))
    print(type(true), type(false))
end

index.commentout = function()
    -- this is online comment out
    --[[
		multiple line comment out
		multiple line comment out
	]]
    print(
        "-- this is online comment out\n [[ multiple line comment out multiple line comment out ]] ")
end

-- index.main(arg)
index.main(arg[1])
return index
