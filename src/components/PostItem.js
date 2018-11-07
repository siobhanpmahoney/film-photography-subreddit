import React from 'react'

class PostItem extends React.Component {

  getPostDate = () => {
    let elapsed = (new Date().getTime()) - ((new Date(this.props.post.created * 1000)).getTime())

    if (elapsed < 60000) {
      return "Just Now"
    } else if (elapsed >= 60000 && elapsed < 3600000) {
      return `${parseInt(elapsed/60000)} minutes ago`
    } else if (elapsed >= 3600000 && elapsed < 86400000) {
      return `${parseInt(elapsed/3600000)} hours ago`
    } else if (elapsed >= 86400000) {
      return `${parseInt(elapsed/86400000)} days ago`
    }
  }

  dynamicIcon = () => {
    if (!!this.props.favorited) {
      return <i class="fas fa-heart favorited" id={this.props.post.id} onClick={this.props.onToggleFavoriteState}></i>
    } else {
      return <i class="fas fa-heart nonfavorite" id={this.props.post.id} onClick={this.props.onToggleFavoriteState}></i>
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.favorited != this.props.favorited) {
      this.dynamicIcon()
    }
  }

  render() {
    let {post} = this.props


    return (
      <div className="post-item-wrapper">

        <div className="post-item-content">
          <div className="post-item-image">
            {this.dynamicIcon()}
            <img className="img-element" src={this.props.post.url} alt="Img" />
          </div>

          <div className="post-item-text">
            <div className="post-item-title">
              {this.props.post.title}
            </div>

            <div className="post-item-metadata">
              <span className="post-item-author">
                {post.author} |
              </span>
              <span className="post-item-time">
                {this.getPostDate()}
              </span>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default PostItem
