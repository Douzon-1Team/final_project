import { createSlice } from '@reduxjs/toolkit';

// access_token 저장 파일 (Redux에 저장)

// access_token 만료 시간 설정
export const TOKEN_TIME_OUT = 600 * 1000;

// Redux 액션 생성자와 전체 슬라이스에 대한 reducer를 선언하여 사용
export const tokenSlice = createSlice({
    name: 'access_token',
    initialState: {
        // 현재 로그인 여부를 확인
        authenticated: false,
        // access_token 저장
        accessToken: null,
        // access_token 만료 시간
        expireTime: null
    },
    reducers: {
        // access_token에 정보 저장
        SET_TOKEN: (state, action) => {
            state.authenticated = true;
            state.accessToken = action.payload;
            state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
        },
        // 값을 모두 초기화하여 access_token에 대한 정보 삭제
        DELETE_TOKEN: (state) => {
            state.authenticated = false;
            state.accessToken = null;
            state.expireTime = null
        },
    }
})

export const { SET_TOKEN, DELETE_TOKEN } = tokenSlice.actions;

export default tokenSlice.reducer;


