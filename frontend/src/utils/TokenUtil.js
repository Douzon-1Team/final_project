import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCookieToken } from "../auth/Cookie";

export function CheckToken(key) {
    const [isAuth, setIsAuth] = useState('Loaded');
    const token = useSelector((state) => { return state });
    const refreshToken = getCookieToken();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuthToken = async () => {
            console.log("empno : "+token.EMP_INFO.empno);
            if(token.EMP_INFO.empno === false) {
                setIsAuth('Failed');
            }
        };
        checkAuthToken();
    }, [refreshToken, dispatch, key]);
    return { isAuth };
}