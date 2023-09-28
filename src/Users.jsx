import React, { useReducer } from 'react'
import { useRoutes, Link, Outlet } from 'react-router-dom'
import UserPage from './UserPage';
import reducer from './reducerUsers';

export default function Users({users}) {

    return (
        <div className="user users_page">
            <div className="sidebar">
                <h1>Пользователи</h1>
                <div className="users">
                    {users.length ? (users.map(user => {
                            let userLink = '/users/' + user.id
                            return <Link to={userLink} key={user.id}>{user.name} <br/> {user.username}</Link>
                        }
                    )) : <div>Нет пользователей</div>}  
                </div>
            </div>
            <Outlet/>
        </div>
    )
}