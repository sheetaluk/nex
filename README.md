# NEX - An Autocomplete Experiment
This is a basic implementation of an autocomplete functionality. This little app allows the user to select a username by click or by keyboard navigation, from a list of autocomplete options.
A username is identified as a word starting with '@'.

## To run it locally
Make sure you have node and npm installed!
If you don't, try:
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

## Things to think about
At the moment a username starts with @, followed by a letter and then one or more occurances of letters and numbers and no punctuation and special characters. How would we want to address cases like: 
* Hello.@user
* Hello(@user)
* "@user"

## Here is a screenshot
![Alt text](https://cloud.githubusercontent.com/assets/502186/12698482/69e45cd6-c76b-11e5-86ae-1019de82e183.png)
