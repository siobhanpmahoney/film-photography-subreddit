import React from 'react'
import PostList from './PostList'


class PostContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    this.fetchPosts()
  }

  fetchPosts = () => {
    this.props.fetchFn()
    .then(json => this.setState({
      posts: json
    }))
  }

  render() {
    console.log(this.state.posts)
    return (
      <div className="post-container">
        <PostList posts = {this.state.posts} />
      </div>
    )
  }
}

export default PostContainer
