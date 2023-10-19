import React, {useEffect, useMemo, useReducer, useState} from 'react'
import {useRoutes, Link, Outlet} from 'react-router-dom'
import UserPage from './UserPage';
import reducer from './reducerUsers';
import axios from "axios";
import {useAuth} from "./AuthProvider.jsx";
import useFetching from "./useFetching.js";
import Loader from "./loader.jsx";
import {getTotalPages} from "./pages.js";
import Pagination from "./Pagination.jsx";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const {token} = useAuth();
    const [fetchUsers, isLoading, error] = useFetching(async (limit, page) => {
        const response = await axios.get('/api/users', {
            params: {
                limit,
                page,
            }
        });
        console.log(response.data);
        setUsers(response.data.users);
        setTotalPages(getTotalPages(response.data.total, limit));
    });

    useEffect(() => {
        fetchUsers(limit, page);
    }, [limit, page]);

    const changePage = (newPage) => {
        setPage(newPage);
    }

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
                <Pagination totalPages={totalPages} page={page} changePage={changePage}/>
            </div>
            <Outlet/>
        </div>
    )
}