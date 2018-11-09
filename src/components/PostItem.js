import React from "react";
import { withRouter } from "react-router";

class PostItem extends React.Component {

  componentDidUpdate(prevProps) {
    if (prevProps.favorited != this.props.favorited) {
      this.dynamicIcon();
    }
  }


  // helper method for rendering the timestamp posted as the difference between current time and time of post
  getTimeStamp = () => {
    let elapsed = new Date().getTime() - new Date(this.props.post.created * 1000).getTime();

    switch(true) {
      case elapsed < 60000:
      return "Just Now";
      case elapsed >= 60000 && elapsed < 3600000:
      return `${parseInt(elapsed / 60000)} minutes ago`;
      case elapsed >= 3600000 && elapsed < 86400000:
      return `${parseInt(elapsed / 3600000)} hours ago`;
      case elapsed >= 86400000:
      return `${parseInt(elapsed / 86400000)} days ago`;
      break
    }

  };

  dynamicIcon = () => {
    return (
      <i
        className={this.selectIcon()}
        id={this.props.post.id}
        onClick={this.props.onToggleFavoriteState}
        />
    );
  };

  // helper function for rendering correct icon
  selectIcon = () => {
    if (!!this.props.favorited) {
      if (this.props.location.pathname.slice(1) == "feed") {
        return "fas fa-heart favorited fav-icon";
      } else {
        return "far fa-trash-alt delete-favorite fav-icon";
      }
    } else {
      return "fas fa-heart nonfavorite fav-icon";
    }
  };


  // handles rendering media for video posts
  videoEmbed = () => {
    return {
      __html: this.decode(this.props.post.secure_media_embed.content)
    };
  };

  // helper method to unpack iframe HTML element to render in jsx
  decode = input => {
    var txt = document.createElement("textarea");
    txt.innerHTML = input;
    return txt.value;
  };


  render() {
    let { post } = this.props;

    return (
      <div className="post-item-wrapper">
        <div className="post-item-content">
          <div className="post-item-image">
            {this.dynamicIcon()}
            {post.post_hint == "image" ? (
              <img className="img-element" src={post.url} alt="Img" />
            ) : (
              <div
                className="img-element"
                dangerouslySetInnerHTML={this.videoEmbed()}
                />
            )}
          </div>

          <div className="post-item-text">
            <div className="post-item-title">{post.title}</div>

            <div className="post-item-metadata">
              <span className="post-item-author">
                <i className="fas fa-user metadata-icon" />
                <span className="post-item-metadata-detail">
                  /u/{post.author}
                </span>
              </span>

              <span className="post-item-time">
                <i className="far fa-clock metadata-icon" />
                <span className="post-item-metadata-detail">
                  {this.getTimeStamp()}
                </span>
              </span>

              <span className="post-item-likes">
                <i className="fas fa-bolt metadata-icon" />
                <span className="post-item-metadata-detail">
                  {post.ups}
                </span>
              </span>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PostItem);
