//Компонент приложения

import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/store-hooks';
import { fetchPosts } from '../../store/slices/postsSlice';

import Header from '../header/header';
import Main from '../main/main';
import PostPage from '../../pages/post-page';

import styles from './app.module.css';

const App = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        //Запрос данных для постов
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={
                        <div className={styles.app}>
                            <Header />
                            <Main />
                        </div>
                    }
                />
                <Route path='/posts/:id' element={<PostPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
