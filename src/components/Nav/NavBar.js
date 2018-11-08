import React from 'react'
import NavList from './NavList'

const NavBar = (props) => {
  return (
    <nav className="nav">
      <NavList list={[

        { to: '/feed', text: 'Feed'},
        { to: '/favorites', text: 'Favorites'},
      ]}/>
    </nav>
  )
}

export default NavBar
