import React from 'react'
import NavList from './NavList'

const NavBar = (props) => {
  return (
    <nav className="nav">
      <span className="heading heading--small">Choose a topic:</span>
      <NavList list={[

        { to: '/feed', text: 'Feed'},
        { to: '/favorites', text: 'Favorites'},
      ]}/>
    </nav>
  )
}

export default NavBar
