import classes from './WeatherInfo.module.css';
import { getDayMonthFromDate } from '../../../utilities/DataUtils';

const WeatherInfo = ({ name, countryCode, date }) => {
    const formatDate = `Today, ${getDayMonthFromDate(date.split(' ')[0])}`;

    return (
        <div className={classes.info}>
            <h4 data-testid='location' className={classes.location}>{name}, {countryCode}</h4>
            <span className={classes.date}>{formatDate}</span>
        </div>
    );
};

export default WeatherInfo;