//Инициализация стора

import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './slices/postsSlice';

export const store = configureStore({
    reducer: {
        posts: postsSlice,
    },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
