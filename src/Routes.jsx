import React from 'react'
import { useRoutes, Link, Outlet } from 'react-router-dom'
import UserPage from './UserPage';
import NotFound from './NotFound';
import Home from './Home';
import Users from './Users';
import About from './About';
import Register from './Register';
import {ProtectedRoutes} from "./ProtectedRoutes.jsx";
import {useAuth} from "./AuthProvider.jsx";
import Login from "./Login.jsx";
import Logout from "./Logout.jsx";

export default function Routes() {
    const { token } = useAuth();
    const routesForAuthenticatedUsers = [
        {
            path: "users",
            element: <ProtectedRoutes/>,
            children: [
                {
                    path: '',
                    element: <Users/>,
                },
                {
                    path: ":userId",
                    element: <UserPage />
                },
            ]
        },
        {
            path: "logout",
            element: <Logout/>
        }
    ];

    const routes = useRoutes([
        {
            path: "/",
            element: <Home />
        },
        {
            path: 'login',
            element: <Login />
        },
        ...routesForAuthenticatedUsers,
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