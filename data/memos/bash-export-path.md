How to correctly add a path to PATH?
Asked 9 years ago
Active 6 months ago
Viewed 2.6m times

1080

564
I'm wondering where a new path has to be added to the PATH environment variable. I know this can be accomplished by editing .bashrc (for example), but it's not clear how to do this.

This way:

export PATH=~/opt/bin:$PATH
or this?

export PATH=$PATH:~/opt/bin
bash
environment-variables
path
bashrc
share improve this question follow
edited Sep 17 '15 at 18:27

Scott
8,78577 gold badges3434 silver badges5959 bronze badges
asked Dec 4 '11 at 20:57

Paolo
13.5k1010 gold badges2424 silver badges3737 bronze badges
printf '\nPATH=$PATH:"path-to-add"\nexport PATH\n' >> ~/.bashrc – Microsoft Linux TM Nov 7 '14 at 13:04
3
Unix shell function for adding directories to PATH – Sildoreth Apr 30 '15 at 13:59
1
If there are already some paths added, e.g. PATH=$PATH:$HOME/.local/bin:$HOME/bin, another can be added by separating with a : e.g. PATH=$PATH:$HOME/.local/bin:$HOME/bin:/home/ec2-user/pear/bin. – Sandeepan Nath Aug 20 '16 at 18:40
2
Do these answers work for all flavors of linux? – Ungeheuer Nov 20 '16 at 20:58
1
wrote a little utility to help with exactly this. github.com/aalok-sathe/pathin – axolotl May 12 at 13:48
show 1 more comment
11 Answers

1211

The simple stuff
PATH=$PATH:~/opt/bin
or

PATH=~/opt/bin:$PATH
depending on whether you want to add ~/opt/bin at the end (to be searched after all other directories, in case there is a program by the same name in multiple directories) or at the beginning (to be searched before all other directories).

You can add multiple entries at the same time. PATH=$PATH:~/opt/bin:~/opt/node/bin or variations on the ordering work just fine. Don't put export at the beginning of the line as it has additional complications (see below under “Notes on shells other than bash”).

If your PATH gets built by many different components, you might end up with duplicate entries. See How to add home directory path to be discovered by Unix which command? and Remove duplicate $PATH entries with awk command to avoid adding duplicates or remove them.

Some distributions automatically put ~/bin in your PATH if it exists, by the way.

Where to put it
Put the line to modify PATH in ~/.profile, or in ~/.bash_profile if that's what you have.

Note that ~/.bash_rc is not read by any program, and ~/.bashrc is the configuration file of interactive instances of bash. You should not define environment variables in ~/.bashrc. The right place to define environment variables such as PATH is ~/.profile (or ~/.bash_profile if you don't care about shells other than bash). See What's the difference between them and which one should I use?

Don't put it in /etc/environment or ~/.pam_environment: these are not shell files, you can't use substitutions like $PATH in there. In these files, you can only override a variable, not add to it.

Potential complications in some system scripts
You don't need export if the variable is already in the environment: any change of the value of the variable is reflected in the environment.¹ PATH is pretty much always in the environment; all unix systems set it very early on (usually in the very first process, in fact).

At login time, you can rely on PATH being already in the environment, and already containing some system directories. If you're writing a script that may be executed early while setting up some kind of virtual environment, you may need to ensure that PATH is non-empty and exported: if PATH is still unset, then something like PATH=$PATH:/some/directory would set PATH to :/some/directory, and the empty component at the beginning means the current directory (like .:/some/directory).

if [ -z "${PATH-}" ]; then export PATH=/usr/local/bin:/usr/bin:/bin; fi
Notes on shells other than bash
In bash, ksh and zsh, export is special syntax, and both PATH=~/opt/bin:$PATH and export PATH=~/opt/bin:$PATH do the right thing even. In other Bourne/POSIX-style shells such as dash (which is /bin/sh on many systems), export is parsed as an ordinary command, which implies two differences:

~ is only parsed at the beginning of a word, except in assignments (see How to add home directory path to be discovered by Unix which command? for details);
$PATH outside double quotes breaks if PATH contains whitespace or \[*?.
So in shells like dash, export PATH=~/opt/bin:$PATH sets PATH to the literal string ~/opt/bin/: followed by the value of PATH up to the first space. PATH=~/opt/bin:$PATH (a bare assignment) doesn't require quotes and does the right thing. If you want to use export in a portable script, you need to write export PATH="$HOME/opt/bin:$PATH", or PATH=~/opt/bin:$PATH; export PATH (or PATH=$HOME/opt/bin:$PATH; export PATH for portability to even the Bourne shell that didn't accept export var=value and didn't do tilde expansion).
