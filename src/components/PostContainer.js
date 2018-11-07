import React from 'react'
import PostList from './PostList'
import ls from 'local-storage'
import {withRouter} from 'react-router'


class PostContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      feed: [],
      favorites: [],
      favoriteList: {}
    }
  }

  componentDidMount() {
    this.setState({
      favoriteList: ls.get("favoriteList") || {},
      favorites: ls.get("favorites") || []
    }, this.fetchPosts)
  }

  componentDidUpdate(prevProps) {
  if (prevProps.location.pathname !== this.props.location.pathname) {
    this.updateList()
  }
}

updateList() {
  this.setState({
    items: []
  }, () => this.fetchPosts())
}

  fetchPosts = () => {
    this.props.fetchFn()
    .then(json => {

      let feedsState = json.map((item) => {
        let p = item
        p["favorited"] = !!this.state.favoriteList[item.id]
        return p
      })

      this.setState({
        feed: feedsState
      })
    })
  }

  onFavoritePost = (event) => {
    let post_id = event.target.id

    let favoriteListState = Object.assign({}, this.state.favoriteList)
    let favoritesState = this.state.favorites.splice(0) || []
    let feedState = this.state.feed.splice(0) || []

    let selectedPost = feedState.find((p) => p.id == post_id)
    let postIdx = feedState.indexOf(selectedPost)

    selectedPost.favorited = true
    favoritesState.unshift(selectedPost)

    feedState = [...feedState.slice(0, postIdx), selectedPost, ...feedState.slice(postIdx+1)]

    favoriteListState[post_id] = true

    this.setState({
      feed: feedState,
      favorites: favoritesState,
      favoriteList: favoriteListState
    })

    ls.set('favorites', favoritesState)
    ls.set('favoriteList', favoriteListState)

    // find post in posts
    // add to favorites in local state
    // update post.favorited to true
    // update favoriteList in include post
    // componentDidUpdate: if favoriteList gets updated, call fetchFn again
  }

  render() {
    return (
      <div className="post-container">
        <PostList posts = {this.state.feed} onFavoritePost = {this.onFavoritePost} favoriteList = {this.state.favoriteList} />
      </div>
    )
  }
}

export default withRouter(PostContainer)
