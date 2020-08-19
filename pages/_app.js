import PropTypes from 'prop-types';
import '../styles/global.css';

function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

App.propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.object.isRequired,
};

export default App;
