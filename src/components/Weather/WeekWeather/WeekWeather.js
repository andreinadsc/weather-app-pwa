import { getWeekForecastData } from '../../../utilities/DataUtils';
import { useEffect, useState } from 'react';
import ForecastList from '../ForecastList/ForecastList';
import Title from '../../Common/Title';

const WeekWeather = ({ forecast }) => {
    const [weekForecast, setWeekForecast] = useState(null);

    useEffect(() => {
        setWeekForecast(getWeekForecastData(forecast));
    }, [forecast]);

    return (
        <>
            <Title title='5-day Forecast' />
            <ul style={{ paddingTop: '2rem' }} aria-label='week-forecast'>
                {
                    weekForecast && weekForecast.map(forecast => (
                        <ForecastList key={forecast.date}
                            date={forecast.day}
                            icon={forecast.icon}
                            text={forecast.text}
                            temp={{ max: forecast.temp_max, min: forecast.temp_min }}
                            type='horizontal'
                        />
                    ))
                }
            </ul>
        </>
    )
};
export default WeekWeather;