import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import classes from "./LoginComponent.module.css";


const LOGIN_URL = '/login';

const LoginComponent = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "home";

    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // console.log(JSON.stringify(response?.data));

            setUsername('');
            setPassword('');
            localStorage.setItem('accessToken', response?.data?.accessToken);
            localStorage.setItem('username', username);
            // console.log(localStorage);
            navigate(from, { replace: true });
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

    const signUp = () => {
        navigate("/createUser")
    }

    return (
        <div className={classes.mainContainer}>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" id="username" ref={userRef} autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)} value={username} required placeholder="Username"/>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} 
                value={password} required placeholder="Password" />
                <button type="submit">Next</button>
                <p className={classes.createUser}>Don't have an account? <span className={classes.signUp} onClick={signUp}>Sign Up</span></p>
            </form>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        </div>
    )
}

export default LoginComponent