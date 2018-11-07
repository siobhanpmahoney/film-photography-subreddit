import React from 'react'
import PostItem from './PostItem'

const PostList = (props) => {
  return (
    <div className="post-list">
      {props.posts.map((p) => {
        return <PostItem onFavoritePost = {props.onFavoritePost} post={p} key={p.id} />
      })}
    </div>
  )
}

export default PostList
