import React, {useEffect} from 'react';
import {useAuth} from "./AuthProvider.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Logout = () => {
    const {setToken} = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('token')) {
            const controller = new AbortController();
            axios.get('api/refreshToken/logout', {
                signal: controller.signal
            })
                .then(() => {
                    setToken('');
                    navigate('/', {replace: true});
                })
                .catch((err) => {
                    if (axios.isCancel(err)) {
                        console.log(`request cancelled:${err.message}`);
                    } else {
                        console.log("another error happened:" + err.message);
                    }
                })
            return () => {
                controller.abort();
            }
        } else {
            navigate('/login');
        }
    }, [])

    return <>Logout Page</>
};

export default Logout;