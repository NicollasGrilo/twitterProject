import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./Tweets.module.css";
import { formatDistance } from "date-fns";
import { subDays } from "date-fns";
import ButtonDelete  from "./ButtonDelete";

const Tweets = () => {
    const [tweets, setTweets] = useState([]);
    const axiosPrivate = useAxios();
    
    useEffect(() => {
        axiosPrivate.get('/feed')
            .then(response => {
                setTweets(response.data.feedItens);
                // console.log(response.data.feedItens)
            })
    }, [])

    const jwtToken = localStorage.getItem('accessToken');

    function decode(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }

    localStorage.setItem('scope', (decode(jwtToken).scope));

    return (
        <div className={classes.mainContainer}>
            {tweets.length === 0 ? (
                <p>Carregando tweets...</p>
            ) : tweets?.map((tweet, i) => {
                const handleTweetId = () => {
                    localStorage.setItem('tweetId', tweet.tweetId);
                    localStorage.setItem('userTweet', tweet.username);
                    // console.log(localStorage);
                }
                return (
                    <div key={i} className={classes.tweetContent} onClick={handleTweetId}>
                        <div>
                            <span id="teste" hidden>{tweet.tweetId}</span>
                            <div className={classes.headContent}>
                                <h4> - {tweet.username}</h4>
                                <p className={classes.dateTime}>
                                    {tweet.createAt}
                                </p>
                            </div>
                            <p>{tweet.content}</p>
                        </div>
                        
                        <div>
                            {localStorage.getItem('scope') === 'admin' ? (
                                <ButtonDelete />
                            ) : tweet.username === localStorage.getItem('username') ? (
                                <ButtonDelete />
                            ) : (
                                <span></span>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Tweets