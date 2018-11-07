import React from 'react'
import PostItem from './PostItem'

const PostList = (props) => {
  return (
    <div className="post-list">
      {props.posts.map((p) => {
        return <PostItem favoriteList = {props.favoriteList} onFavoritePost = {props.onFavoritePost} post={p} key={p.id} favorited={!!props.favoriteList[p.id]} onToggleFavoriteState={props.onToggleFavoriteState}/>
      })}
    </div>
  )
}

export default PostList
