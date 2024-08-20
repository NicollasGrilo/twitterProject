import { useEffect, useRef, useState } from "react";
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import classes from './ButtonDelete.module.css';

const ButtonDelete = () => {
    const buttonDots = document.getElementById("dotsClick");
    const buttonTrash = document.getElementById("buttonTrash"); 
    const [isVisible, setIsVisible] = useState(true);
    const [trashVisible, setTrashVisible] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    
    const axiosPrivate = useAxios();

    const errRef = useRef();

    useEffect(() => {
        setErrMsg('');
    }, [])

    function trocarIcone() {
        setTimeout(() => {
            setTrashVisible(!isVisible);
            setIsVisible(isVisible);
        }, 2000);
    }

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.delete(`/tweets/${localStorage.getItem('tweetId')}`,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );
        // console.log(JSON.stringify(response?.data));
        } catch (err) {
            setTrashVisible(!trashVisible);
            if (!err?.response) {
                setErrMsg('No Server Response');
                console.log(err);
            } else if (err.response?.status === 403) {
                setErrMsg('Você não tem autorização para deletar este tweet!');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Operation Failed');
            }
            errRef.current.focus();
        }
        window.location.reload();

    }

    const callback = () => {
        setIsVisible(!isVisible);
        setTrashVisible(isVisible);
        trocarIcone();
    }

    

    return (
        <div className={classes.wrapper}>
            <HiOutlineDotsHorizontal id="dotsClick" className={classes.dots} 
            style={{display: isVisible ? 'block': 'none'}} onClick={callback}/>
            <FaTrash id="buttonTrash" onClick={handleClick} className={classes.btnDelete} 
            style={{display: trashVisible ? 'block': 'none'}} />
        </div>
    );
}

export default ButtonDelete