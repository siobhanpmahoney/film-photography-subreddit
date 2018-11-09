
// request made to Reddit to fetch relevant data for posts

export const fetchFeed = () => {
  return new Promise((resolve, reject) => {
    fetch("https://www.reddit.com/r/analog/top/.json")
    .then(response => response.json())
     .then(json => resolve(json.data.children.map((post) => {
      return {post_hint: post.data.post_hint, url: post.data.url, title: post.data.title, author: post.data.author, ups: post.data.ups, created: post.data.created, id: post.data.id, secure_media_embed: post.data.secure_media_embed}
    })))
  })

}
