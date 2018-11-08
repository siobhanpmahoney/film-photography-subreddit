import React from 'react'
import {withRouter} from 'react-router'

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

    return <i class={this.selectIcon()} id={this.props.post.id}  onClick={this.props.onToggleFavoriteState} />
    // if (!!this.props.favorited) {
    //   if (this.props.location.pathname.slice(1) == "feed") {
    //     return <i class= ></i>
    //     } else {
    //       return <i class=></i>
    //     }
    // } else {
    //   return <i class="" id={this.props.post.id} onClick={this.props.onToggleFavoriteState}></i>
    // }
  }

  selectIcon = () => {
    if (!!this.props.favorited) {
      if (this.props.location.pathname.slice(1) == "feed") {
        return "fas fa-heart favorited icon"
      } else {
        return "far fa-trash-alt icon"
      }
    } else {
      return "fas fa-heart nonfavorite icon"
    }
  }






  componentDidUpdate(prevProps) {
    if (prevProps.favorited != this.props.favorited) {
      this.dynamicIcon()
    }
  }

   decode = (input) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = input;
    return txt.value;
  }

  videoEmbed = () => {
    console.log("regular: ", this.props.post.secure_media_embed.content)
    console.log("passed through decode function", this.decode(this.props.post.secure_media_embed.content))
      return {
        __html: this.decode(this.props.post.secure_media_embed.content)
      }

  }


  render() {
    let {post} = this.props



    return (
      <div className="post-item-wrapper">

        <div className="post-item-content">
          <div className="post-item-image">
            {this.dynamicIcon()}
            {post.post_hint == "image" ? (
              <img className="img-element" src={this.props.post.url} alt="Img" />
            ) : (
              <div className="img-element" dangerouslySetInnerHTML={this.videoEmbed()} />
            )
          }




        </div>

        <div className="post-item-text">
          <div className="post-item-title">
            {this.props.post.title}
          </div>

          <div className="post-item-metadata">
            <span className="post-item-author">
              <i className="fas fa-user metadata-icon"></i>
              <span className="post-item-metadata-detail">
                /u/{post.author}
              </span>
            </span>

            <span className="post-item-time">
              <i class="far fa-clock metadata-icon"></i>
              <span className="post-item-metadata-detail">
                {this.getPostDate()}
              </span>
            </span>

            <span className="post-item-likes">
              <i class="fas fa-bolt metadata-icon"></i>
              <span className="post-item-metadata-detail">
                {post.ups}
              </span>
            </span>

          </div>
        </div>
      </div>

    </div>
  )
}
}

export default withRouter(PostItem)
