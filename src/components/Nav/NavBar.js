import React from 'react'
import NavList from './NavList'

class NavBar extends React.Component {

  componentDidUpdate(prevProps) {
    if (prevProps.favCount != this.props.favCount) {
      return this.favCount()
    }
  }

  favCount = () => {
    return this.props.favCount
  }

  render() {
    return (
      <nav className="nav">
        <NavList list={[
            { to: '/feed', icon: "fab fa-reddit-alien",
              text: `/r/analog`},
              { to: '/favorites', icon: "fas fa-heart", text: `Favorites (${this.favCount()})`},
            ]}/>
          </nav>
        )
      }
    }

    export default NavBar
