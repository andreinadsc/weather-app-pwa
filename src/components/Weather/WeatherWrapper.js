import { useCallback, useContext, useEffect, useState } from 'react';
import { WEATHER_API_URL, getDate, splitForecastData } from '../../utilities/DataUtils';
import Card from '../Common/Card';
import Error from '../Common/Error';
import WeatherDetails from './CurrentWeather/WeatherDetails';
import WeatherInfo from './CurrentWeather/WeatherInfo';
import WeatherDescription from './CurrentWeather/WeatherDescription';
import TodayForecast from './TodayForecast/TodayForecast';
import WeekWeather from './WeekWeather/WeekWeather';
import Spinner from '../Common/Spinner';
import Title from '../Common/Title';
import WeatherContext from '../../context/weather-context';
import useHttp from '../../hooks/http';
import classes from './WeatherWrapper.module.css';

const WeatherWrapper = () => {
    const { stateLocations, temperatureUnit, setTheme } = useContext(WeatherContext);
    const { error, sendRequest } = useHttp();
    const [weatherData, setWeatherData] = useState(null);
    const [todayForecast, setTodayForecast] = useState([]);
    const [weekForecast, setWeekForecast] = useState([]);
    const [isLoad, setIsLoad] = useState(false)
    const [fadeProp, setFadeProp] = useState(null);

    const fetchForecast = useCallback(async () => {
        sendRequest(
            {
                url: `${WEATHER_API_URL}/forecast/?q=${stateLocations.location}&units=${temperatureUnit.query}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
            },
            (data) => {
                const [date] = getDate(data.city.timezone);
                const [tmpToday, tmpWeek] = splitForecastData(data, date);

                setTodayForecast(tmpToday);
                setWeekForecast(tmpWeek);
            }
        );
    }, [sendRequest, temperatureUnit.query, stateLocations.location]);

    const fetchWeather = useCallback(async () => {
        setFadeProp('fade-out');
        sendRequest(
            {
                url: `${WEATHER_API_URL}/weather/?q=${stateLocations.location}&units=${temperatureUnit.query}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
            },
            (jsonWeather) => {
                const { main, dt, weather, wind, clouds, name, sys, timezone } = jsonWeather;
                const currentDate = getDate(timezone, dt).join(' ');
                const sunriseDate = getDate(timezone, sys.sunrise).join(' ');
                const sunsetDate = getDate(timezone, sys.sunset).join(' ');

                if (currentDate > sunriseDate && currentDate < sunsetDate) setTheme('day');
                else setTheme('nigth');

                setWeatherData({
                    id: dt,
                    temp: Math.round(main.temp),
                    temp_max: Math.round(main.temp_max),
                    temp_min: Math.round(main.temp_min),
                    feels_like: Math.round(main.feels_like),
                    pressure: main.pressure,
                    humidity: main.humidity,
                    date: currentDate,
                    text: weather[0].main,
                    wind: wind.speed,
                    icon: weather[0].icon,
                    clouds: clouds.all,
                    name,
                    country: sys.country,
                    sunrise: sunriseDate.split(' ')[1],
                    sunset: sunsetDate.split(' ')[1],
                });
            }
        );
    }, [sendRequest, setTheme, temperatureUnit.query, stateLocations.location]);

    useEffect(() => {
        let timeout;

        const fetchBoth = async () => {
            if (stateLocations.location) {
                setIsLoad(false)
                await fetchWeather()
                await fetchForecast();
                setIsLoad(true);
                timeout = setTimeout(() => setFadeProp('fade-in'), 500);
            }
        }

        fetchBoth();

        return () => clearTimeout(timeout);

    }, [fetchForecast, fetchWeather, stateLocations.location]);

    return (
        <div className={`${classes.wrapper} ${!fadeProp ? '' : classes[fadeProp]}`}>
            {error && !weatherData && <Error message={error} />}
            {!fadeProp && !isLoad && !error && <Spinner />}
            {weatherData && isLoad && ((error && weatherData) || !error) &&
                <Card isSmall={true} data-testid='current-weather'>
                    <Title title='Current Weather' />
                    <div className={classes.main}>
                        <WeatherInfo date={weatherData.date} name={weatherData.name} countryCode={weatherData.country} />
                        <WeatherDescription icon={weatherData.icon} temp={weatherData.temp} description={weatherData.text} />
                    </div>
                    <WeatherDetails weatherDetails={weatherData} />
                    {!error && todayForecast.length > 0 && <TodayForecast isSmall={true} forecast={todayForecast} />}
                </Card>
            }
            {isLoad && !error && weekForecast.length > 0 && weatherData &&
                    <Card isSmall={true}>
                        <WeekWeather forecast={weekForecast} />
                    </Card>
            }
            {error && weekForecast.length === 0 && <Title title='No forecast at the moment, try again later' />}
        </div>
    );
};

export default WeatherWrapper;