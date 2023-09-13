import { useEffect } from 'react';
import Header from '../header/header';
import Main from '../main/main';
import styles from './app.module.css';
import { useAppDispatch } from '../../hooks/store-hooks';
import { fetchPosts } from '../../store/slices/postsSlice';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostPage from '../../pages/post-page';

const App = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
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
