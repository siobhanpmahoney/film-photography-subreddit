import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router'
import './App.css';
import {fetchFeed, fetchFavorites} from './posts'
import PostContainer from './components/PostContainer'
import NavBar from './components/Nav/NavBar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />

        <Switch>


        <Route exact path='/feed' render={() => {
          return <PostContainer fetchFn={fetchFeed} /> }}
        />

        <Route exact path='/favorites' render={() => {
          return <PostContainer fetchFn={fetchFavorites} /> }}
        />

        <Redirect to='/feed' />

        </Switch>


      </div>
    );
  }
}

export default App;
