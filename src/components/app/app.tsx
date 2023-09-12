import Header from '../header/header';
import Main from '../main/main';
import styles from './app.module.css';

const App = () => {
    return (
        <div className={styles.app}>
            <Header />
            <Main />
        </div>
    );
};

export default App;
