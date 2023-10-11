import { useContext } from 'react';
import { FaTemperatureHigh, FaTemperatureArrowUp, FaTemperatureArrowDown, FaWind } from "react-icons/fa6";
import { GiSunrise, GiSunset } from 'react-icons/gi';
import { WiHumidity, WiCloudy, WiBarometer } from 'react-icons/wi';
import classes from './WeatherDetails.module.css';
import WeatherContext from '../../../context/weather-context';

const WeatherDetails = ({ weatherDetails }) => {
    const { temperatureUnit: { grado } } = useContext(WeatherContext);

    return (
        <ul className={classes.grid} aria-label="weather-details">
            <li className={classes.columns}>
                <span className={classes.title}><FaTemperatureHigh /> Real feel</span>
                <span className={classes.description}>{weatherDetails.feels_like} {grado}</span>
            </li>

            <li className={classes.columns}>
                <span className={classes.title}><FaTemperatureArrowUp /> Max Temp.</span>
                <span className={classes.description}>{weatherDetails.temp_max} {grado}</span>
            </li>
            <li>
                <span className={classes.title}><FaTemperatureArrowDown /> Min Temp.</span>
                <span className={classes.description}>{weatherDetails.temp_min} {grado}</span>
            </li>
            <li className={classes.columns}>
                <span className={classes.title}><WiHumidity /> Humidity</span>
                <span className={classes.description}>{weatherDetails.humidity} %</span>
            </li>
            <li className={classes.columns}>
                <span className={classes.title}><WiBarometer /> Air Pressure</span>
                <span className={classes.description}>{weatherDetails.pressure} hPa</span>
            </li>
            <li className={classes.columns}>
                <span className={classes.title}><GiSunrise /> Sunrise</span>
                <span className={classes.description}>{weatherDetails.sunrise}</span>
            </li>
            <li className={classes.columns}>
                <span className={classes.title}><GiSunset /> Sunset </span>
                <span className={classes.description}>{weatherDetails.sunset}</span>
            </li>
            <li className={classes.columns}>
                <span className={classes.title}><FaWind /> Wind </span>
                <span className={classes.description}>{weatherDetails.wind} m/s</span>
            </li>
            <li className={classes.columns}>
                <span className={classes.title}><WiCloudy /> Clouds </span>
                <span className={classes.description}>{weatherDetails.clouds} %</span>
            </li>
        </ul>
    );
};

export default WeatherDetails;