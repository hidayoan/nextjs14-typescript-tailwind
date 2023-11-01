import { configureStore } from '@reduxjs/toolkit'
import collapseReducer from './slices/collapseSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import darkmodeReducer from './slices/darkmodeSlice';

export const store = configureStore({
  reducer: {
    collapse: collapseReducer,
    darkmode: darkmodeReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;