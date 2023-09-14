//Компонент одного поста

import { useAppSelector } from '../../hooks/store-hooks';
import { Link } from 'react-router-dom';

import ReactionSection from '../reaction-section/reaction-section';

import styles from './post.module.css';

type PropsType = {
    id: number;
    postSize?: 'big';
    title: string;
    body: string;
    likes: number;
    dislikes: number;
    idList: number;
};

const Post = ({
    postSize,
    title,
    body,
    id,
    likes,
    dislikes,
    idList,
}: PropsType) => {
    //Достаем из стора список id статей, которые лайкнул пользоватетелем
    const userPostsLikes = useAppSelector(
        (state) => state.posts.userPostsLikes
    );
    //Достаем из стора список id статей, которые дизлайкнул пользоватетелем
    const userPostsDislikes = useAppSelector(
        (state) => state.posts.userPostsDislikes
    );

    return (
        <section
            className={
                postSize ? `${styles.post} ${styles.post__big}` : styles.post
            }
        >
            <img
                src={
                    postSize
                        ? 'https://placehold.co/1140x600'
                        : 'https://placehold.co/558x273'
                }
                alt=''
            />
            {postSize ? (
                <div className={styles.post__body}>
                    <div className={styles.post__body__titleSection}>
                        <h3>{title}</h3>
                        <ReactionSection
                            id={id}
                            idList={idList}
                            likes={likes}
                            dislikes={dislikes}
                            userPostsLikes={userPostsLikes}
                            userPostsDislikes={userPostsDislikes}
                        />
                    </div>
                    <p>{body}</p>
                    <Link
                        className={styles.post__body__buttonReadAll}
                        to={{ pathname: `/posts/${id}` }}
                    >
                        <div>Читать далее</div>
                    </Link>
                </div>
            ) : (
                <div
                    className={`${styles.post__body} ${styles.post__body__small}`}
                >
                    <h3>{title}</h3>
                    <div className={styles.post__body__footerContainer}>
                        <ReactionSection
                            id={id}
                            idList={idList}
                            likes={likes}
                            dislikes={dislikes}
                            userPostsLikes={userPostsLikes}
                            userPostsDislikes={userPostsDislikes}
                        />
                        <Link
                            className={styles.post__body__buttonReadAll}
                            to={{ pathname: `/posts/${id}` }}
                        >
                            <div>Читать далее</div>
                        </Link>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Post;
