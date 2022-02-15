import PropTypes from 'prop-types';
import Link from 'next/link';
import Logo from '../components/logo';

const navItems = [
    { href: '/', text: 'Uno' },
    { href: '/', text: 'Dos' },
    { href: '/', text: 'Tres' },
    { href: '/', text: 'Cuatro' },
    { href: '/', text: 'Cinco' },
    { href: '/', text: 'Seis' },
];

function NavItem({ href, text }) {
    return (
        <li className="px-8 py-2">
            <Link href={href}>
                <a className="block hover:text-pink-300 text-lg">{text}</a>
            </Link>
        </li>
    );
}

NavItem.propTypes = {
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

function Nav() {
    return (
        <nav className="flex items-center justify-between max-w-8xl mx-auto">
            <ul className="flex items-center justify-center">
                <li>
                    <Link href="/">
                        <a className="inline-block px-5 py-2">
                            <Logo />
                        </a>
                    </Link>
                </li>
            </ul>
            <ul className="hidden lg:flex">
                {navItems.map(({ href, text }) => (
                    <NavItem key={text.toLowerCase().replace(/\s/g, '-')} href={href} text={text} />
                ))}
            </ul>
            <ul className="flex items-center justify-center"></ul>
        </nav>
    );
}

export default Nav;
