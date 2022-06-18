import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getList = createAsyncThunk("GET_TODO", async () => {
    const response = await axios.get("http://localhost:8080/main", {
        params: {
            empnos: '220101'
        }
    });
    console.log(response.data);
    console.log('here');
    return response.data;
});

// TODO : 출, 퇴근 판단하고 휴가 데이터를 구분지어 줄 것


export const todoReducer = createSlice({
    name: "todoList",
    initialState: [],
    reducers: {},
    extraReducers: {
        [getList.fulfilled]: (state, { payload }) => [...payload],
    },
});
