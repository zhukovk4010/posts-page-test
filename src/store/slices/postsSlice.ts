//Слайс постов

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

//Типы

type PostType = {
    idList: number;
    userId: number;
    id: number;
    title: string;
    body: string;
    likes: number;
    dislikes: number;
};

type InitialStateType = {
    postsList: PostType[];
    userPostsLikes: number[];
    userPostsDislikes: number[];
    loading: boolean;
    error: string | null;
};

const initialState: InitialStateType = {
    postsList: [],
    userPostsLikes: [],
    userPostsDislikes: [],
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
    reducers: {
        likePost(state, action: PayloadAction<{ id: number; idList: number }>) {
            if (state.userPostsLikes.includes(action.payload.id)) {
                state.postsList[action.payload.idList].likes--;
                state.userPostsLikes = state.userPostsLikes.filter((id) => {
                    return id !== action.payload.id;
                });
            } else {
                state.postsList[action.payload.idList].likes++;
                state.userPostsLikes.push(action.payload.id);
                if (state.userPostsDislikes.includes(action.payload.id)) {
                    state.postsList[action.payload.idList].dislikes--;
                    state.userPostsDislikes = state.userPostsDislikes.filter(
                        (id) => {
                            return id !== action.payload.id;
                        }
                    );
                }
            }
        },
        dislikePost(
            state,
            action: PayloadAction<{ id: number; idList: number }>
        ) {
            if (state.userPostsDislikes.includes(action.payload.id)) {
                state.postsList[action.payload.idList].dislikes--;
                state.userPostsDislikes = state.userPostsDislikes.filter(
                    (id) => {
                        return id !== action.payload.id;
                    }
                );
            } else {
                state.postsList[action.payload.idList].dislikes++;
                state.userPostsDislikes.push(action.payload.id);
                if (state.userPostsLikes.includes(action.payload.id)) {
                    state.postsList[action.payload.idList].likes--;
                    state.userPostsLikes = state.userPostsLikes.filter((id) => {
                        return id !== action.payload.id;
                    });
                }
            }
        },
    },
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
                state.postsList = [];

                action.payload.forEach((item, index) => {
                    state.postsList.push(item);
                    state.postsList[index].likes = getRandomInt(50);
                    state.postsList[index].dislikes = getRandomInt(50);
                    state.postsList[index].idList = index;
                });

                state.loading = false;
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.loading = false;
                state.error = 'Ошибка';
            });
    },
});

export const { likePost, dislikePost } = postsSlice.actions;

export default postsSlice.reducer;
