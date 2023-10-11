import classes from './ForecastList.module.css';
import { useContext } from 'react';
import WeatherContext from '../../../context/weather-context';

const ForecastList = ({ date, icon, text, temp, type }) => {
    const { temperatureUnit: { grado } } = useContext(WeatherContext);
    const tempText = temp.max ? `${temp.max} ${grado} / ${temp.min} ${grado}`
        : `${temp} ${grado}`;

    return (
        <li className={`${classes.frame} ${classes[type]}`}>
            <span>{date}</span>
            <img className={classes.img} src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt='icon' />
            <span className={classes.temp}>{tempText}</span>
            <p className={classes.text}>{text}</p>
        </li>
    );
};

export default ForecastList;