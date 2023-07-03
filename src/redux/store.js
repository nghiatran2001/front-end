import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import clientSlice from './clientSlice';
import userSlice from './userSlice';

const rootReducer = combineReducers({
   client: clientSlice.reducer,
   user: userSlice.reducer,
});
const persistConfig = {
   key: 'root',
   version: 1,
   storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }),
});
export const persistor = persistStore(store);