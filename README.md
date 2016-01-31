# NEX - An Autocomplete Experiment
This is a basic implementation of an autocomplete widget. This little app allows the user to select a username, by mouse click or by keyboard navigation, from a list of autocomplete options.
A username is identified as a word starting with '@'.

## To run it locally
Make sure you have node and npm installed!
If you don't, try
[nodejs.org](http://nodejs.org)

```
$ git clone https://github.com/sheetaluk/nex
$ cd nex
$ npm start
```
Now, navigate to:
[localhost:8000](http://localhost:8000/app/index.html)

Example:
```
Hello there, @lil
```

## Tested on
* Chrome
* Firefox
* Safari

## For the future
At the moment a username starts with @, followed by a letter and then one or more occurances of letters and numbers and no punctuation and special characters. We should think about how to address cases like: 
** Hello.@user
** Hello(@user)
** "@user"

It might well be the case that we need to expand the autocomplete widget to different datasets with varying patterns of input representing autocomplete candidates. To this end, input specific behavior can be parametrized and injected into the program. That is, datasets can be paired with regex and an instance of the widget can be created on the fly .

The application would benefit from more unit tests and end to end tests.

For better UX, usernames in the UI can be highlighted.

If this were a growing project, more thought needs to be put into directory layout.

## Here is a screenshot
![Alt text](https://cloud.githubusercontent.com/assets/502186/12698482/69e45cd6-c76b-11e5-86ae-1019de82e183.png)
