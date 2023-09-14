//Компанент панели поиска статей

import { useState } from 'react';
import { useAppDispatch } from '../../hooks/store-hooks';
import { fetchPosts } from '../../store/slices/postsSlice';

import shapeImg from '../../images/Shape.png';

import styles from './search-panel.module.css';

const SearchPanel = () => {
    const [inputValue, setInputValue] = useState('');

    const dispatch = useAppDispatch();

    //Работа с формой
    const onSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();
        //Так как нет кнопки кнопки возвращения ко всему списку постов поиск по пустому запросу возвращается полный список постов
        if (!inputValue) {
            dispatch(fetchPosts());
        } else {
            //Возвращаем по нужному заголовку
            dispatch(fetchPosts(`title=${inputValue}`));
        }
        //Обновляем данные в инпуте
        setInputValue('');
    };

    return (
        <form className={styles.searchPanel} onSubmit={onSubmitForm}>
            <img src={shapeImg} alt='' onClick={onSubmitForm} />
            <input
                placeholder='Поиск по названию статьи'
                type='text'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
        </form>
    );
};

export default SearchPanel;
