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

  componentDidMount() {
    this.setState({
      favoriteList: ls.get("favoriteList") || {},
      favorites: ls.get("favorites") || []
    }, this.fetchPosts);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.fetchPosts();
    }
    if (prevProps.favoriteList != this.props.favoriteList) {
      this.fetchPosts();
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

  updateList() {
    this.setState({
      items: []
    }, () => this.fetchPosts());
  }

  onToggleFavoriteState = event => {
    let post_id = event.target.id;
    let favoriteListState = Object.assign({}, this.state.favoriteList);
    let favoritesState = this.state.favorites.splice(0) || [];
    let feedState = this.state.feed.splice(0) || [];

    if (!favoriteListState[post_id]) {
      let selectedPost = feedState.find(p => p.id == post_id);
      favoritesState.unshift(selectedPost);
      favoriteListState[post_id] = true;
    } else {
      let favIdx = favoritesState.indexOf(
        favoritesState.find(p => p.id == post_id)
      );
      favoritesState = [
        ...favoritesState.slice(0, favIdx),
        ...favoritesState.slice(favIdx + 1)
      ];
      delete favoriteListState[post_id];
    }
    this.setState({
      feed: feedState,
      favorites: favoritesState,
      favoriteList: favoriteListState
    });
    ls.set("favorites", favoritesState);
    ls.set("favoriteList", favoriteListState);
    this.props.updateFavCount();
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
