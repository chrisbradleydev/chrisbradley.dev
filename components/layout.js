import Head from 'next/head';
import PropTypes from 'prop-types';
import styles from './layout.module.css';

export const fullName = 'Christopher Bradley';

function Layout({ children }) {
    return (
        <div className={styles.container}>
            <Head></Head>
            <header className={styles.header}></header>
            <main>{children}</main>
            <footer></footer>
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.array.isRequired,
};

export default Layout;
