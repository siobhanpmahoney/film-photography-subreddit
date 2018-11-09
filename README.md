# /r/analog Feed

This app provides a feed of images posted to the /r/analog Subreddit Feed. Users can browse the top posts and track their favorites, which are persisted to local storage and available upon refreshing or reopening the browser.


## Routes Overview
Routes are defined for the pages displaying the top post feed (`/feed`) and the user's list of favorite posts (`/favorites`). Using react-router's `Redirect`, the user will be redirected to `/feed` if the path entered does not match any of the above defined routes.

The `/feed` and `/favorites` routes are passed 2 props: the a function defined `/component/posts` that fetches the respective group of posts (`fetchFn()`), and a string that will be rendered as a page title.

## Data Retrieval and Storage

Posts rendered in `/feed` are sourced from a Reddit API endpoint(`https://www.reddit.com/r/analog/top/.json`), posts listed in `/favorite` are retrieved from local storage.

## Component Architecture and Flow Overview
Both posts fetched from the  are rendered with the same component tree: `PostContainer`, `PostList`, and `PostItem`, all of which are housed in the top level of the `/components` directory.

### PostContainer `state`

`PostContainer` holds 3 pieces of state:
1. `feed: []`: an array of posts sourced from Reddit's API
2. `favorites: []`: an array of the user's favorite posts retrieved from local storage
3. `favoriteList: {}`: an object storing favorite posts as keys retrieved from local storage
