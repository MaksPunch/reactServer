import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authProvider";

export const ProtectedRoutes =  () => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};
