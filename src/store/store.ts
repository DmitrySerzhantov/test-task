import {configureStore} from '@reduxjs/toolkit';
import elementsReducer from './elementsSlice';
import {useDispatch} from 'react-redux';

export const store = configureStore({
  reducer: {
    elements: elementsReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
