import React from 'react'
import PostContainer from './PostContainer';
import { Redirect } from 'react-router';


const Home = (props) => {
  return (
    <Redirect to='/feed' />
  )
}

export default Home
