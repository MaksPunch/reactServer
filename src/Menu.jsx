import React from 'react'
import { useRoutes, Link, Outlet } from 'react-router-dom'
import {useAuth} from "./AuthProvider.jsx";
import axios from "axios";

export default function Menu() {
    const {token} = useAuth();
    return (
        <header>
            <div className="logo-con">
                <Link to="/"><img src="../img/ourlogo.png" alt="" className='logo' /></Link>
            </div>
            <div className='navstil'>
                {token ?
                    <Link to="users">Пользователи</Link> : []
                }
                <Link to="about">О нас</Link>
                {!token ? (
                    <>
                        <Link to="/login">Вход</Link>
                        <Link to="/register">Регистрация</Link>
                    </>

                ) : (<Link to="/logout">Выход</Link>)
                }

            </div>
        </header>
    )
}