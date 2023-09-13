//Слайс постов

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

//Типы

type PostType = {
    userId: number;
    id: number;
    title: string;
    body: string;
    likes: number;
    dislikes: number;
};

type InitialStateType = {
    postsList: PostType[];
    userPostLikes: number[];
    userPostDislikes: number[];
    loading: boolean;
    error: string | null;
};

const initialState: InitialStateType = {
    postsList: [],
    userPostLikes: [],
    userPostDislikes: [],
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
                function getRandomInt(max: number) {
                    return Math.floor(Math.random() * max);
                }

                action.payload.forEach((item, index) => {
                    state.postsList.push(item);
                    state.postsList[index].likes = getRandomInt(50);
                    state.postsList[index].dislikes = getRandomInt(50);
                });

                state.loading = false;
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.loading = false;
                state.error = 'Ошибка';
            });
    },
});

export default postsSlice.reducer;
