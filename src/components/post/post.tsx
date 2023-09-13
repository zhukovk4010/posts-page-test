import styles from './post.module.css';

import { useAppSelector } from '../../hooks/store-hooks';
import { Link } from 'react-router-dom';
import ReactionSection from '../reaction-section/reaction-section';

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
    const userPostsLikes = useAppSelector(
        (state) => state.posts.userPostsLikes
    );
    const userPostsDislikes = useAppSelector(
        (state) => state.posts.userPostsDislikes
    );

    return (
        <section className={postSize ? styles.postBig : styles.postSmall}>
            <img
                className={styles.mainImg}
                src={
                    postSize
                        ? 'https://placehold.co/1140x600'
                        : 'https://placehold.co/558x273'
                }
                alt=''
            />
            {postSize ? (
                <div className={styles.postBody}>
                    <div className={styles.postTitleContainer}>
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
                        className={styles.buttonReadAll}
                        to={{ pathname: `/posts/${id}` }}
                    >
                        <div>Читать далее</div>
                    </Link>
                </div>
            ) : (
                <div className={`${styles.postBody} ${styles.small}`}>
                    <h3>{title}</h3>
                    <div className={styles.postFooterContainer}>
                        <ReactionSection
                            id={id}
                            idList={idList}
                            likes={likes}
                            dislikes={dislikes}
                            userPostsLikes={userPostsLikes}
                            userPostsDislikes={userPostsDislikes}
                        />
                        <Link
                            className={styles.buttonReadAll}
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
