import { createSlice } from '@reduxjs/toolkit';

// 유저 정보 저장 파일 (Redux에 저장)

export const empSlice = createSlice({
    name: 'employee',
    initialState: {
        empno: false,

    },
    reducers: {
        SET_EMP_INFO: (state, action) => {
            state.empno = action.payload;
            // state.role = action.type;
        },
        DELETE_EMP_INFO: (state) => {
            state.empno = null;
        },
    }
})

export const { SET_EMP_INFO, DELETE_EMP_INFO } = empSlice.actions;
export default empSlice.reducer;
