# /r/analog Feed

This app provides a feed of images posted to the /r/analog Subreddit Feed. Users can browse the top posts and track their favorites, which are persisted to local storage and available upon refreshing or reopening the browser.


## Routes Overview
Routes are defined for the pages displaying the top post feed (`/feed`) and the user's list of favorite posts (`/favorites`). Using react-router's `Redirect`, the user will be redirected to `/feed` if the path entered does not match any of the above defined routes.

The `/feed` and `/favorites` routes are passed 2 props: the number of favorited posts and a string that will be rendered as a page title.

## Data Retrieval and Storage

Posts rendered in `/feed` are sourced from a Reddit API endpoint(`https://www.reddit.com/r/analog/top/.json`), posts listed in `/favorite` are retrieved from local storage.

## Component Architecture  
Both posts fetched from the  are rendered with the same component tree: `PostContainer`, `PostList`, and `PostItem`, all of which are housed in the top level of the `/components` directory.

`PostContainer` holds 3 pieces of state:

1. `feed: []`: an array of posts sourced from Reddit's API
2. `favorites: []`: an array of the user's favorite posts retrieved from local storage
3. `favoriteList: {}`: an object storing favorite posts as keys retrieved from local storage

When either endpoint is accessed via the NavBar links, `favorites` and `favoriteList` state are retrieved on mount, and if the current route is `/feed` (which is accomplished using react-router's `withRouter` higher order component), the posts from Reddit's API are fetched and stored in `feed` state.

Using `withRouter` to key into the component's state, the appropriate group of posts gets passed to the `PostList` as the `posts` prop.

Regardless of the page's route, `PostList` also is passed `favoriteList` as a prop. When mapping over `props.posts` and rendering each item with the `PostItem` component, will pass a `favorited` prop in addition to post data. `PostItem` will use the `favorited` prop to render the appropriate heart icon based on whether the post has been favorited.


The `feed` state is passed to the `PostList` presentational component, which maps over the array, passing each item to the `PostItem` component, which renders the item.


  When a user toggles between the state and country endpoints, the information displayed on the page updates via the `componentDidUpdate()` lifecycle method, which compares the current and previous route location and clears and resets `Container`'s `items` state. The comparison of route locations is accomplished by wrapping the `Container` component in react-router's `withRouter` higher order component, providing the component with access to the route location via the `location` prop.
