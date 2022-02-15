import PropTypes from 'prop-types';
import Nav from './nav';

export const fullName = 'Chris Bradley';

function Layout({ children }) {
    return (
        <div className="flex flex-col">
            <Nav />
            <header>
                <div />
            </header>
            <main>{children}</main>
            <footer className="bg-pink-400 h-16" />
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.array.isRequired,
};

export default Layout;
