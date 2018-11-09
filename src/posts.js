import React from 'react'
// import ls from 'local-storage'


export const fetchFeed = () => {
  return new Promise((resolve, reject) => {
    fetch("https://www.reddit.com/r/analog/top/.json")
    .then(response => response.json())
    .then(json => resolve(json.data.children.map((post) => post.data)))
  })

}
//
// export const fetchFavorites = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(ls.get("favorites"))
//     }, 200)
//   })
// }
