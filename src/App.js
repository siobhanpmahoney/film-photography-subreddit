import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router'
import './App.css';
import {fetchFeed, fetchFavorites} from './posts'
import PostContainer from './components/PostContainer'
import NavBar from './components/Nav/NavBar'
import ls from 'local-storage'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      favCount: 0
    }
  }

  componentDidMount() {
    this.updateFavCount()
  }

  // componentDidUpdate(prevState) {
  //   if (prevState.favCount != this.state.favCount) {
  //     return this.state.favCount
  //   }
  // }

  updateFavCount = () => {
    this.setState({
      favCount: ls.get('favorites').length
    })
  }


  render() {
    return (
      <div className="App">
        <NavBar favCount={this.state.favCount}/>

        <Switch>


        <Route exact path='/feed' render={() => {
          return <PostContainer fetchFn={fetchFeed} updateFavCount={this.updateFavCount}/> }}
        />

        <Route exact path='/favorites' render={() => {
          return <PostContainer fetchFn={fetchFavorites} updateFavCount={this.updateFavCount}/> }}
        />

        <Redirect to='/feed' />

        </Switch>


      </div>
    );
  }
}

export default App;
