import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useAuth} from "./AuthProvider.jsx";
import axios from "axios";
import useFetching from "./useFetching.jsx";
import Loader from "./loader.jsx";

const Login = () => {
    const {setToken} = useAuth();
    // const uninterceptedAxiosInstance = axios.create();
    //
    // const handleLogin = (form) => {
    //     let formData = new FormData(form);
    //     let userData = Object.fromEntries(formData.entries());
    //     const response = uninterceptedAxiosInstance.post('http://localhost:3000/api/login', userData, {
    //         withCredentials: true
    //     })
    //         .then((res) => {
    //             setToken(res.data.accessToken);
    //         })
    //         .catch((error) => {
    //             return console.log(error);
    //         });
    // }
    const navigate = useNavigate()
    let newToken = '';

    const [alert, setAlert] = useState('')

    const [fetchRegister, isLoading, error] = useFetching(async (form) => {
        let formData = new FormData(form);
        let userData = Object.fromEntries(formData.entries());
        let uninterceptedAxiosInstance = axios.create();
        const response = await uninterceptedAxiosInstance.post('http://localhost:3000/api/login', userData, {
            withCredentials: true
        })
        setToken(response.data.accessToken);
    })
    const handleLogin = async (event) => {
        event.preventDefault();
        fetchRegister(event.target).then(() => {
            setAlert('Вы успешно вошли в аккаунт');
        });
    }

    useEffect(() => {
        if (error) {
            setAlert('');
        } else if (alert && !error) {
            setTimeout(() => {
                navigate('/');
            }, 1000)
        }
    }, [error, alert])

    return (
        <form className="register" method='post' onSubmit={(event) => {
            return handleLogin(event)
        }}>
            {isLoading ? <Loader/> : (
                <div className="d-flex flex-column gap-3">
                    <h2>Вход</h2>
                    <input className="form-control" type="text" name="username" placeholder='Логин'/>
                    <input className="form-control" type="password" name="password" placeholder='Пароль'/>
                    {error ? <div className="alert alert-danger">{error}</div> : ""}
                    {alert ? <div className="alert alert-success">{alert}</div> : ""}
                    <button className="btn" type="submit">Войти</button>
                </div>
            )}
        </form>
    );
};

export default Login;