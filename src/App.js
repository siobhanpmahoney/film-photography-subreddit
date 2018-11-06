import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {fetchFeed} from './posts'
import PostContainer from './components/PostContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <PostContainer fetchFn={fetchFeed} />
      </div>
    );
  }
}

export default App;
