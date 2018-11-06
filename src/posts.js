import React from 'react'

export const fetchFeed = () => {
  return new Promise((resolve, reject) => {
    fetch("https://www.reddit.com/r/analog/top/.json")
    .then(response => response.json())
    .then(json => resolve(json.data.children.map((post) => post.data)))
  })

}
