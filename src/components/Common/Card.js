import classes from './Card.module.css';

const Card = ({ isSmall, children }) => {
    const classList = isSmall ? `${classes.card} ${classes['small_card']}` : `${classes.card}`;

    return <div data-testid='card' className={classList}>{children}</div>;
};

export default Card;