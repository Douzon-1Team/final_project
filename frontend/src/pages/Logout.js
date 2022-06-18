import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCookieToken, removeCookieToken } from '../auth/Cookie';
import { DELETE_TOKEN } from '../store/modules/Reducer/TokenAuth';
import { logoutUser } from '../apis/Users';

function Logout(){
    const token = useSelector((state) => { return state })
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const refreshToken = getCookieToken();

    async function logout() {
        const data = await logoutUser({ refresh_token: refreshToken }, token);

        if (data.status) {
            dispatch(DELETE_TOKEN());
            removeCookieToken();
            return navigate("/login");
        } else {
            return navigate("/login");
        }
    }
    useEffect( () => { logout(); }, [])

    return (
        <>
            <Link to="/" />
        </>
    );
}

export default Logout;