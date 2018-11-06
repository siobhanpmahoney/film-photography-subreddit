import React from 'react'

class PostItem extends React.Component {
  render() {
    let {post} = this.props

    return (
      <div className="post-item-wrapper">
        <div className="post-item-content">
          <div className="post-item-image">
            <img className="img-element" src={this.props.post.url} alt="Img" />
          </div>

          <div className="post-item-text">
            <div className="post-item-title">
              {this.props.post.title}
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default PostItem
