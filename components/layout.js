import PropTypes from 'prop-types';
import { useTheme } from '@@/contexts/theme-provider';
import Nav from './nav';

export const fullName = 'Chris Bradley';
export const projectName = 'chrisbradleydev';

function Layout({ children }) {
    const [theme] = useTheme();
    return (
        <div className={theme}>
            <div className="dark:bg-gray-900 flex flex-col dark:text-white text-gray-900">
                <Nav />
                <header>
                    <div />
                </header>
                <main>{children}</main>
                <footer className="dark:bg-pink-400 bg-gray-900 h-16" />
            </div>
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.array.isRequired,
};

export default Layout;
