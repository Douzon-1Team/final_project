import { createSlice } from "@reduxjs/toolkit";
import {getList} from '../../CalenderThunk';

export const calendarReducer = createSlice({
    name: "calendarList",
    initialState: [],
    reducers: {},
    extraReducers: {
        [getList.fulfilled]: (state, { payload }) => [...payload],
    },
});
