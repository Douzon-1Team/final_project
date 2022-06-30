
// TODO : 삭제 예정 ( /logout 시 back에서 처리 )

import { Cookies } from 'react-cookie';

// refresh_token 저장 파일
const cookies = new Cookies();

// refresh_token을 Cookie에 저장
// export const SET_REFRESH_TOKEN = (refreshToken) => {
export const setRefreshToken = (refreshToken) => {
    const today = new Date();
    const expireDate = today.setDate(today.getDate() + 15); // 유효기간 : 15일 후 만료로 설정

    console.log(cookies)
    return cookies.set('refresh_token', refreshToken,
        {
            sameSite: 'strict',
            path: "/",
            expires: new Date(expireDate),
        }
    );
};

// Cookie에 저장된 refresh_token 값을 가져옴
export const getCookieToken = () => {
    return cookies.get('refresh_token');
};

// 로그아웃 시 Cookie 삭제
export const removeCookieToken = () => {
    return cookies.remove('refresh_token', {
        sameSite: 'strict',
        path: "/"
    });
}
