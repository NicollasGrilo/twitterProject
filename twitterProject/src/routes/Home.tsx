import React from 'react';
import PostTweet from '../components/PostTweet';
import Tweets from '../components/Tweets';

const Home = () => {
    return (
        <div>
            <h3 style={{display: 'flex', justifyContent:'center'}}>Olá {localStorage.getItem('username')}!</h3>
            <PostTweet />
            <Tweets />
        </div>
    )
}

export default Home