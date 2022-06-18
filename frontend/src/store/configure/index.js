
import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from '../../auth/Auth';
import {todoReducer} from '../Calender';

export default configureStore({
    reducer: {
        ACCESS_TOKEN: tokenReducer,
        todoReducer: todoReducer.reducer
    },
});
