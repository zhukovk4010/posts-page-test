//Слайс постов

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

//Типы

type PostType = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

type InitialStateType = {
    posts: PostType[];
    loading: boolean;
    error: string | null;
};

const initialState: InitialStateType = {
    posts: [],
    loading: false,
    error: null,
};

//Fetch функция для постов

export const fetchPosts = createAsyncThunk<PostType[], string | undefined>(
    'posts/fetchPosts',
    async (title) => {
        const responce = await fetch(
            `https://jsonplaceholder.typicode.com/posts?${title}`
        );
        if (!responce.ok) {
            return;
        }
        const data = await responce.json();

        return data;
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.loading = false;
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.loading = false;
                state.error = 'Ошибка';
            });
    },
});

export default postsSlice.reducer;
