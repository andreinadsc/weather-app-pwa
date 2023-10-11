import { createContext } from 'react';

const WeatherContext = createContext({
    temperatureUnit: {
        query: '',
        grado: ''
    },
    theme: 'day',
    stateLocations: {
        location: null,
        savedLocations: []
    },
    temperatureUnitHandler: (temperatureUnit) => {},
    dispatchLocations: (state, action) => {},
    setTheme: (theme) => {}
});

export default WeatherContext;