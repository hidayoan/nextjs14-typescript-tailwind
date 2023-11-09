import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger'
import { persistReducer } from "redux-persist";
import storage from "./customStorage";
import { collapseReducer } from './slices/collapseSlice'
import { darkmodeReducer } from './slices/darkmodeSlice';
import { authReducer } from './slices/authSlice';

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["isAuth", "jid"],
};

const rootReducer = combineReducers({
  collapse: collapseReducer,
  darkmode: darkmodeReducer,

  auth: persistReducer(authPersistConfig, authReducer),
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(logger)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;