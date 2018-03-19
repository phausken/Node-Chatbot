Thanks again for giving me this challenge, it was a lot of fun to put together.

A quick note -- because I have an older Macbook, I'm using an older version of Node that doesn't support the 'async/await' syntax. That's why I handle all Promises `.then()` -- it's not a stylistic choice!

## Setup

After running

```
$ npm install

```

...you can run

```
$ npm run dev

```
...to start both the client and the API server.

First, I'll go over three things that I would do to the app before putting it into production.

After that, if you're still interested in reading about my design decisions, you can read on, but it's entirely optional.

## Three Additional Things

First and foremost, I would change the message server (the one hosted on Heroku) so that it will allow CORS requests from wherever our app is hosted.

The app's client-side uses Axios to make ajax requests. Most of the time, it's querying our backend, but there should be no reason that it can't make an ajax call to the Heroku server as well. But the browser (correctly) identifies this as a CORS request without a valid header. Our backend _does_ put on a header on all requests (thanks to the helpful function you put in the starter code), so the workaround is to have our Express app make a request to the Heroku server, _then_ route it to the frontend. But now we're making two separate ajax calls. Another possibility is to "cheat" by querying the Heroku server ahead of time, saving the link, and only serving it to the client once they confirm their goal. But because we want to include the goal in the post request to the Heroku server, we have no choice but to wait until the moment the user confirms their goal. A simple CORS header, creating an allowance for the address our app is hosted at, would be an easy fix for production.

Second, I would strongly consider using some sort of cache. The two biggest performance bottlenecks are the two ajax calls we have no choice but to make: posting at /message to receive the content (discussed above), and querying the MySQL database to see if a user exists. One possibility is to query all the users in the database once the App component mounts, then store them in something like Redux. This buys us time before the user enters their name. But this solution only works on a tiny dev app with a handful of users -- for a larger production app, fetching all our users every single time is not realistic. Something like a Redis cache, however, seems much more feasible. This app seems like many users would be returning frequently, if not daily, and so cutting down on SQL queries for returning users would help performance quite a bit.

Third, I would do some serious UX testing to make sure it's as intuitive as possible. The chat app looks like it's part of a bigger app, so it's hard to know the full context. But if it's one thing that I know from experience, it's that just because an app that _seems_ intuitive to a designer that knows its workings inside and out does not mean it'll be intuitive to a visitor. I added some text at the beginning of the session, since it seemed that it was not immediately clear what the user should do to get started. But beyond that, we need data from actual users about whether this app is straight-forward enough. This is just as important (maybe even more so) than any performance optimization. A fast app with clean, elegant code doesn't do us any good if users don't want to use it.

## Design Decisions

### Backend

The server itself is split in to two files: `server.js`, where our Express application actually lives, and `routes.js`, where we have the actual route setup. I like to keep them separate for the sake of cleanliness, then export them to `server.js` and use an IIFE.

I chose **Sequelize** as my ORM. There are lots of ways to organize your backend data, but I like MVC, since it's a format that nearly ever developer is familiar with, and emphasizes cleanliness and separation of concerns. For the routes, I went with RESTful conventions for the sake of clarity. This meant using the CORS package to allow for `put` requests.

 Each file does what you'd expect from its name. `sequelize.js` sets up the ORM and connects to the MySQL database, `userModel.js` maps the various columns in the user table to Sequelize, and `userController.js` acts as the intermediary between requests and the database.

### Frontend

Since the component tree is very simple (App has a Textbox child that renders text based on certain inputs), I decided that using something like Redux to manage state was overkill. This meant that I needed another way to handle state changes. Inspired by [this article](https://css-tricks.com/robust-react-user-interfaces-with-finite-state-machines/), I put together a function called `transition` to handle state. The `uiState` object has all the states listed as keys, with the next state (or an option, if there's multiple states to choose from) as its value. While maybe not strictly declarative, what I like about this format is that it so closely resembles the UX/UI flowcharts familiar to any frontend designer.

It also seemed to me that the choice of what text to render was a separate concern from the rest of the app. With that in mind, I made a separate `TextAreaContainer` to handle everything to do with rendering text.

Finally, in order to account for a variety of different user inputs ("hello" vs. "hi" or "Hi"), I made a `parseInput` function. Capitalization could have also been handled using a controlled React component, but it would have required conditional logic based on the state, and it seemed easier and clearer to do it in a separate function.

If you made it this far, thanks for taking the time to review my code! Let me know if you have any questions or comments, and I hope to hear from you soon!
