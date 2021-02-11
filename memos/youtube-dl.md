mpv --ytdl-raw-options="yes-playlist=" https://www.youtube.com/watch?v=DamuE8TM3xo&list=PLGLfVvz_LVvQ9S8YSV0iDsuEU8v11yP9M

The following example downloads top 100 songs on YouTube Music

```
-i, --ignore-errors    Continue on download errors, for example to skip
                       unavailable videos in a playlist
-w, --no-overwrites    Do not overwrite files
-c, --continue         Force resume of partially downloaded files.
                       By default, youtube-dl will resume downloads if possible.

```

youtube-dl -ciw --playlist-items 1-100 --extract-audio --audio-format mp3 --restrict-filenames https://www.youtube.com/playlist?list=PLDcnymzs18LWrKzHmzrGH1JzLBqrHi3xQ

mpv --ytdl-raw-options="yes-playlist=" https://www.youtube.com/watch?v=DamuE8TM3xo&list=PLGLfVvz_LVvQ9S8YSV0iDsuEU8v11yP9M

mpv --shuffule


outube-dl -ciw --extract-audio --audio-format mp3 --restrict-filenames "https://www.youtube.com/playlist?list=PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj"


> cat a | xargs -I {} youtube-dl -ciw --restrict-filenames -f 22 {}


