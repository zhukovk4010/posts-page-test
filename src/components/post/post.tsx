import styles from './post.module.css';
import likeDefault from '../../images/Like-default.png';
import dislikeDefault from '../../images/Dislike-default.png';

type PropsType = {
    id: number;
    postSize?: 'big';
    title: string;
    body: string;
    likes: number;
    dislikes: number;
};

const Post = ({ postSize, title, body, id, likes, dislikes }: PropsType) => {
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
                            <button className={styles.grade}>
                                <img src={likeDefault} alt='' />
                            </button>
                            <label>{likes}</label>
                            <button
                                className={`${styles.grade} ${styles.dislike}`}
                            >
                                <img src={dislikeDefault} alt='' />
                            </button>
                            <label>{dislikes}</label>
                        </div>
                    </div>
                    <p>{body}</p>
                    <button className={styles.buttonReadAll}>
                        Читать далее
                    </button>
                </div>
            ) : (
                <div className={`${styles.postBody} ${styles.small}`}>
                    <h3>{title}</h3>
                    <div className={styles.postFooterContainer}>
                        <button className={styles.grade}>
                            <img src={likeDefault} alt='' />
                        </button>
                        <label>{likes}</label>
                        <button className={`${styles.grade} ${styles.dislike}`}>
                            <img src={dislikeDefault} alt='' />
                        </button>
                        <label>{dislikes}</label>
                        <button
                            className={`${styles.buttonReadAll} ${styles.buttonReadAllFooter}`}
                        >
                            Читать далее
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Post;
