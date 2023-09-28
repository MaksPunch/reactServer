import React from 'react'
import { useRoutes, Link, Outlet } from 'react-router-dom'

export default function Menu() {
    return (
        <header>
            <div className="logo-con">
                <Link to="/"><img src="../img/ourlogo.png" alt="" className='logo' /></Link>
            </div>
            <div className='navstil'>
                <Link to="users">Пользователи</Link>
                <Link to="about">О нас</Link>
                <Link to="/login">Вход</Link>
                <Link to="/register">Регистрация</Link>
            </div>
        </header>
    )
}