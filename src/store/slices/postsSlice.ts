//Слайс постов

import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        value: 0,
    },
    reducers: {},
});

export default postsSlice.reducer;
