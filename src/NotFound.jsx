import React from 'react'
import { useRoutes, Link, Outlet } from 'react-router-dom'
import UserPage from './UserPage';

export default function NotFound() {
    return (
        <div className="content">
            <div className="notFound">
                <h2>Sorry bro</h2>
                <h1>Ошибка 404</h1>
            </div>
        </div>
    )
}