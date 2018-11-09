import React from "react";
import PostList from "./PostList";
import { fetchFeed } from "../fetchFeed";
import ls from "local-storage";
import { withRouter } from "react-router";

class PostContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feed: [],
      favorites: [],
      favoriteList: {}
    };
  }

// on mount, the the user's favorite posts are saved to state as an array of post data and an object containing favorited post ids as keys
  componentDidMount() {
    this.setState({
      favoriteList: ls.get("favoriteList") || {},
      favorites: ls.get("favorites") || []
    }, this.fetchPosts);
  }


  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.fetchPosts(); // checks if posts should be fetched from Reddit's API on route change
    }
    if (prevProps.favoriteList != this.props.favoriteList) {
      this.fetchPosts(); // checks for changes to favoriteList state
    }
  }

  fetchPosts = () => {
    if (this.props.location.pathname == "/feed") {
      fetchFeed().then(json => {
        this.setState({
          feed: json
        });
      });
    }
  };


// function that handles the addition or deletion of post from favorite list
  onToggleFavoriteState = event => {
    let post_id = event.target.id;
    let favoriteListState = Object.assign({}, this.state.favoriteList);
    let favoritesState = this.state.favorites.splice(0) || [];
    let feedState = this.state.feed.splice(0) || [];


// checks to see if post has been been added as a favorite by keying into state.favoriteList using post_id
    if (!favoriteListState[post_id]) {
      let selectedPost = feedState.find(p => p.id == post_id);
      favoritesState.unshift(selectedPost); // post data gets added to copy of state.favorites
      favoriteListState[post_id] = true; // post_id gets added as key to copy of state.favoriteList

    } else { // if post needs to get deleted from favorite list, it is removed from copy of state.favorites array and the corresponding key/value pair is deleted from the copy of state.favoriteList object
      let favIdx = favoritesState.indexOf(favoritesState.find(p => p.id == post_id));
      favoritesState = [...favoritesState.slice(0, favIdx), ...favoritesState.slice(favIdx + 1)];
      delete favoriteListState[post_id];
    }
    // state and local storage get updated with updated favorites and favoriteList
    this.setState({
      feed: feedState,
      favorites: favoritesState,
      favoriteList: favoriteListState
    });
    ls.set("favorites", favoritesState);
    ls.set("favoriteList", favoriteListState);
    this.props.updateFavCount(); // function called to update favorite count in NavBar 
  };

  render() {
    return (
      <div className="post-container">
        <PostList
          posts={this.state[this.props.location.pathname.slice(1)]}
          onToggleFavoriteState={this.onToggleFavoriteState}
          favoriteList={this.state.favoriteList}
          />
      </div>
    );
  }
}

export default withRouter(PostContainer);
