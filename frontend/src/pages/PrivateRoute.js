import { Outlet, Navigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { CheckToken } from "../utils/TokenUtil";

export default function PrivateRoute() {
    const location = useLocation();
    const { isAuth } = CheckToken(location.key);
    console.log("isAuth : " + isAuth); // Loaded -> Failed

    if (isAuth === 'Failed') {
        alert("로그인 후 이용해주십시오.");
        return <Navigate to="/login" state={{from: location}} />
    }
    return <Outlet />
}