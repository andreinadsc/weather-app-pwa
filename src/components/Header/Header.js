import Toggle from './Toggle';
import Logo from '../../images/logo.webp';
import classes from './Header.module.css';

const Header = () => {
    return (
        <header className={classes.header}>
            <Toggle />
            <img className={classes.logo} alt='logo' src={Logo} />
            <h1 className={classes.title}>Weather Forecast</h1>
        </header>
    );
};

export default Header;