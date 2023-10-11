import { render, screen } from '@testing-library/react';
import WeatherContext from '../../../context/weather-context';
import SavedLocations from '../SavedLocations';

describe('Saved Locations Menu', () => {
    const weatherContext = {
        stateLocations: {
            location: 'Madrid,ES',
            savedLocations: []
        },
        temperatureUnit: {
            query: '',
            grado: ''
        },
        theme: 'day',
        temperatureUnitHandler: (temperatureUnit) => { },
        dispatchLocations: (state, action) => { },
        setTheme: (theme) => { }
    };

    test('should not render if there are no saved locations', async () => {
        render(
            <WeatherContext.Provider value={weatherContext}>
                <SavedLocations setNavIsOpen={() => { }} />
            </WeatherContext.Provider>
        );

        expect(screen.queryByText('Recent cities')).not.toBeInTheDocument();
    });

    test('should render if there are saved locations', async () => {
        weatherContext.stateLocations.savedLocations = ['Madrid,ES', 'Caracas,VE', 'Lisbon,PT']

        render(
            <WeatherContext.Provider value={weatherContext}>
                <SavedLocations setNavIsOpen={() => { }} />
            </WeatherContext.Provider>
        );

        const cities = screen.getAllByRole('listitem');

        expect(screen.getByText('Recent cities')).toBeInTheDocument();
        expect(cities.length).toBe(3);
        expect(cities[0]).toHaveTextContent('Madrid,ES');
        expect(cities[1]).toHaveTextContent('Caracas,VE');
        expect(cities[2]).toHaveTextContent('Lisbon,PT');
    });
});