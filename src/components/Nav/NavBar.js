import React from 'react'
import NavList from './NavList'
import ls from 'local-storage'

// function createMarkup() {
//   return {__html: 'First &middot; Second'};
// }
//
// function MyComponent() {
//   return <div dangerouslySetInnerHTML={createMarkup()} />;
// }

// const createIcon = (icon) => {
//   return <span dangerouslySetInnerHTML = createIcon(icon)} />
// }

// const NavBar = (props) => {
//
//   console.log("favCount: ", favCount)
//   return (
//     <nav className="nav">
//       <NavList list={[
//
//         { to: '/feed', icon: "fab fa-reddit-alien",
//         text: `/r/analog`},
//         { to: '/favorites', icon: "fas fa-heart", text: `Favorites (${favCount})`},
//       ]}/>
//     </nav>
//   )
// }

class NavBar extends React.Component {

  // componentDidMount() {
  //   return this.favCount()
  // }
  //
  componentDidUpdate(prevProps) {
    console.log("in componentDidUpdate")
    if (prevProps.favCount != this.props.favCount) {
      return this.favCount()
    }
  }

  favCount = () => {
    console.log("in favCount")
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
