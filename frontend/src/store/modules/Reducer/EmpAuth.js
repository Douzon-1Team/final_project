import { createSlice } from '@reduxjs/toolkit';

export const empSlice = createSlice({
    name: 'emp',
    initialState: {
        empInfo: false,
    },
    reducers: {
        SET_EMP_INFO: (state, action) => {
            state.empInfo = [action.payload.empno, action.payload.name, action.payload.role, action.payload.profile];
        },
        DELETE_EMP_INFO: (state) => {
            state.empInfo = false;
        },
    }
})

export const { SET_EMP_INFO, SET_EMP_PROFILE, DELETE_EMP_INFO } = empSlice.actions;
export default empSlice.reducer;
