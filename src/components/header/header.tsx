//Компонент шапки блога

import styles from './header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <h1>Блог</h1>
            <p>
                Здесь мы делимся интересными кейсами из наших проектов, пишем
                про IT, а также переводим зарубежные статьи
            </p>
        </header>
    );
};

export default Header;
