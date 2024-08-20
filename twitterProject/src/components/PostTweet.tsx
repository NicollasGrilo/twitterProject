import React, { useEffect, useRef, useState } from "react";
import { BsArrowRight } from "react-icons/bs";

import classes from "./PostTweet.module.css";
import axios, { axiosPrivate } from "../api/axios";
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const PostTweet = () => {
    const contentData = document.getElementById("content");
    const btnNewTweets = document.getElementById("#btnNewTweets");

    const [isVisible, setIsVisible] = useState(false);
    const [content, setContent] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const axiosPrivate = useAxios();
    const navigate = useNavigate();

    const contentRef = useRef();
    const errRef = useRef();

    useEffect(() => {
        contentRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [ content ])

    const handleClick = async (e) => {
        e.preventDefault();

        if (!contentData.value) {
            alert('Adicione algo para publicar')
            return false;
        } else {
            try {
                const response = await axiosPrivate.post('/tweets',
                    JSON.stringify({ content }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
                // console.log(JSON.stringify(response?.data));
                setContent('');
                setIsVisible(!isVisible)
            } catch (err) {
                if (!err?.response) {
                    setErrMsg('No Server Response');
                    // console.log(err);
                } else if (err.response?.status === 400) {
                    setErrMsg('Missing Username or Password');
                } else if (err.response?.status === 401) {
                    setErrMsg('Unauthorized');
                } else {
                    setErrMsg('Login Failed');
                }
                errRef.current.focus();
            }
        }
    }

    const clickNewTweets = () => {
        setIsVisible(false)
        window.location.reload()
    }

    return (
        
        <div className={classes.post}>
            <div className={classes.postContainer} >
                <input type="text" id="content" ref={contentRef} autoComplete="off"
                onChange={(e) => setContent(e.target.value)} value={content}
                placeholder="O que você está pensando?" />
                <button id="btn" onClick={handleClick}>
                    <BsArrowRight />
                </button>
            </div>
            <div>
                <button style={{display: isVisible ? 'block': 'none'}}
                id="btnNewTweets" className={classes.btnNewTweets}
                onClick={clickNewTweets}
                >Mostrar novos tweets</button>
            </div>
        </div>
    )
}

export default PostTweet