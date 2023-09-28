import React from 'react'
import { useRoutes, Link, Outlet } from 'react-router-dom'
import UserPage from './UserPage';
import NotFound from './NotFound';
import Home from './Home';
import Users from './Users';
import About from './About';
import Register from './Register';

export default function Routes({users}) {
    const routes = useRoutes([
        {
            path: "/",
            element: <Home />
        },
        {
            path: "users",
            element: <Users users={users}/>,
            children: [
                {
                    path: ":userId",
                    element: <UserPage users={users} />
                },
            ]
        },
        {
            path: "about",
            element: <About />
        },
        {
            path: "register",
            element: <Register />,
        },
        {
            path: "*",
            element: <NotFound />
        },
    ])
    return routes;
}