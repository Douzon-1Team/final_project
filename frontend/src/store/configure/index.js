
import { configureStore } from '@reduxjs/toolkit';
// import tokenReducer from '../../auth/Auth';
import {calendarReducer} from '../modules/Reducer/Calender';

export default configureStore({
    reducer: {
        // ACCESS_TOKEN: tokenReducer,
        calendarReducer: calendarReducer.reducer
    },
});
