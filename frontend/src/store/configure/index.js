import {combineReducers, configureStore} from '@reduxjs/toolkit';
import empReducer from '../modules/Reducer/EmpAuth';
import tokenReducer from '../modules/Reducer/TokenAuth';
import storage from 'redux-persist/lib/storage';
import {calendarReducer} from '../modules/Reducer/Calender';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    EMP_INFO: empReducer,
    ACCESS_TOKEN: tokenReducer,
    calendarReducer: calendarReducer.reducer

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export default store;

// import { configureStore } from '@reduxjs/toolkit';
// import {calendarReducer} from '../modules/Reducer/Calender';
//
// export default configureStore({
//     reducer: {
//         calendarReducer: calendarReducer.reducer
//     },
// });
