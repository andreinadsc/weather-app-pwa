import fetchMock from 'fetch-mock';
import { render, screen, within } from '@testing-library/react';

import WeatherWrapper from '../WeatherWrapper';

import { mokedDataForecast, mockedDataWeather } from '../../../utilities/testUtilities';

import WeatherContext from '../../../context/weather-context';

const weatherContext = {
    stateLocations: {
        location: 'Madrid,ES',
        savedLocations: []
    },
    temperatureUnit: {
        query: 'metric',
        grado: '°C'
    },
    theme: 'day',
    temperatureUnitHandler: (temperatureUnit) => { },
    dispatchLocations: (state, action) => { },
    setTheme: (theme) => { }
};

describe('Weather Wrapper', () => {
    beforeEach(() => {
        fetchMock.mock(/data\/2.5\/weather/, mockedDataWeather);
        fetchMock.mock(/data\/2.5\/forecast/, mokedDataForecast);
    });

    afterEach(() => fetchMock.restore());

    test('should show error if the forecast is no available, but keep showing the current weather data', async () => {
        fetchMock.mock(/data\/2.5\/forecast/, { throws: { message: 'error with forecast' } },{
            overwriteRoutes: true
        });

        render(
            <WeatherContext.Provider value={weatherContext}>
                <WeatherWrapper />
            </WeatherContext.Provider>
        );

        expect(await screen.findByText('Current Weather')).toBeInTheDocument();

        expect(screen.getByText('No forecast at the moment, try again later')).toBeInTheDocument();
    });

    test('should show error if current weather data is no available', async () => {
        fetchMock.mock(/data\/2.5\/weather/, { throws: { message: 'Failed to fetch' } }, {
            overwriteRoutes: true
        });

        render(
            <WeatherContext.Provider value={weatherContext}>
                <WeatherWrapper />
            </WeatherContext.Provider>
        );

        expect(await screen.findByText('Failed to fetch')).toBeInTheDocument();
        expect(screen.queryByText('Current Weather')).not.toBeInTheDocument();
        expect(screen.queryByText('5-day Forecast')).not.toBeInTheDocument();
    });

    test('should show current weather and forecast', async () => {

        let weatherItems;

        render(
            <WeatherContext.Provider value={weatherContext}>
                <WeatherWrapper />
            </WeatherContext.Provider>
        );

        expect(await screen.findByText('Current Weather')).toBeInTheDocument();
        expect(await screen.findByText('Today\'s available forecasts')).toBeInTheDocument();
        expect(await screen.findByText('5-day Forecast')).toBeInTheDocument();

        const weatherDetails = screen.getByLabelText('weather-details');
        const forecast = screen.getByLabelText('today-forecast');

        weatherItems = within(weatherDetails).getAllByRole('listitem');
        expect(weatherItems.length).toBe(9);
        expect(weatherItems[0].innerHTML).toMatch(/Real feel<\/span><span class="description">18 °C<\/span>/);
        expect(weatherItems[1].innerHTML).toMatch(/Max Temp.<\/span><span class="description">21 °C<\/span>/);
        expect(weatherItems[2].innerHTML).toMatch(/Min Temp.<\/span><span class="description">15 °C<\/span>/)


        weatherItems = within(forecast).getAllByRole('listitem');
        expect(weatherItems.length).toBe(3);
        expect(weatherItems[0].innerHTML).toMatch(/<span>03:00<\/span>/);
        expect(weatherItems[0].innerHTML).toMatch(/<span class="temp">18 °C<\/span><p class="text">Clear<\/p>/);
        expect(weatherItems[1].innerHTML).toMatch(/<span>06:00<\/span>/);
        expect(weatherItems[1].innerHTML).toMatch(/<span class="temp">18 °C<\/span><p class="text">Clear<\/p>/);
        expect(weatherItems[2].innerHTML).toMatch(/<span>09:00<\/span>/);
        expect(weatherItems[2].innerHTML).toMatch(/<span class="temp">21 °C<\/span><p class="text">Clouds<\/p>/);
    });

});
