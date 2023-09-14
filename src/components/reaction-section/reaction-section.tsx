//Компонент секции с лайками и дизлайками

import { useAppDispatch } from '../../hooks/store-hooks';
import { dislikePost, likePost } from '../../store/slices/postsSlice';

//Импорты картинок пальцев вверх и вниз
import likeDefault from '../../images/Like-default.png';
import dislikeDefault from '../../images/Dislike-default.png';
import likeActive from '../../images/Like-active.png';
import dislikeActive from '../../images/Dislike.png';

import styles from './reaction-section.module.css';

type PropsType = {
    id: number;
    idList: number;
    likes: number;
    dislikes: number;
    userPostsLikes: number[];
    userPostsDislikes: number[];
};

const ReactionSection = ({
    id,
    idList,
    likes,
    dislikes,
    userPostsLikes,
    userPostsDislikes,
}: PropsType) => {
    const dispatch = useAppDispatch();
    return (
        <div className={styles.ratingsPanel}>
            <button
                className={styles.ratingsPanel__button}
                onClick={() => dispatch(likePost({ id: id, idList: idList }))}
            >
                <img
                    src={userPostsLikes.includes(id) ? likeActive : likeDefault}
                    alt=''
                />
            </button>
            <label>{likes}</label>
            <button
                className={`${styles.ratingsPanel__button} ${styles.ratingsPanel__button__dislike}`}
                onClick={() =>
                    dispatch(dislikePost({ id: id, idList: idList }))
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
    );
};

export default ReactionSection;
