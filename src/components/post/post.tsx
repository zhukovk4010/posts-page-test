import styles from './post.module.css';
import likeDefault from '../../images/Like-default.png';
import dislikeDefault from '../../images/Dislike-default.png';
import likeActive from '../../images/Like-active.png';
import dislikeActive from '../../images/Dislike.png';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { dislikePost, likePost } from '../../store/slices/postsSlice';
import { Link } from 'react-router-dom';

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

    const dispatch = useAppDispatch();

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
                        <div className={styles.ratingsPanel}>
                            <button
                                className={styles.grade}
                                onClick={() =>
                                    dispatch(
                                        likePost({ id: id, idList: idList })
                                    )
                                }
                            >
                                <img
                                    src={
                                        userPostsLikes.includes(id)
                                            ? likeActive
                                            : likeDefault
                                    }
                                    alt=''
                                />
                            </button>
                            <label>{likes}</label>
                            <button
                                className={`${styles.grade} ${styles.dislike}`}
                                onClick={() =>
                                    dispatch(
                                        dislikePost({ id: id, idList: idList })
                                    )
                                }
                            >
                                <img
                                    src={
                                        userPostsDislikes.includes(id)
                                            ? dislikeActive
                                            : dislikeDefault
                                    }
                                    alt=''
                                />
                            </button>
                            <label>{dislikes}</label>
                        </div>
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
                        <button
                            className={styles.grade}
                            onClick={() =>
                                dispatch(likePost({ id: id, idList: idList }))
                            }
                        >
                            <img
                                src={
                                    userPostsLikes.includes(id)
                                        ? likeActive
                                        : likeDefault
                                }
                                alt=''
                            />
                        </button>
                        <label>{likes}</label>
                        <button
                            className={`${styles.grade} ${styles.dislike}`}
                            onClick={() =>
                                dispatch(
                                    dislikePost({ id: id, idList: idList })
                                )
                            }
                        >
                            <img
                                src={
                                    userPostsDislikes.includes(id)
                                        ? dislikeActive
                                        : dislikeDefault
                                }
                                alt=''
                            />
                        </button>
                        <label>{dislikes}</label>
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
