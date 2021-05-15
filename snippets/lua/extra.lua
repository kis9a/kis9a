local extra = {}

extra.main = function(arg)
    local a = arg[1]
    if a == 'greet' then extra.greet() end
end

extra.greet = function() print("this is extra functions") end

extra.map = function(fn, ary)
    local a = {}
    for i = 1, #ary do table.insert(a, fn(ary[i])) end
    return a
end

extra.remove_if = function(fn, ary)
    local a = {}
    for i = 1, #ary do if not fn(ary[i]) then table.insert(a, ary[i]) end end
    return a
end

extra.filter = function(fn, ary)
    local a = {}
    for i = 1, #ary do if fn(ary[i]) then table.insert(a, ary[i]) end end
    return a
end

extra.times_element = function(n, ary)
    return extra.map(function(x) return x * n end, ary)
end

extra.remove_string = function(c, ary)
    return extra.remove_if(function(x) return c == string.sub(x, 1, 1) end, ary)
end

extra.range = function(a, b, step)
    if not b then
        b = a
        a = 1
    end
    step = step or 1
    local f = step > 0 and function(_, lastvalue)
        local nextvalue = lastvalue + step
        if nextvalue <= b then return nextvalue end
    end or step < 0 and function(_, lastvalue)
        local nextvalue = lastvalue + step
        if nextvalue >= b then return nextvalue end
    end or function(_, lastvalue) return lastvalue end
    return f, nil, a - step
end

extra.main(arg)
return extra

--- http://www.nct9.ne.jp/m_hiroi/light/lua03.html

---- Carp.lua
---- This package is based on Perl Carp
---- (http://search.cpan.org/~nwclark/perl-5.8.8/lib/Carp.pm)
---- David Manura, 2006-09, 2007-07

--local M = {}

--function M.croak(message)
--  local current_env = getfenv(2)
--  local level = 2
--  while true do
--    local is_success, result = pcall(function()
--      return getfenv(level + 2)
--    end)
--    if is_success then
--      local env = result
--      --print("DEBUG:level", level, env._NAME)
--      if env ~= current_env then
--        --print("DEBUG:found", level, env._NAME)
--        error(message, level)
--      end
--    elseif string.find(result, "(invalid level)") then
--      break
--    end
--    level = level + 1
--  end
--end

--return M

