import { Outlet, Navigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { CheckToken } from "../utils/TokenUtil";
import { PrivateAlert } from "../components/common/alert/alert";

export default function PrivateRoute() {
    const location = useLocation();
    const { isAuth } = CheckToken(location.key);

    if (isAuth === 'Failed') {
        PrivateAlert();
        return <Navigate to="/" state={{from: location}} />
    }
    return <Outlet />
}
