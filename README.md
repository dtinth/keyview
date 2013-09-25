keyview — Live Keystroke Display for Presentation
=================================================

At [BarCamp Bangkhen 4](http://2013.barcampbangkhen.org/),
I ran a session about advanced Vim techniques and plugins (such as
EasyMotion, Arpeggio, and so on...), so I needed a way to display live
keystroke so the audience can see exactly what I typed.

Here is [the video of the recorded session](https://www.youtube.com/watch?v=m8fScqG_pPk)
by [@icez](https://twitter.com/icez). You can notice the "key sequence" that
shows at the top of the screen. That's __keyview__.

-----

You'll notice that when I want to show the keystrokes, the key sequence
displays at the top. Otherwise, it will display the URL of the
[supplementary document](http://bit.ly/bcbk4vim).

So how can I tell __keyview__ when I want or don't want it to display live
key stroke when both of my hands are typing Vim commands?
[__iPedal__](https://github.com/dtinth/iPedal).

When I put my foot on my iPad, __keyview__ displays live keystrokes,
when I lift it up, then __keyview__ goes back and display the predefined message.



Prerequisites
-------------

* [tmux](http://tmux.sourceforge.net/) (basic tmux knowledge required, such
    as how to run tmux commands, how to split, move, and resize panes)
* [Node.js](http://nodejs.org/)
* An iPad, iPhone, Android or whatever that has a touch screen and that
    you can put your foot on it. (I recommend wrapping them in a plastic bag.)


How to Use
----------

First, clone the repository, and then run `npm install`.

Then, in this directory, fire up the iPedal server:

    ./node_modules/.bin/iPedalServer

Then, open tmux and enter this tmux command:

    :set synchronize-panes

So that when you have multiple panes, the keystrokes will be sent to
both panes.

    :splitw 'KEYVIEW_MESSAGE="hello world" node /path/to/keyview/keyview.js'

It should now display "hello world" on the split pane.
When you put your foot on the iPedal,
it should change to say "key sequence", and when you press the keys,
they should be displayed.

















