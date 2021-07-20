- [](https://elisabethirgens.github.io/notes/2019/12/ulimit-and-limit/)

The annoyance I want to improve
The project I’m working on uses OpenShift, and apparently I need to ramp up the system-wide resources for Minishift to run happily. Specifically: increase the number of open files per process. I’ve set a thing in my .bashrc and run some commands and it’s all working fine. But after every restart, I get an error in a new shell and need to repeat the process. This is in my .bashrc file:

ulimit -n 500000
But after a reboot, the terminal will complain that:

-bash: ulimit: open files: cannot modify limit: Invalid argument
When I check, I can see that the number has returned to 256:

launchctl limit maxfiles
maxfiles 256 unlimited
Then I can run this command to increase it:

sudo launchctl limit maxfiles 5000000 5000000
And check that it increased:

launchctl limit maxfiles
maxfiles 5000000 5000000
