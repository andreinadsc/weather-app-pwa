import classes from './Title.module.css';

const Title = ({ title, isSubtitle = false }) =>
    <h4 className={isSubtitle ? `${classes.header} ${classes.subtitle}` : classes.header}>{title}</h4>;

export default Title;