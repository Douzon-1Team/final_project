import { createSlice } from '@reduxjs/toolkit';

export const empSlice = createSlice({
    name: 'employee',
    initialState: {
        empInfo: false,

    },
    reducers: {
        SET_EMP_INFO: (state, action) => {
            state.empInfo = action.payload;
        },
        DELETE_EMP_INFO: (state) => {
            state.empInfo = null;
        },
    }
})

export const { SET_EMP_INFO, DELETE_EMP_INFO } = empSlice.actions;
export default empSlice.reducer;
