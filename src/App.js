import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router'
import ls from 'local-storage'
import './App.css';
import Home from './components/Home'

import PostContainer from './components/PostContainer'
import NavBar from './components/Nav/NavBar'


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

  updateFavCount = () => {
    let count
    if (!!ls.get('favorites')) {
       count = ls.get('favorites').length
    } else {
       count = 0
    }
    this.setState({
      favCount: count
    })
  }


  render() {
    return (
      <div className="App">
        <NavBar favCount={this.state.favCount}/>

        <Switch>

          <Route exact path='/' render={(routerProps) => {
            return <Home history={routerProps.history} /> }}
          />

        <Route exact path='/feed' render={(routerProps) => {
          return <PostContainer history={routerProps.history} updateFavCount={this.updateFavCount}/> }}
        />

        <Route exact path='/favorites' render={() => {
          return <PostContainer updateFavCount={this.updateFavCount}/> }}
        />

        <Redirect to='/feed' />

        </Switch>


      </div>
    );
  }
}

export default App;
