//Страница отдельной статьи

import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/store-hooks';

import ReactionSection from '../components/reaction-section/reaction-section';

import backImg from '../images/back.png';

import styles from './post-page.module.css';

const PostPage = () => {
    //Вытаскиваем номер статьи из URL
    const { id } = useParams();

    //Достаем из стора список статей и списки id, которые лайкнул или дизлайкнул пользователь
    const postsList = useAppSelector((state) => state.posts.postsList);
    const userPostsLikes = useAppSelector(
        (state) => state.posts.userPostsLikes
    );
    const userPostsDislikes = useAppSelector(
        (state) => state.posts.userPostsDislikes
    );

    //Ищем нужный пост
    const post = postsList.find((post) => post.id === Number(id));

    return (
        <main className={styles.page}>
            <div className={styles.page__topPanel}>
                <Link className={styles.page__topPanel__buttonBack} to='/'>
                    <img src={backImg} alt='' />
                    <label>Вернуться к статьям</label>
                </Link>
                <div className={styles.page__topPanel__ratingsContainer}>
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
            <div className={styles.page__mainContent}>
                <h1>{post?.title}</h1>
                <div className={styles.page__mainContent__body}>
                    <img src='https://placehold.co/848x477' alt='' />
                    <p>{post?.body}</p>
                </div>
            </div>
        </main>
    );
};

export default PostPage;
