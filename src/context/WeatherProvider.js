
import { useReducer, useState, useMemo, useEffect } from 'react';
import WeatherContext from './weather-context';
const LOCAL_STORAGE_KEY = 'savedLocations';

const locationReducer = (state, { type, location }) => {
    switch (type) {
        case 'INIT_SAVED':
            return {
                ...state,
                savedLocations: [...location]
            };
        case 'ADD_NEW':
            if (!state.savedLocations.includes(location)) {
                return {
                    location: location,
                    savedLocations: [...state.savedLocations, location]
                };
            }
            return {
                ...state,
                location: location
            };
        case 'REMOVE_SAVED':
            return {
                ...state,
                savedLocations: state.savedLocations.filter(loc => loc !== location)
            };
        case 'OPEN_SAVED':
            return {
                ...state,
                location: location
            };
        default:
            return state;
    }
};

const WeatherProvider = ({ children }) => {
    const [stateLocations, dispatchLocations] = useReducer(locationReducer, {
        location: null,
        savedLocations: []
    });
    const [temperatureUnit, setTemperatureUnit] = useState({ query: 'metric', grado: '°C' });
    const [theme, setTheme] = useState('day');

    useEffect(() => {
        const json = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
        dispatchLocations({
            type: 'INIT_SAVED',
            location: json,
        });

    }, []);

    useEffect(() => {
        if (stateLocations.savedLocations.length > 0) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateLocations.savedLocations));
        }
    }, [stateLocations]);

    const temperatureUnitHandler = (unit) => {
        const temperature = unit === 'metric' ? { query: 'metric', grado: '°C' } : { query: 'imperial', grado: '°F' };
        setTemperatureUnit(temperature);
    };

    const weatherContext = useMemo(() => {
        return {
            stateLocations,
            temperatureUnit,
            theme,
            dispatchLocations,
            temperatureUnitHandler,
            setTheme
        };
    }, [stateLocations, temperatureUnit, theme]);

    return (
        <WeatherContext.Provider value={weatherContext}>
            {children}
        </WeatherContext.Provider>
    )
};

export default WeatherProvider;