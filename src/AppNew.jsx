import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './Routes.jsx'
import Menu from './Menu';
import {Context} from './context'
import axios from 'axios';

import AuthProvider, { useAuth } from "./AuthProvider.jsx";

export default function AppNew() {

    // const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')))
    //
    // if (!users) {
    //     setUsers([
    //         {
    //             id: 1,
    //             name: "Даниил Лебедев",
    //             username: "LoeSSssSSSSSS",
    //             phone: "+799999999",
    //             email: "loes@mail.ru",
    //             password: "123456"
    //         },
    //         {
    //             id: 2,
    //             name: "Ашапатов Николай",
    //             username: "AqulaR",
    //             phone: "+799999999",
    //             email: "aqualar@mail.ru",
    //             password: "123456"
    //         },
    //         {
    //             id: 3,
    //             name: "Тарасов Максим",
    //             username: "MaksPunch",
    //             phone: "+799999999",
    //             email: "makspunch@mail.ru",
    //             password: "123456"
    //         }
    //     ])
    // }
    //
    // useEffect(() => {
    //     return localStorage.setItem('users', JSON.stringify(users))
    // }, [users]);
    //
    // const createUser = (userData) => {
    //     userData = Object.fromEntries(userData.entries());
    //     userData['id'] = Date.now();
    //     setUsers([
    //         ...users,
    //         userData
    //     ])
    // }
    return (
        <Router>
            <AuthProvider>
                <Menu/>
                <Routes/>
            </AuthProvider>
        </Router>
    );
}