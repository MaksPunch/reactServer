import React from 'react'
import { useRoutes, Link, Outlet, useParams } from 'react-router-dom'

export default function UserPage({ users } ) {
    let { userId } = useParams();
    let userData = users.find(el => el.id === Number(userId)) || userId
    return <div>
        <h3>id: {userId}</h3>
        <h3>Имя Фамилия: {userData.name}</h3>
        <h3>Логин: {userData.username}</h3>
        <h3>Телефон: {userData.phone}</h3>
        <h3>Почта: {userData.email}</h3>
    </div>;
}