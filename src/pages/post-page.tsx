import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/store-hooks';

import styles from './post-page.module.css';
import backImg from '../images/back.png';
import ReactionSection from '../components/reaction-section/reaction-section';

const PostPage = () => {
    const { id } = useParams();
    const postsList = useAppSelector((state) => state.posts.postsList);
    const userPostsLikes = useAppSelector(
        (state) => state.posts.userPostsLikes
    );
    const userPostsDislikes = useAppSelector(
        (state) => state.posts.userPostsDislikes
    );

    const post = postsList.find((post) => post.id === Number(id));

    return (
        <main className={styles.pageContainer}>
            <div className={styles.topPanel}>
                <Link className={styles.topPanel__buttonBack} to='/'>
                    <img src={backImg} alt='' />
                    <label>Вернуться к статьям</label>
                </Link>
                <div className={styles.topPanel__ratingsContainer}>
                    {post ? (
                        <ReactionSection
                            id={post.id}
                            idList={post.idList}
                            likes={post.likes}
                            dislikes={post.dislikes}
                            userPostsLikes={userPostsLikes}
                            userPostsDislikes={userPostsDislikes}
                        />
                    ) : (
                        ''
                    )}
                </div>
            </div>
            <div className={styles.mainContent}>
                <h1>{post?.title}</h1>
                <div className={styles.mainContent__body}>
                    <img src='https://placehold.co/848x477' alt='' />
                    <p>{post?.body}</p>
                </div>
            </div>
        </main>
    );
};

export default PostPage;
