import React, {useEffect, useReducer, useState} from 'react'
import {useRoutes, Link, Outlet} from 'react-router-dom'
import UserPage from './UserPage';
import reducer from './reducerUsers';
import axios from "axios";
import {useAuth} from "./AuthProvider.jsx";
import useFetching from "./useFetching.jsx";
import Loader from "./loader.jsx";

export default function Users() {
    const [users, setUsers] = useState([])
    const {token} = useAuth();
    const [fetchUsers, isLoading, error] = useFetching(async () => {
        const response = await axios.get('/api/users');
        setUsers(response.data.users);
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="user users_page">
            <div className="sidebar">
                <h1>Пользователи</h1>
                <div className="users">
                    {users.length ? (users.map(user => {
                            let userLink = '/users/' + user.id
                            return <Link to={userLink} key={user.id}>{user.name} <br/> {user.username}</Link>
                        }
                    )) : isLoading ? <Loader /> : <div>Нет пользователей <br/>${error}</div>}
                </div>
            </div>
            <Outlet/>
        </div>
    )
}