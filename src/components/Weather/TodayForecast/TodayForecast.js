import Title from '../../Common/Title';
import ForecastList from '../ForecastList/ForecastList';
import classes from './TodayForecast.module.css';

const TodayForecast = ({ forecast }) => {
    return (
        forecast.length > 0 &&
        <>
            <Title title="Today's available forecasts" />
            <ul className={classes.forecast} aria-label='today-forecast'>
                {
                    forecast.map(weather => (
                        <ForecastList
                            key={weather.id}
                            date={weather.date.split(' ')[1].slice(0, 5)}
                            temp={weather.temp}
                            text={weather.text}
                            icon={weather.icon}
                            type='vertical'
                        />
                    ))
                }
            </ul> 
        </>
    );
};

export default TodayForecast;