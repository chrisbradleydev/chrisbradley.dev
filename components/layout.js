import PropTypes from 'prop-types';
import styles from './layout.module.scss';
import Nav from './nav';

export const fullName = 'Chris Bradley';

function Layout({ children }) {
    return (
        <div className={styles.container}>
            <Nav />
            <header className={styles.container__header}>
                <div style={{ height: '600px' }} />
            </header>
            <main className={styles.container__main}>{children}</main>
            <footer className={styles.container__footer} />
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.array.isRequired,
};

export default Layout;
