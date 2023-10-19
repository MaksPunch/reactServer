import axios from "axios";
import {createContext, useContext, useEffect, useMemo, useState} from "react";
import jwtDecode from "jwt-decode";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [token, setToken_] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = 'http://localhost:3000';

    const setToken = (newToken) => {
        setToken_(newToken);
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = token
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('token')
        }

    }, [token]);

    axios.interceptors.request.use((config) => {
        config.headers.authorization = localStorage.getItem('token');
        return config;
    })

    axios.interceptors.response.use((config) => {
            return config;
        },
        async (error) => {
            const originalRequest = {...error.config}
            originalRequest._isRetry = true;
            if (
                error?.response?.status === 401 &&
                error.config &&
                !error.config._isRetry
            ) {
                try {
                    const response = await axios.get('api/refreshToken');
                    localStorage.setItem('token', response.data.accessToken);
                    return axios.request(originalRequest);
                } catch (error) {
                    localStorage.removeItem('token')
                    navigate('/login');
                    console.log("auth error")
                }
            }
            throw error;
        })

    const contextValue = useMemo(
        () => ({
            token,
            setToken,
        }),
        [token]
    );

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
