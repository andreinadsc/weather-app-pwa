import { useContext, useState } from 'react';
import classes from './Toggle.module.css';
import WeatherContext from '../../context/weather-context';

const Toggle = () => {
    const { temperatureUnitHandler } = useContext(WeatherContext);
    const [checked, setChecked] = useState(true);

    const checkedHandler = (event) => {
        temperatureUnitHandler(event.target.checked ? 'metric' : 'imperial');
        setChecked(event.target.checked);
    }

    return (
        <div className={classes['toggle-switch']}>
            <input type='checkbox' className={classes['checkbox']}
                name='temperature' id='temperature' onChange={checkedHandler} checked={checked} />
            <label className={classes['label']} htmlFor='temperature' >
                <span className={classes['inner']}  />
                <span className={classes['switch']} data-testid='switch' />
            </label>
        </div>
    );
};

export default Toggle;