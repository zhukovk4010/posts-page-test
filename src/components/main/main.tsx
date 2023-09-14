//Компонент основного контента на странице с постами

import { useAppSelector } from '../../hooks/store-hooks';

import Post from '../post/post';
import SearchPanel from '../search-shape/search-panel';

import styles from './main.module.css';

const Main = () => {
    //Достаем список постов из стора
    const postsList = useAppSelector((state) => state.posts.postsList);
    const isLoading = useAppSelector((state) => state.posts.loading);
    const error = useAppSelector((state) => state.posts.error);

    //В момент загрузки данных
    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <h1>Загрузка</h1>
            </div>
        );
    }

    //При ошибке
    if (error) {
        return <div className={styles.errorContainer}>{error}</div>;
    }

    return (
        <main>
            <SearchPanel />
            <div className={styles.main__postsContainer}>
                {postsList.map((post) => {
                    //Первый пост отрисовываем большим
                    if (post.idList === 0) {
                        return (
                            <Post
                                key={post.idList}
                                id={post.id}
                                idList={post.idList}
                                postSize='big'
                                title={post.title}
                                body={post.body}
                                likes={post.likes}
                                dislikes={post.dislikes}
                            />
                        );
                    } else {
                        return (
                            <Post
                                idList={post.idList}
                                key={post.idList}
                                id={post.id}
                                title={post.title}
                                body={post.body}
                                likes={post.likes}
                                dislikes={post.dislikes}
                            />
                        );
                    }
                })}
            </div>
        </main>
    );
};

export default Main;
