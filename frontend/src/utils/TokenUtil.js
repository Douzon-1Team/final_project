import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCookieToken } from "../auth/Cookie";

export function CheckToken(key) {
    const empNo = useSelector( (state) => state.EMP_INFO.empInfo[0] );
    const [isAuth, setIsAuth] = useState('');
    const refreshToken = getCookieToken();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuthToken = async () => {
            empNo === undefined ? setIsAuth('Failed') : setIsAuth('Loaded')
        };
        checkAuthToken();
    }, [refreshToken, dispatch, key]);
    return { isAuth };
}