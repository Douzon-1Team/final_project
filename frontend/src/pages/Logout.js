import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCookieToken, removeCookieToken } from '../auth/Cookie';
import { DELETE_TOKEN } from '../auth/Auth';
import { logoutUser } from '../auth/Users';


function Logout(){
    const ACCESS_TOKEN = useSelector((state) => { return state })

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Cookie에 저장된 Refresh Token 정보를 받아 온다
    const refreshToken = getCookieToken();

    async function logout() {
        const data = await logoutUser({ refresh_token: refreshToken }, ACCESS_TOKEN);

        if (data.status) {
            // store에 저장된 Access Token 정보를 삭제
            dispatch(DELETE_TOKEN());
            // Cookie에 저장된 Refresh Token 정보를 삭제
            removeCookieToken();
            return navigate("/");
        } else {
            window.location.reload();
        }
    }

    // 해당 컴포넌트가 요청된 후 한 번만 실행
    useEffect( () => {
        logout();
    }, [])

    return (
        <>
            <Link to="/" />
        </>
    );
}

export default Logout;