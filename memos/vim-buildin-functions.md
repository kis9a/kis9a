USAGE RESULT DESCRIPTION ~ :h vim-function

abs({expr}) Float or Number absolute value of {expr}
acos({expr}) Float arc cosine of {expr}
add({list}, {item}) List append {item} to |List| {list}
and({expr}, {expr}) Number bitwise AND
api*info() Dict api metadata
append({lnum}, {string}) Number append {string} below line {lnum}
append({lnum}, {list}) Number append lines {list} below line {lnum}
argc([{winid}]) Number number of files in the argument list
argidx() Number current index in the argument list
arglistid([{winnr} [, {tabnr}]]) Number argument list id
argv({nr} [, {winid}]) String {nr} entry of the argument list
argv([-1, {winid}]) List the argument list
asin({expr}) Float arc sine of {expr}
assert_beeps({cmd}) Number assert {cmd} causes a beep
assert_equal({exp}, {act} [, {msg}])
Number assert {exp} is equal to {act}
assert_equalfile({fname-one}, {fname-two} [, {msg}])
Number assert file contents are equal
assert_exception({error} [, {msg}])
Number assert {error} is in v:exception
assert_fails({cmd} [, {error}]) Number assert {cmd} fails
assert_false({actual} [, {msg}])
Number assert {actual} is false
assert_inrange({lower}, {upper}, {actual} [, {msg}])
Number assert {actual} is inside the range
assert_match({pat}, {text} [, {msg}])
Number assert {pat} matches {text}
assert_nobeep({cmd}) Number assert {cmd} does not cause a beep
assert_notequal({exp}, {act} [, {msg}])
Number assert {exp} is not equal {act}
assert_notmatch({pat}, {text} [, {msg}])
Number assert {pat} not matches {text}
assert_report({msg}) Number report a test failure
assert_true({actual} [, {msg}]) Number assert {actual} is true
atan({expr}) Float arc tangent of {expr}
atan2({expr}, {expr}) Float arc tangent of {expr1} / {expr2}
browse({save}, {title}, {initdir}, {default})
String put up a file requester
browsedir({title}, {initdir}) String put up a directory requester
bufadd({name}) Number add a buffer to the buffer list
bufexists({expr}) Number |TRUE| if buffer {expr} exists
buflisted({expr}) Number |TRUE| if buffer {expr} is listed
bufload({expr}) Number load buffer {expr} if not loaded yet
bufloaded({expr}) Number |TRUE| if buffer {expr} is loaded
bufname([{expr}]) String Name of the buffer {expr}
bufnr([{expr} [, {create}]]) Number Number of the buffer {expr}
bufwinid({expr}) Number |window-ID| of buffer {expr}
bufwinnr({expr}) Number window number of buffer {expr}
byte2line({byte}) Number line number at byte count {byte}
byteidx({expr}, {nr}) Number byte index of {nr}'th char in {expr}
byteidxcomp({expr}, {nr}) Number byte index of {nr}'th char in {expr}
call({func}, {arglist} [, {dict}])
any call {func} with arguments {arglist}
ceil({expr}) Float round {expr} up
changenr() Number current change number
chanclose({id}[, {stream}]) Number Closes a channel or one of its streams
chansend({id}, {data}) Number Writes {data} to channel
char2nr({expr}[, {utf8}]) Number ASCII/UTF8 value of first char in {expr}
charidx({string}, {idx} [, {countcc}])
Number char index of byte {idx} in {string}
cindent({lnum}) Number C indent for line {lnum}
clearmatches([{win}]) none clear all matches
col({expr}) Number column nr of cursor or mark
complete({startcol}, {matches}) none set Insert mode completion
complete_add({expr}) Number add completion match
complete_check() Number check for key typed during completion
complete_info([{what}]) Dict get current completion information
confirm({msg} [, {choices} [, {default} [, {type}]]])
Number number of choice picked by user
copy({expr}) any make a shallow copy of {expr}
cos({expr}) Float cosine of {expr}
cosh({expr}) Float hyperbolic cosine of {expr}
count({list}, {expr} [, {ic} [, {start}]])
Number count how many {expr} are in {list}
cscope_connection([{num}, {dbpath} [, {prepend}]])
Number checks existence of cscope connection
ctxget([{index}]) Dict return the |context| dict at {index}
ctxpop() none pop and restore |context| from the
|context-stack|
ctxpush([{types}]) none push the current |context| to the
|context-stack|
ctxset({context}[, {index}]) none set |context| at {index}
ctxsize() Number return |context-stack| size
cursor({lnum}, {col} [, {off}])
Number move cursor to {lnum}, {col}, {off}
cursor({list}) Number move cursor to position in {list}
debugbreak({pid}) Number interrupt process being debugged
deepcopy({expr} [, {noref}]) any make a full copy of {expr}
delete({fname} [, {flags}]) Number delete the file or directory {fname}
deletebufline({expr}, {first}[, {last}])
Number delete lines from buffer {expr}
dictwatcheradd({dict}, {pattern}, {callback})
Start watching a dictionary
dictwatcherdel({dict}, {pattern}, {callback})
Stop watching a dictionary
did_filetype() Number |TRUE| if FileType autocommand event used
diff_filler({lnum}) Number diff filler lines about {lnum}
diff_hlID({lnum}, {col}) Number diff highlighting at {lnum}/{col}
empty({expr}) Number |TRUE| if {expr} is empty
environ() Dict return environment variables
escape({string}, {chars}) String escape {chars} in {string} with '\'
eval({string}) any evaluate {string} into its value
eventhandler() Number |TRUE| if inside an event handler
executable({expr}) Number 1 if executable {expr} exists
execute({command}) String execute and capture output of {command}
exepath({expr}) String full path of the command {expr}
exists({expr}) Number |TRUE| if {expr} exists
extend({expr1}, {expr2} [, {expr3}])
List/Dict insert items of {expr2} into {expr1}
exp({expr}) Float exponential of {expr}
expand({expr} [, {nosuf} [, {list}]])
any expand special keywords in {expr}
expandcmd({expr}) String expand {expr} like with `:edit`
feedkeys({string} [, {mode}]) Number add key sequence to typeahead buffer
filereadable({file}) Number |TRUE| if {file} is a readable file
filewritable({file}) Number |TRUE| if {file} is a writable file
filter({expr1}, {expr2}) List/Dict remove items from {expr1} where
{expr2} is 0
finddir({name} [, {path} [, {count}]])
String find directory {name} in {path}
findfile({name} [, {path} [, {count}]])
String find file {name} in {path}
flatten({list} [, {maxdepth}]) List flatten {list} up to {maxdepth} levels
float2nr({expr}) Number convert Float {expr} to a Number
floor({expr}) Float round {expr} down
fmod({expr1}, {expr2}) Float remainder of {expr1} / {expr2}
fnameescape({fname}) String escape special characters in {fname}
fnamemodify({fname}, {mods}) String modify file name
foldclosed({lnum}) Number first line of fold at {lnum} if closed
foldclosedend({lnum}) Number last line of fold at {lnum} if closed
foldlevel({lnum}) Number fold level at {lnum}
foldtext() String line displayed for closed fold
foldtextresult({lnum}) String text for closed fold at {lnum}
foreground() Number bring the Vim window to the foreground
funcref({name} [, {arglist}] [, {dict}])
Funcref reference to function {name}
function({name} [, {arglist}] [, {dict}])
Funcref named reference to function {name}
garbagecollect([{atexit}]) none free memory, breaking cyclic references
get({list}, {idx} [, {def}]) any get item {idx} from {list} or {def}
get({dict}, {key} [, {def}]) any get item {key} from {dict} or {def}
get({func}, {what}) any get property of funcref/partial {func}
getbufinfo([{expr}]) List information about buffers
getbufline({expr}, {lnum} [, {end}])
List lines {lnum} to {end} of buffer {expr}
getbufvar({expr}, {varname} [, {def}])
any variable {varname} in buffer {expr}
getchangelist({expr}) List list of change list items
getchar([expr]) Number get one character from the user
getcharmod() Number modifiers for the last typed character
getcharsearch() Dict last character search
getcmdline() String return the current command-line
getcmdpos() Number return cursor position in command-line
getcmdtype() String return current command-line type
getcmdwintype() String return current command-line window type
getcompletion({pat}, {type} [, {filtered}])
List list of cmdline completion matches
getcurpos() List position of the cursor
getcwd([{winnr} [, {tabnr}]]) String get the current working directory
getenv({name}) String return environment variable
getfontname([{name}]) String name of font being used
getfperm({fname}) String file permissions of file {fname}
getfsize({fname}) Number size in bytes of file {fname}
getftime({fname}) Number last modification time of file
getftype({fname}) String description of type of file {fname}
getjumplist([{winnr} [, {tabnr}]])
List list of jump list items
getline({lnum}) String line {lnum} of current buffer
getline({lnum}, {end}) List lines {lnum} to {end} of current buffer
getloclist({nr} [, {what}]) List list of location list items
getmarklist([{expr}]) List list of global/local marks
getmatches([{win}]) List list of current matches
getpid() Number process ID of Vim
getpos({expr}) List position of cursor, mark, etc.
getqflist([{what}]) List list of quickfix items
getreg([{regname} [, 1 [, {list}]]])
String or List contents of register
getregtype([{regname}]) String type of register
gettabinfo([{expr}]) List list of tab pages
gettabvar({nr}, {varname} [, {def}])
any variable {varname} in tab {nr} or {def}
gettabwinvar({tabnr}, {winnr}, {name} [, {def}])
any {name} in {winnr} in tab page {tabnr}
gettagstack([{nr}]) Dict get the tag stack of window {nr}
getwininfo([{winid}]) List list of windows
getwinpos([{timeout}]) List X and Y coord in pixels of the Vim window
getwinposx() Number X coord in pixels of Vim window
getwinposy() Number Y coord in pixels of Vim window
getwinvar({nr}, {varname} [, {def}])
any variable {varname} in window {nr}
glob({expr} [, {nosuf} [, {list} [, {alllinks}]]])
any expand file wildcards in {expr}
glob2regpat({expr}) String convert a glob pat into a search pat
globpath({path}, {expr} [, {nosuf} [, {list} [, {alllinks}]]])
String do glob({expr}) for all dirs in {path}
has({feature}) Number |TRUE| if feature {feature} supported
has_key({dict}, {key}) Number |TRUE| if {dict} has entry {key}
haslocaldir([{winnr} [, {tabnr}]])
Number |TRUE| if current window executed |:lcd|
hasmapto({what} [, {mode} [, {abbr}]])
Number |TRUE| if mapping to {what} exists
histadd({history}, {item}) String add an item to a history
histdel({history} [, {item}]) String remove an item from a history
histget({history} [, {index}]) String get the item {index} from a history
histnr({history}) Number highest index of a history
hlexists({name}) Number |TRUE| if highlight group {name} exists
hlID({name}) Number syntax ID of highlight group {name}
hostname() String name of the machine Vim is running on
iconv({expr}, {from}, {to}) String convert encoding of {expr}
indent({lnum}) Number indent of line {lnum}
index({list}, {expr} [, {start} [, {ic}]])
Number index in {list} where {expr} appears
input({prompt} [, {text} [, {completion}]])
String get input from the user
inputlist({textlist}) Number let the user pick from a choice list
inputrestore() Number restore typeahead
inputsave() Number save and clear typeahead
inputsecret({prompt} [, {text}])
String like input() but hiding the text
insert({list}, {item} [, {idx}])
List insert {item} in {list} [before {idx}]
interrupt() none interrupt script execution
invert({expr}) Number bitwise invert
isdirectory({directory}) Number |TRUE| if {directory} is a directory
isinf({expr}) Number determine if {expr} is infinity value
(positive or negative)
islocked({expr}) Number |TRUE| if {expr} is locked
isnan({expr}) Number |TRUE| if {expr} is NaN
id({expr}) String identifier of the container
items({dict}) List key-value pairs in {dict}
jobpid({id}) Number Returns pid of a job.
jobresize({id}, {width}, {height})
Number Resize pseudo terminal window of a job
jobstart({cmd}[, {opts}]) Number Spawns {cmd} as a job
jobstop({id}) Number Stops a job
jobwait({ids}[, {timeout}]) Number Wait for a set of jobs
join({list} [, {sep}]) String join {list} items into one String
json_decode({expr}) any Convert {expr} from JSON
json_encode({expr}) String Convert {expr} to JSON
keys({dict}) List keys in {dict}
len({expr}) Number the length of {expr}
libcall({lib}, {func}, {arg}) String call {func} in library {lib} with {arg}
libcallnr({lib}, {func}, {arg}) Number idem, but return a Number
line({expr}) Number line nr of cursor, last line or mark
line2byte({lnum}) Number byte count of line {lnum}
lispindent({lnum}) Number Lisp indent for line {lnum}
list2str({list} [, {utf8}]) String turn numbers in {list} into a String
localtime() Number current time
log({expr}) Float natural logarithm (base e) of {expr}
log10({expr}) Float logarithm of Float {expr} to base 10
luaeval({expr}[, {expr}]) any evaluate Lua expression
map({expr1}, {expr2}) List/Dict change each item in {expr1} to {expr}
maparg({name}[, {mode} [, {abbr} [, {dict}]]])
String or Dict
rhs of mapping {name} in mode {mode}
mapcheck({name}[, {mode} [, {abbr}]])
String check for mappings matching {name}
match({expr}, {pat}[, {start}[, {count}]])
Number position where {pat} matches in {expr}
matchadd({group}, {pattern}[, {priority}[, {id}]])
Number highlight {pattern} with {group}
matchaddpos({group}, {list}[, {priority}[, {id}]])
Number highlight positions with {group}
matcharg({nr}) List arguments of |:match|
matchdelete({id} [, {win}]) Number delete match identified by {id}
matchend({expr}, {pat}[, {start}[, {count}]])
Number position where {pat} ends in {expr}
matchlist({expr}, {pat}[, {start}[, {count}]])
List match and submatches of {pat} in {expr}
matchstr({expr}, {pat}[, {start}[, {count}]])
String {count}'th match of {pat} in {expr}
matchstrpos({expr}, {pat}[, {start}[, {count}]])
List {count}'th match of {pat} in {expr}
max({expr}) Number maximum value of items in {expr}
min({expr}) Number minimum value of items in {expr}
mkdir({name} [, {path} [, {prot}]])
Number create directory {name}
mode([expr]) String current editing mode
msgpackdump({list}) List dump a list of objects to msgpack
msgpackparse({list}) List parse msgpack to a list of objects
nextnonblank({lnum}) Number line nr of non-blank line >= {lnum}
nr2char({expr}[, {utf8}]) String single char with ASCII/UTF8 value {expr}
nvim*...({args}...) any call nvim |api| functions
or({expr}, {expr}) Number bitwise OR
pathshorten({expr}) String shorten directory names in a path
perleval({expr}) any evaluate |perl| expression
pow({x}, {y}) Float {x} to the power of {y}
prevnonblank({lnum}) Number line nr of non-blank line <= {lnum}
printf({fmt}, {expr1}...) String format text
prompt_setcallback({buf}, {expr}) none set prompt callback function
prompt_setinterrupt({buf}, {text}) none set prompt interrupt function
prompt_setprompt({buf}, {text}) none set prompt text
pum_getpos() Dict position and size of pum if visible
pumvisible() Number whether popup menu is visible
pyeval({expr}) any evaluate |Python| expression
py3eval({expr}) any evaluate |python3| expression
pyxeval({expr}) any evaluate |python_x| expression
range({expr} [, {max} [, {stride}]])
List items from {expr} to {max}
readdir({dir} [, {expr}]) List file names in {dir} selected by {expr}
readfile({fname} [, {binary} [, {max}]])
List get list of lines from file {fname}
reg_executing() String get the executing register name
reg_recording() String get the recording register name
reltime([{start} [, {end}]]) List get time value
reltimefloat({time}) Float turn the time value into a Float
reltimestr({time}) String turn time value into a String
remote_expr({server}, {string} [, {idvar} [, {timeout}]])
String send expression
remote_foreground({server}) Number bring Vim server to the foreground
remote_peek({serverid} [, {retvar}])
Number check for reply string
remote_read({serverid} [, {timeout}])
String read reply string
remote_send({server}, {string} [, {idvar}])
String send key sequence
remote_startserver({name}) none become server {name}
remove({list}, {idx} [, {end}]) any remove items {idx}-{end} from {list}
remove({dict}, {key}) any remove entry {key} from {dict}
rename({from}, {to}) Number rename (move) file from {from} to {to}
repeat({expr}, {count}) String repeat {expr} {count} times
resolve({filename}) String get filename a shortcut points to
reverse({list}) List reverse {list} in-place
round({expr}) Float round off {expr}
rubyeval({expr}) any evaluate |Ruby| expression
rpcnotify({channel}, {event}[, {args}...])
Sends an |RPC| notification to {channel}
rpcrequest({channel}, {method}[, {args}...])
Sends an |RPC| request to {channel}
screenattr({row}, {col}) Number attribute at screen position
screenchar({row}, {col}) Number character at screen position
screencol() Number current cursor column
screenpos({winid}, {lnum}, {col}) Dict screen row and col of a text character
screenrow() Number current cursor row
search({pattern} [, {flags} [, {stopline} [, {timeout}]]])
Number search for {pattern}
searchdecl({name} [, {global} [, {thisblock}]])
Number search for variable declaration
searchpair({start}, {middle}, {end} [, {flags} [, {skip} [...]]])
Number search for other end of start/end pair
searchpairpos({start}, {middle}, {end} [, {flags} [, {skip} [...]]])
List search for other end of start/end pair
searchpos({pattern} [, {flags} [, {stopline} [, {timeout}]]])
List search for {pattern}
server2client({clientid}, {string})
Number send reply string
serverlist() String get a list of available servers
setbufline( {expr}, {lnum}, {line})
Number set line {lnum} to {line} in buffer
{expr}
setbufvar({expr}, {varname}, {val}) set {varname} in buffer {expr} to {val}
setcharsearch({dict}) Dict set character search from {dict}
setcmdpos({pos}) Number set cursor position in command-line
setenv({name}, {val}) none set environment variable
setfperm({fname}, {mode} Number set {fname} file permissions to {mode}
setline({lnum}, {line}) Number set line {lnum} to {line}
setloclist({nr}, {list}[, {action}[, {what}]])
Number modify location list using {list}
setmatches({list} [, {win}]) Number restore a list of matches
setpos({expr}, {list}) Number set the {expr} position to {list}
setqflist({list}[, {action}[, {what}]]
Number modify quickfix list using {list}
setreg({n}, {v}[, {opt}]) Number set register to value and type
settabvar({nr}, {varname}, {val}) set {varname} in tab page {nr} to {val}
settabwinvar({tabnr}, {winnr}, {varname}, {val}) set {varname} in window
{winnr} in tab page {tabnr} to {val}
settagstack({nr}, {dict} [, {action}])
Number modify tag stack using {dict}
setwinvar({nr}, {varname}, {val}) set {varname} in window {nr} to {val}
sha256({string}) String SHA256 checksum of {string}
shellescape({string} [, {special}])
String escape {string} for use as shell
command argument
shiftwidth([{col}]) Number effective value of 'shiftwidth'
sign_define({name} [, {dict}]) Number define or update a sign
sign_define({list}) List define or update a list of signs
sign_getdefined([{name}]) List get a list of defined signs
sign_getplaced([{expr} [, {dict}]])
List get a list of placed signs
sign_jump({id}, {group}, {expr})
Number jump to a sign
sign_place({id}, {group}, {name}, {expr} [, {dict}])
Number place a sign
sign_placelist({list}) List place a list of signs
sign_undefine([{name}]) Number undefine a sign
sign_undefine({list}) List undefine a list of signs
sign_unplace({group} [, {dict}])
Number unplace a sign
sign_unplacelist({list}) List unplace a list of signs
simplify({filename}) String simplify filename as much as possible
sin({expr}) Float sine of {expr}
sinh({expr}) Float hyperbolic sine of {expr}
sockconnect({mode}, {address} [, {opts}])
Number Connects to socket
sort({list} [, {func} [, {dict}]])
List sort {list}, using {func} to compare
soundfold({word}) String sound-fold {word}
spellbadword() String badly spelled word at cursor
spellsuggest({word} [, {max} [, {capital}]])
List spelling suggestions
split({expr} [, {pat} [, {keepempty}]])
List make |List| from {pat} separated {expr}
sqrt({expr}) Float square root of {expr}
stdioopen({dict}) Number open stdio in a headless instance.
stdpath({what}) String/List returns the standard path(s) for {what}
str2float({expr}) Float convert String to Float
str2list({expr} [, {utf8}]) List convert each character of {expr} to
ASCII/UTF8 value
str2nr({expr} [, {base}]) Number convert String to Number
strchars({expr} [, {skipcc}]) Number character length of the String {expr}
strcharpart({str}, {start} [, {len}])
String {len} characters of {str} at
character {start}
strdisplaywidth({expr} [, {col}]) Number display length of the String {expr}
strftime({format} [, {time}]) String format time with a specified format
strgetchar({str}, {index}) Number get char {index} from {str}
stridx({haystack}, {needle} [, {start}])
Number index of {needle} in {haystack}
string({expr}) String String representation of {expr} value
strlen({expr}) Number length of the String {expr}
strpart({str}, {start} [, {len} [, {chars}]])
String {len} bytes/chars of {str} at
byte {start}
strptime({format}, {timestring})
Number Convert {timestring} to unix timestamp
strridx({haystack}, {needle} [, {start}])
Number last index of {needle} in {haystack}
strtrans({expr}) String translate string to make it printable
strwidth({expr}) Number display cell length of the String {expr}
submatch({nr} [, {list}]) String or List
specific match in ":s" or substitute()
substitute({expr}, {pat}, {sub}, {flags})
String all {pat} in {expr} replaced with {sub}
swapinfo({fname}) Dict information about swap file {fname}
swapname({expr}) String swap file of buffer {expr}
synID({lnum}, {col}, {trans}) Number syntax ID at {lnum} and {col}
synIDattr({synID}, {what} [, {mode}])
String attribute {what} of syntax ID {synID}
synIDtrans({synID}) Number translated syntax ID of {synID}
synconcealed({lnum}, {col}) List info about concealing
synstack({lnum}, {col}) List stack of syntax IDs at {lnum} and {col}
system({cmd} [, {input}]) String output of shell command/filter {cmd}
systemlist({cmd} [, {input}]) List output of shell command/filter {cmd}
tabpagebuflist([{arg}]) List list of buffer numbers in tab page
tabpagenr([{arg}]) Number number of current or last tab page
tabpagewinnr({tabarg}[, {arg}])
Number number of current window in tab page
taglist({expr}[, {filename}]) List list of tags matching {expr}
tagfiles() List tags files used
tan({expr}) Float tangent of {expr}
tanh({expr}) Float hyperbolic tangent of {expr}
tempname() String name for a temporary file
test_garbagecollect_now() none free memory right now for testing
timer_info([{id}]) List information about timers
timer_pause({id}, {pause}) none pause or unpause a timer
timer_start({time}, {callback} [, {options}])
Number create a timer
timer_stop({timer}) none stop a timer
timer_stopall() none stop all timers
tolower({expr}) String the String {expr} switched to lowercase
toupper({expr}) String the String {expr} switched to uppercase
tr({src}, {fromstr}, {tostr}) String translate chars of {src} in {fromstr}
to chars in {tostr}
trim({text} [, {mask} [, {dir}]])
String trim characters in {mask} from {text}
trunc({expr}) Float truncate Float {expr}
type({name}) Number type of variable {name}
undofile({name}) String undo file name for {name}
undotree() List undo file tree
uniq({list} [, {func} [, {dict}]])
List remove adjacent duplicates from a list
values({dict}) List values in {dict}
virtcol({expr}) Number screen column of cursor or mark
visualmode([expr]) String last visual mode used
wait({timeout}, {condition}[, {interval}])
Number Wait until {condition} is satisfied
wildmenumode() Number whether 'wildmenu' mode is active
win_findbuf({bufnr}) List find windows containing {bufnr}
win_getid([{win} [, {tab}]]) Number get |window-ID| for {win} in {tab}
win_gettype([{nr}]) String type of window {nr}
win_gotoid({expr}) Number go to |window-ID| {expr}
win_id2tabwin({expr}) List get tab and window nr from |window-ID|
win_id2win({expr}) Number get window nr from |window-ID|
win_screenpos({nr}) List get screen position of window {nr}
win_splitmove({nr}, {target} [, {options}])
none move window {nr} to split of {target}
winbufnr({nr}) Number buffer number of window {nr}
wincol() Number window column of the cursor
winheight({nr}) Number height of window {nr}
winlayout([{tabnr}]) List layout of windows in tab {tabnr}
winline() Number window line of the cursor
winnr([{expr}]) Number number of current window
winrestcmd() String returns command to restore window sizes
winrestview({dict}) none restore view of current window
winsaveview() Dict save view of current window
winwidth({nr}) Number width of window {nr}
wordcount() Dict get byte/char/word statistics
writefile({list}, {fname} [, {flags}])
Number write list of lines to file {fname}
xor({expr}, {expr}) Number bitwise XOR

---

      *system-functions* *file-functions*
     *buffer-functions* *window-functions* *arg-functions*

Buffers, windows and the argument list:
Command line: _command-line-functions_
Context Stack: _ctx-functions_
Cursor and mark position: _cursor-functions_ _mark-functions_
Date and Time: _date-functions_ _time-functions_
Dictionary manipulation: _dict-functions_
Floating point computation: _float-functions_
Folding: _folding-functions_
GUI: _gui-functions_
History: _history-functions_
Insert mode completion: _completion-functions_
Interactive: _interactive-functions_
List manipulation: _list-functions_
Mappings: _mapping-functions_
Other computation: _bitwise-function_
Prompt Buffer: _promptbuffer-functions_
Quickfix and location lists: _quickfix-functions_
Signs: _sign-functions_
Spelling: _spell-functions_
String manipulation: _string-functions_
Syntax and highlighting: _syntax-functions_ _highlighting-functions_
System functions and manipulation of files:
Tags: _tag-functions_
Testing: _test-functions_
Timers: _timer-functions_
Variables: _var-functions_
Various: _various-functions_
Vim server: _server-functions_
Window size and position: _window-size-functions_
Working with text in the current buffer: _text-functions_

---

abs() absolute value (also works for Number)
acos() arc cosine
add() append an item to a List
and() bitwise AND
append() append line or list of lines in the buffer
appendbufline() append a list of lines in the specified buffer
argc() number of entries in the argument list
argidx() current position in the argument list
arglistid() get id of the argument list
argv() get one entry from the argument list
asin() arc sine
assert_beeps() assert that a command beeps
assert_equal() assert that two expressions values are equal
assert_equalfile() assert that two file contents are equal
assert_exception() assert that a command throws an exception
assert_fails() assert that a command fails
assert_false() assert that an expression is false
assert_inrange() assert that an expression is inside a range
assert_match() assert that a pattern matches the value
assert_nobeep() assert that a command does not cause a beep
assert_notequal() assert that two expressions values are not equal
assert_notmatch() assert that a pattern does not match the value
assert_true() assert that an expression is true
atan() arc tangent
atan2() arc tangent
balloon_gettext() get the text in the balloon
balloon_show() set the balloon content
balloon_split() split a message for a balloon
browse() put up a file requester
browsedir() put up a directory requester
bufexists() check if a buffer exists
buflisted() check if a buffer exists and is listed
bufloaded() check if a buffer exists and is loaded
bufname() get the name of a specific buffer
bufnr() get the buffer number of a specific buffer
bufwinid() get the window ID of a specific buffer
bufwinnr() get the window number of a specific buffer
byte2line() get line number at a specific byte count
byteidx() byte index of a character in a string
byteidxcomp() like byteidx() but count composing characters
call() call a function with List as arguments
ceil() round up
changenr() return number of most recent change
char2nr() get number value of a character
charidx() character index of a byte in a string
cindent() indent according to C indenting
clearmatches() clear all matches defined by |matchadd()| and
col() column number of the cursor or a mark
complete() set found matches
complete_add() add to found matches
complete_check() check if completion should be aborted
complete_info() get current completion information
confirm() let the user make a choice
copy() make a shallow copy of a Dictionary
copy() make a shallow copy of a List
cos() cosine
cosh() hyperbolic cosine
count() count number of times a value appears
count() count number of times a value appears in a List
cscope_connection() check if a cscope connection exists
ctxget() return context at given index from top
ctxpop() pop and restore top context
ctxpush() push given context
ctxset() set context at given index from top
ctxsize() return context stack size
cursor() position the cursor at a line/column
debugbreak() interrupt a program being debugged
deepcopy() make a full copy of a Dictionary
deepcopy() make a full copy of a List
delete() delete a file
deletebufline() delete lines from a specified buffer
did_filetype() check if a FileType autocommand was used
diff_filler() get the number of filler lines above a line
diff_hlID() get highlight ID for diff mode at a position
empty() check if Dictionary is empty
empty() check if List is empty
environ() get all environment variables
escape() escape characters in a string with a '\'
eval() evaluate a string expression
eventhandler() check if invoked by an event handler
executable() check if an executable program exists
execute() execute an Ex command and get the output
exepath() full path of an executable program
exists() check if a variable, function, etc. exists
exp() exponential
expand() expand special keywords
expandcmd() expand a command like done for `:edit`
extend() add entries from one Dictionary to another
extend() append a List to a List
feedkeys() put characters in the typeahead queue
filereadable() check if a file can be read
filewritable() check if a file can be written to
filter() remove selected entries from a Dictionary
filter() remove selected items from a List
finddir() find a directory in a list of directories
findfile() find a file in a list of directories
flatten() flatten a List
float2nr() convert Float to Number
floor() round down
fmod() remainder of division
fnameescape() escape a file name for use with a Vim command
fnamemodify() modify a file name
foldclosed() check for a closed fold at a specific line
foldclosedend() like foldclosed() but return the last line
foldlevel() check for the fold level at a specific line
foldtext() generate the line displayed for a closed fold
foldtextresult() get the text displayed for a closed fold
foreground() move the Vim window to the foreground
funcref() get a Funcref for a function reference
function() get a Funcref for a function name
garbagecollect() possibly free memory
get() get an entry without an error for a wrong key
get() get an item without error for wrong index
getbufinfo() get a list with buffer information
getbufline() get a list of lines from the specified buffer
getbufvar() get a variable value from a specific buffer
getchangelist() get a list of change list entries
getchar() get a character from the user
getcharmod() get modifiers for the last typed character
getcharsearch() return character search information
getcmdline() get the current command line
getcmdpos() get position of the cursor in the command line
getcmdtype() return the current command-line type
getcmdwintype() return the current command-line window type
getcompletion() list of command-line completion matches
getcurpos() get position of the cursor
getcwd() get the current working directory
getenv() get one environment variable
getfontname() get name of current font being used
getfperm() get the permissions of a file
getfsize() get the size of a file
getftime() get last modification time of a file
getftype() get the kind of a file
getjumplist() get a list of jump list entries
getline() get a line or list of lines from the buffer
getloclist() list of location list items
getmarklist() list of global/local marks
getmatches() get all matches defined by |matchadd()| and
getpid() get process ID of Vim
getpos() get position of cursor, mark, etc.
getqflist() list of quickfix errors
getreg() get contents of a register
getregtype() get type of a register
gettabinfo() get a list with tab page information
gettabvar() get a variable from specific tab page
gettabwinvar() get a variable from specific window & tab page
gettagstack() get the tag stack of a window
getwininfo() get a list with window information
getwinpos() position of the Vim window
getwinposx() X position of the Vim window
getwinposy() Y position of the Vim window
getwinvar() get a variable from specific window
glob() expand wildcards
glob2regpat() convert a glob pattern into a search pattern
globpath() expand wildcards in a number of directories
has() check if a feature is supported in Vim
has_key() check whether a key appears in a Dictionary
haslocaldir() check if current window used |:lcd|
hasmapto() check if a mapping exists
histadd() add an item to a history
histdel() delete an item from a history
histget() get an item from a history
histnr() get highest index of a history list
hlID() get ID of a highlight group
hlexists() check if a highlight group exists
hostname() name of the system
iconv() convert text from one encoding to another
indent() indent of a specific line
index() index of a value in a List
input() get a line from the user
inputdialog() get a line from the user in a dialog
inputlist() let the user pick an entry from a list
inputrestore() restore typeahead
inputsave() save and clear typeahead
inputsecret() get a line from the user without showing it
insert() insert an item somewhere in a List
invert() bitwise invert
isdirectory() check if a directory exists
islocked() check if a variable is locked
items() get List of Dictionary key-value pairs
join() join List items into a String
keys() get List of Dictionary keys
len() number of entries in a Dictionary
len() number of items in a List
libcall() call a function in an external library
libcallnr() idem, returning a number
line() line number of the cursor or mark
line2byte() byte count at a specific line
lispindent() indent according to Lisp indenting
list2str() get a character string from a list of numbers
localtime() get current time in seconds
log() natural logarithm (logarithm to base e)
log10() logarithm to base 10
luaeval() evaluate Lua expression
map() change each Dictionary entry
map() change each List item
maparg() get rhs of a mapping
mapcheck() check if a matching mapping exists
match() position where a pattern matches in a string
matchadd() define a pattern to highlight (a "match")
matchaddpos() define a list of positions to highlight
matcharg() get info about |:match| arguments
matchdelete() delete a match defined by |matchadd()| or a
matchend() position where a pattern match ends in a string
matchlist() like matchstr() and also return submatches
matchstr() match of a pattern in a string
matchstrpos() match and positions of a pattern in a string
max() maximum value in a Dictionary
max() maximum value in a List
min() minimum value in a Dictionary
min() minimum value in a List
mkdir() create a new directory
mode() get current editing mode
nextnonblank() find next non-blank line
nr2char() get a character by its number value
or() bitwise OR
pathshorten() shorten directory names in a path
pow() value of x to the exponent y
prevnonblank() find previous non-blank line
printf() format a string according to % items
prompt_setcallback() set prompt callback for a buffer
prompt_setinterrupt() set interrupt callback for a buffer
prompt_setprompt() set the prompt text for a buffer
pumvisible() check if the popup menu is displayed
py3eval() evaluate Python expression (|+python3|)
pyeval() evaluate Python expression (|+python|)
pyxeval() evaluate |python_x| expression
range() return a List with a sequence of numbers
readdir() get a List of file names in a directory
readfile() read a file into a List of lines
reg_executing() return the name of the register being executed
reg_recording() return the name of the register being recorded
reltime() get the current or elapsed time accurately
reltimefloat() convert reltime() result to a Float
reltimestr() convert reltime() result to a string
remote_expr() evaluate an expression in a Vim server
remote_foreground() move the Vim server window to the foreground
remote_peek() check if there is a reply from a Vim server
remote_read() read a reply from a Vim server
remote_send() send command characters to a Vim server
remote_startserver() run a server
remove() remove an entry from a Dictionary
remove() remove one or more items from a List
rename() rename a file
repeat() repeat a List multiple times
repeat() repeat a string multiple times
resolve() find out where a shortcut points to
reverse() reverse the order of a List
round() round off
screenattr() get attribute at a screen line/row
screenchar() get character code at a screen line/row
screencol() get screen column of the cursor
screenrow() get screen row of the cursor
search() find a match for a pattern
searchdecl() search for the declaration of a name
searchpair() find the other end of a start/skip/end
searchpairpos() find the other end of a start/skip/end
searchpos() find a match for a pattern
server2client() send a reply to a client of a Vim server
serverlist() return the list of server names
setbufline() replace a line in the specified buffer
setbufvar() set a variable in a specific buffer
setcharsearch() set character search information
setcmdpos() set position of the cursor in the command line
setenv() set an environment variable
setfperm() set the permissions of a file
setline() replace a line in the buffer
setloclist() modify a location list
setmatches() restore a list of matches saved by
setpos() set position of cursor, mark, etc.
setqflist() modify a quickfix list
setreg() set contents and type of a register
settabvar() set a variable in a specific tab page
settabwinvar() set a variable in a specific window & tab page
settagstack() modify the tag stack of a window
setwinvar() set a variable in a specific window
sha256() SHA-256 hash
shellescape() escape a string for use with a shell command
shiftwidth() effective value of 'shiftwidth'
sign_define() define or update a sign
sign_getdefined() get a list of defined signs
sign_getplaced() get a list of placed signs
sign_jump() jump to a sign
sign_place() place a sign
sign_placelist() place a list of signs
sign_undefine() undefine a sign
sign_unplace() unplace a sign
sign_unplacelist() unplace a list of signs
simplify() simplify a path without changing its meaning
sin() sine
sinh() hyperbolic sine
sort() sort a List
soundfold() return the sound-a-like equivalent of a word
spellbadword() locate badly spelled word at or after cursor
spellsuggest() return suggested spelling corrections
split() split a String into a List
sqrt() square root
str2float() convert a string to a Float
str2list() get list of numbers from a string
str2nr() convert a string to a Number
strcharpart() get part of a string using char index
strchars() length of a string in characters
strdisplaywidth() size of string when displayed, deals with tabs
strftime() convert time to a string
strgetchar() get character from a string using char index
stridx() first index of a short string in a long string
string() String representation of a Dictionary
string() String representation of a List
strlen() length of a string in bytes
strpart() get part of a string using byte index
strptime() convert a date/time string to time
strridx() last index of a short string in a long string
strtrans() translate a string to make it printable
strwidth() size of string when displayed
submatch() get a specific match in ":s" and substitute()
substitute() substitute a pattern match with a string
swapinfo() information about a swap file
swapname() get the swap file path of a buffer
synID() get syntax ID at a specific position
synIDattr() get a specific attribute of a syntax ID
synIDtrans() get translated syntax ID
synconcealed() get info about concealing
synstack() get list of syntax IDs at a specific position
system() get the result of a shell command as a string
systemlist() get the result of a shell command as a list
tabpagebuflist() return List of buffers in a tab page
tabpagenr() get the number of a tab page
tabpagewinnr() like winnr() for a specified tab page
tagfiles() get a list of tags files
taglist() get list of matching tags
tan() tangent
tanh() hyperbolic tangent
tempname() get the name of a temporary file
the |:match| commands
the |:match| commands
timer_info() get information about timers
timer_pause() pause or unpause a timer
timer_start() create a timer
timer_stop() stop a timer
timer_stopall() stop all timers
tolower() turn a string to lowercase
toupper() turn a string to uppercase
tr() translate characters from one set to another
trim() trim characters from a string
trunc() remove value after decimal point
type() type of a variable
undofile() get the name of the undo file
undotree() return the state of the undo tree
uniq() remove copies of repeated adjacent items
values() get List of Dictionary values
virtcol() screen column of the cursor or a mark
visualmode() last visual mode used
wait() wait for a condition
wildmenumode() check if the wildmode is active
win_execute() like execute() but in a specified window
win_findbuf() find windows containing a buffer
win_getid() get window ID of a window
win_gotoid() go to window with ID
win_id2tabwin() get tab and window nr from window ID
win_id2win() get window nr from window ID
win_screenpos() get screen position of a window
winbufnr() get the buffer number of a specific window
wincol() window column number of the cursor
winheight() get height of a specific window
winlayout() get layout of windows in a tab page
winline() window line number of the cursor
winnr() get the window number for the current window
winrestcmd() return command to restore window sizes
winrestview() restore saved view of current window
winsaveview() get view of current window
winwidth() get width of a specific window
wordcount() get byte/word/char count of buffer
writefile() write a List of lines or Blob into a file
xor() bitwise XOR
