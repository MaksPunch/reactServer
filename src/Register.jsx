import React, {useState} from 'react'
import {useContext} from 'react'
import {Form, useNavigate} from 'react-router-dom';
import axios, {Axios} from 'axios';
import {Context} from './context';
import useFetching from "./useFetching.jsx";
import Loader from "./loader.jsx";
import login from "./Login.jsx";

export default function Register() {
    const navigate = useNavigate()

    const [alert, setAlert] = useState('')

    const [fetchRegister, isLoading, error] = useFetching(async (form) => {
        let formData = new FormData(form);
        let userData = Object.fromEntries(formData.entries());
        let uninterceptedAxiosInstance = axios.create();
        await uninterceptedAxiosInstance.post('http://localhost:3000/api/signUp', userData, {
            withCredentials: true
        })
    })
    const signup = async (event) => {
        event.preventDefault();
        fetchRegister(event.target);
        if (!error) {
            setAlert('Вы успешно зарегистрировались');
            setTimeout(() => {
                navigate('/login');
            }, 1000)
        }
    }
    return (
        <form className="register" method='post' onSubmit={(event) => {
            return signup(event)
        }}>
            <h2>Регистрация</h2>
            {isLoading ? <Loader/> : (
                <div className="d-flex flex-column gap-3">
                    <input className="form-control" type="text" name="username" placeholder='Логин'/>
                    <input className="form-control" type="text" name="email" placeholder='email'/>
                    <input className="form-control" type="password" name="password" placeholder='Пароль'/>
                    {error ? <div className="alert alert-danger">{error}</div> : ""}
                    {alert ? <div className="alert alert-success">{alert}</div> : ""}
                    <button className="btn" type="submit">Зарегистрироваться</button>
                </div>
                )
            }
        </form>
    )
}