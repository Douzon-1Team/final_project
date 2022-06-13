import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from '../../auth/Auth';

export default configureStore({
    reducer: {
        ACCESS_TOKEN: tokenReducer,
    },
});