import { useEffect } from 'react';
import Header from '../header/header';
import Main from '../main/main';
import styles from './app.module.css';
import { useAppDispatch } from '../../hooks/store-hooks';
import { fetchPosts } from '../../store/slices/postsSlice';

const App = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <div className={styles.app}>
            <Header />
            <Main />
        </div>
    );
};

export default App;
