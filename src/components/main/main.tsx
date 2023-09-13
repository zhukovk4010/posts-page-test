import { useAppSelector } from '../../hooks/store-hooks';
import Post from '../post/post';
import SearchPanel from '../search-shape/search-panel';
import styles from './main.module.css';

const Main = () => {
    const postsList = useAppSelector((state) => state.posts.postsList);

    return (
        <main className={styles.main}>
            <SearchPanel />
            <div className={styles.postsContainer}>
                {postsList.map((post, index) => {
                    if (index === 0) {
                        return (
                            <Post
                                key={index}
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
                                key={index}
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
