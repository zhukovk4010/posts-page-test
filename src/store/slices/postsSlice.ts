//Слайс постов

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

//Типы

export type PostType = {
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
    error: string | null | undefined;
};

const initialState: InitialStateType = {
    postsList: [],
    userPostsLikes: [],
    userPostsDislikes: [],
    loading: false,
    error: null,
};

//Fetch функция для постов
//При диспатче функции, можем указать название страницы или id
export const fetchPosts = createAsyncThunk<
    PostType[],
    string | undefined,
    { rejectValue: string }
>('posts/fetchPosts', async (title, { rejectWithValue }) => {
    const responce = await fetch(
        `https://jsonplaceholder.typicode.com/posts?${title}`
    );
    if (!responce.ok) {
        return rejectWithValue('Server Error!');
    }
    const data = await responce.json();
    return data;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        //Логика добавления лайка статье
        //Если лайк уже поставлен, тогда убираем его и снижаем количество лайков на 1
        //Иначе ставим лайк, увеличиваем значение лайков на 1 и проверяем состояние дизлайка,
        //если он стоит то убираем и уменьшаем количество
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
        //Аналогичная логика, как у редюсера лайка посту
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
            //В момент загрузки данных (можно вывести лоадер)
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            //При успешной загрузке данных
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
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { likePost, dislikePost } = postsSlice.actions;

export default postsSlice.reducer;
