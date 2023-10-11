import classes from './WeatherDescription.module.css';

const WeatherDescription = ({ icon, temp, description, unit }) => {
    return (
        <div className={classes.wrapper} >
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt='icon' />
            <span className={classes.temp}>{Math.round(temp)} {unit}</span>
            <p className={classes.description}>{description}</p>
        </div>
    );
};

export default WeatherDescription;