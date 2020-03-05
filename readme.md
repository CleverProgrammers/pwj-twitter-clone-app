# General TODOS

## TODO(Together): Create the home page structure for index.html

That involves the navigation, tweets list, and trending hashtags section.

## TODO: Create HTML and Style for Navigation

### TODO(Together) Add fontawesome

Use Mockup for styles like border

It needs to follow a class structure like this:

    class navigation

        class logo

            <i class="fab fa-twitter"></i>

        class home-link

            <i class="fas fa-home"></i>

        class profile-container

            class profile 

## TODO: Create HTML and Style for Input Box

## TODO: Create HTML and Style for Individual Tweet

## TODO: Create HTML and Style for Trending Box

## TODO(API): Set up NodeJS Server

## TODO(API, TOGETHER): Create API endpoint `/tweeets` to return a list of tweets based on query

Use [axios](https://github.com/axios/axios) for making an API request to Twitter API

Console log the data

Return as a response

## TODO(API): Create Twitter `get()` helper function to move the Twitter API logic

## TODO(API, TOGETHER): Move the API Token to .env file and import it

## TODO: Complete `getTwitterData()` function to retrieve data from our API

For now, I want you to use the following static url to get data from api:

```http://localhost:3000/tweets?q=coding&count=10&result_type=popular&tweet_mode=extended```

## TODO: Get search input and use it to build a `url` like the one above

This time you are building a dynamic url that will change based on the user's serch input


## TODO: Complete `buildTweets()` function to show the Tweets List(only text)

## TODO: Add abiliy to show images in the tweets

## TODO: Add ability to show videos in the tweets

## TODO: Add ability yo show gifs in the tweets

## TODO: Use [moment.js](https://momentjs.com/) to show the date of tweet

## TODO: Complete `selectTrend()` function to allow a user to click on the trend and search for it

## TODO: Create HTML and Style for Next Page Button

## TODO: Save Next Page Data

## TODO: Show the next page of tweets upon clikcing next page

[Here](https://developer.twitter.com/en/docs/tweets/timelines/guides/working-with-timelines) is how twitter pagination works

#### TODO(API): ...something that has to do with `max_id`

## TODO: Fix logic to replace tweets when searching, but append tweets when going to next page

## WE ARE DONE!
















