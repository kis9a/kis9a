[./sed.md]
[./awk.md]
[./grep.md]
[./xargs.md]

script
nc
scp
ngrok
pv - progress
lv
nice
top
bg
cron
at
nohup
tee
tr
cut
grep
gunplot
sort
uniq
wc
uname
time
locale
man
chmod
ls

pmset

---

ripgrep
fd
pup
jq
q
[
diff
hexeump
xepr: perform arithmetic or boolean operations or evaluate regular expressions
m4: simple macro processor
yes: print a string a lot
cal: nice calendar
env: run a command (useful in scripts)
printenv: print out environment variables (useful in debugging and scripts)
look: find English words (or lines in a file) beginning with a string
cut, paste and join: data manipulation
fmt: format text paragraphs
pr: format text into pages/columns
fold: wrap lines of text
column: format text fields into aligned, fixed-width columns or tables
expand and unexpand: convert between tabs and spaces
nl: add line numbers
seq: print numbers
bc: calculator
factor: factor integers
gpg: encrypt and sign files
toe: table of terminfo entries
nc: network debugging and data transfer
socat: socket relay and tcp port forwarder (similar to netcat)
slurm: network traffic visualization
dd: moving data between files or devices
file: identify type of a file
tree: display directories and subdirectories as a nesting tree; like ls but recursive
stat: file info
time: execute and time a command
timeout: execute a command for specified amount of time and stop the process when the specified amount of time completes.
lockfile: create semaphore file that can only be removed by rm -f
logrotate: rotate, compress and mail logs.
watch: run a command repeatedly, showing results and/or highlighting changes
when-changed: runs any command you specify whenever it sees file changed. See inotifywait and entr as well.
tac: print files in reverse
comm: compare sorted files line by line
strings: extract text from binary files
tr: character translation or manipulation
iconv or uconv: conversion for text encodings
split and csplit: splitting files
sponge: read all input before writing it, useful for reading from then writing to the same file, e.g., grep -v something some-file | sponge some-file
units: unit conversions and calculations; converts furlongs per fortnight to twips per blink (see also /usr/share/units/definitions.units)
apg: generates random passwords
xz: high-ratio file compression
ldd: dynamic library info
nm: symbols from object files
ab or wrk: benchmarking web servers
strace: system call debugging
mtr: better traceroute for network debugging
cssh: visual concurrent shell
rsync: sync files and folders over SSH or in local file system
wireshark and tshark: packet capture and network debugging
ngrep: grep for the network layer
host and dig: DNS lookups
lsof: process file descriptor and socket info
dstat: useful system stats
glances: high level, multi-subsystem overview
iostat: Disk usage stats
mpstat: CPU usage stats
vmstat: Memory usage stats
htop: improved version of top
last: login history
w: who's logged on
id: user/group identity info
sar: historic system stats
iftop or nethogs: network utilization by socket or process
ss: socket statistics
dmesg: boot and system error messages
sysctl: view and configure Linux kernel parameters at run time
hdparm: SATA/ATA disk manipulation/performance
lsblk: list block devices: a tree view of your disks and disk partitions
lshw, lscpu, lspci, lsusb, dmidecode: hardware information, including CPU, BIOS, RAID, graphics, devices, etc.
lsmod and modinfo: List and show details of kernel modules.
fortune, ddate, and sl: um, well, it depends on whether you consider steam locomotives and Zippy quotations "useful"

https://www.gnu.org/software/
http://bsd.org/

curl -s "https://www.gnu.org/software/" | pup ".package-list text{}" | sed '/^[[:space:]]\*$/d' | xargs -P3 -I {} brew install {}
a2ps
acct
acm
adns
alive
anubis
apl
archimedes
aris
artanis
aspell
auctex
autoconf
autoconf-archive
autogen
automake
avl
ballandpaddle
barcode
bash
bayonne
bazaar
bc
behistun
bfd
binutils
bison
bool
bpel2owfn
c-graph
ccaudio
ccd2cue
ccide
ccrtp
ccscript
cflow
cgicc
chess
cim
classpath
classpathx
clisp
combine
commoncpp
complexity
config
consensus
coreutils
cpio
cppi
cssc
cursynth
dap
datamash
dc
ddd
ddrescue
dejagnu
denemo
dia
dico
diction
diffutils
dionysus
direvent
djgpp
dominion
dr-geo
easejs
ed
edma
electric
emacs
emacs-muse
emms
enscript
eprints
epsilon
fdisk
ferret
findutils
fisicalab
foliot
fontopia
fontutils
freedink
freefont
freeipmi
freetalk
fribidi
g-golf
gama
garpd
gawk
gcal
gcc
gcide
gcl
gcompris
gdb
gdbm
gengen
gengetopt
gettext
gforth
ggradebook
ghostscript
gift
gimp
glean
gleem
glib
global
glpk
glue
gmediaserver
gmp
gnash
gnat
gnats
gnatsweb
gneuralnetwork
gnome
gnowsys
gnu-c-manual
gnu-crypto
gnu-pw-mgr
gnuae
gnuastro
gnubatch
gnubg
gnubiff
gnubik
gnucap
gnucash
gnucobol
gnucomm
gnudos
gnufm
gnugo
gnuit
gnujdoc
gnujump
gnukart
gnulib
gnumach
gnumed
gnumeric
gnump3d
gnun
gnunet
gnupg
gnupod
gnuprologjava
gnuradio
gnurobots
gnuschool
gnushogi
gnusound
gnuspeech
gnuspool
gnustandards
gnustep
gnutls
gnutrition
gnuzilla
goptical
gorm
gpaint
gperf
gprolog
grabcomics
greg
grep
gretl
groff
grub
gsasl
gsegrafix
gsl
gslip
gsrc
gss
gtick
gtk+
gtypist
guile
guile-cv
guile-dbi
guile-gnome
guile-ncurses
guile-opengl
guile-rpc
guile-sdl
guix
gurgle
gv
gvpe
gwl
gxmessage
gzip
halifax
health
hello
help2man
hp2xx
html-info
httptunnel
hurd
hyperbole
icecat
idutils
ignuit
indent
inetutils
inklingreader
intlfonts
jacal
jami
java-getopt
jel
jtw
jwhois
kawa
kopi
leg
less
libc
libcdio
libdbh
liberty-eiffel
libextractor
libffcall
libgcrypt
libiconv
libidn
libjit
libmatheval
libmicrohttpd
libredwg
librejs
libsigsegv
libtasn1
libtool
libunistring
libxmi
lightning
lilypond
lims
linux-libre
liquidwar6
lispintro
lrzsz
lsh
m4
macchanger
mailman
mailutils
make
marst
maverik
mc
mcron
mcsim
mdk
mediagoblin
melting
mempool
mes
metaexchange
metahtml
metalogic-inference
mifluz
mig
miscfiles
mit-scheme
moe
motti
mpc
mpfr
mpria
mtools
nana
nano
nano-archimedes
ncurses
nettle
network
ocrad
octave
oleo
oo-browser
orgadoc
osip
panorama
parallel
parted
pascal
patch
paxutils
pcb
pdf
pem
pexec
phantom_home
pies
pipo
plotutils
poke
polyxmass
powerguru
proxyknife
pspp
psychosynth
pth
pyconfigure
pythonwebkit
qexo
quickthreads
r
radius
rcs
readline
recutils
reftex
remotecontrol
rottlog
rpge
rush
sather
scm
screen
sed
serveez
sharutils
shepherd
shishi
shmm
shtool
sipwitch
slib
smalltalk
social
solfege
spacechart
speex
spell
sqltutor
src-highlite
ssw
stalkerfs
stow
stump
superopt
swbis
sysutils
taler
talkfilters
tar
termcap
termutils
teseq
teximpatient
texinfo
texmacs
thales
time
tramp
trans-coord
trueprint
unifont
units
unrtf
userv
uucp
vc-dwim
vcdimager
vera
vmgen
wb
wdiff
websocket4j
webstump
wget
which
womb
xaos
xboard
xlogmaster
xmlat
xnee
xorriso
zile
