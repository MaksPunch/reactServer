import React, {useEffect, useState} from 'react'
import { useRoutes, Link, Outlet, useParams } from 'react-router-dom'
import axios from "axios";

export default function UserPage({ users } ) {
    const [user, setUser] = useState({})
    const {userId} = useParams();
    useEffect(() => {
        axios.get('http://localhost:3000/api/user/' + userId)
            .then((res) => {
                setUser(res?.data?.user);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [userId]);
    return <div>
        <h3>id: {user.id}</h3>
        <h3>Логин: {user.username}</h3>
        <h3>Почта: {user.email}</h3>
    </div>;
}