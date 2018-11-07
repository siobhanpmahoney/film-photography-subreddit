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
    if (prevProps.favoriteList != this.props.favoriteList) {
      this.fetchPosts()
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
      this.setState({
        feed: json
      })
    })
  }

  onToggleFavoriteState = (event) => {
    let post_id = event.target.id

    let favoriteListState = Object.assign({}, this.state.favoriteList)
    let favoritesState = this.state.favorites.splice(0) || []
    let feedState = this.state.feed.splice(0) || []

    let selectedPost = feedState.find((p) => p.id == post_id)
    let postIdx = feedState.indexOf(selectedPost)
    let favIdx = favoritesState.indexOf(favoritesState.find((p) => p.id == post_id))

    if (!favoriteListState[post_id]) {
      favoritesState.unshift(selectedPost)
      favoriteListState[post_id] = true

    } else {

      favoritesState = [...favoritesState.slice(0, favIdx-1),...favoritesState.slice(favIdx + 1)]

      delete favoriteListState[post_id]
      console.log("favoriteListState after deletion: ", favoriteListState)
    }
    this.setState({
      feed: feedState,
      favorites: favoritesState,
      favoriteList: favoriteListState
    })
    ls.set('favorites', favoritesState)
    ls.set('favoriteList', favoriteListState)
  }









  onFavoritePost = (event) => {
    event.preventDefault()
    let post_id = event.target.id
    if (!this.state.favoriteList[post_id]) {

    let favoriteListState = Object.assign({}, this.state.favoriteList)
    let favoritesState = this.state.favorites.splice(0) || []
    let feedState = this.state.feed.splice(0) || []

    let selectedPost = feedState.find((p) => p.id == post_id)
    let postIdx = feedState.indexOf(selectedPost)

    favoritesState.unshift(selectedPost)
    favoriteListState[post_id] = true
    // feedState = [...feedState.slice(0, postIdx), selectedPost, ...feedState.slice(postIdx+1)]
    this.setState({
      feed: feedState,
      favorites: favoritesState,
      favoriteList: favoriteListState
    })
    ls.set('favorites', favoritesState)
    ls.set('favoriteList', favoriteListState)}
  }

  onDeleteFavorite = (event) => {
    let post_id = event.target.id

  }



  render() {
    console.log(this.props.location.pathname.slice(1))
    return (
      <div className="post-container">
        <PostList posts = {this.state[this.props.location.pathname.slice(1)]} onFavoritePost = {this.onFavoritePost} onToggleFavoriteState={this.onToggleFavoriteState} favoriteList = {this.state.favoriteList} />
      </div>
    )
  }
}

export default withRouter(PostContainer)
