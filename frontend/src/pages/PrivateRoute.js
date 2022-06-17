import { Outlet, Navigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import {CheckToken} from "../utils/TokenUtil";

export default function PrivateRoute() {
    const location = useLocation();
    const { isAuth } = CheckToken(location.key);

    console.log("///////////////////")
    console.log("isAuth : "+isAuth); // Loaded -> Failed

    if (isAuth === 'Failed') {
        return (
            <Navigate to="/" state={{from: location}}/>
        )
    }
    return <Outlet />
}
