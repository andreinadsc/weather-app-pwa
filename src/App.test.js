/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, fireEvent, within, act } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { mockedDataWeatherCO, mocksFetch } from './utilities/testUtilities';
import App from './App'
import WeatherProvider from './context/WeatherProvider';

let container;

describe('App', () => {
    beforeAll(() => {
        container = document.createElement('div');
        container.setAttribute('id', 'overlays');
        document.body.appendChild(container);
    });

    beforeEach(() => {
        mocksFetch(fetchMock, ['cities', 'weather', 'forecast', 'geocode']);
        navigator.geolocation = {
            getCurrentPosition: jest.fn().mockImplementation((success) =>
                Promise.resolve(
                    success({
                        coords: {
                            latitude: 10,
                            longitude: 10
                        }
                    })
                )
            )
        }
    });

    afterEach(() => fetchMock.restore());

    test('should take navigator position and render the weather', async () => {
        render(
            <WeatherProvider>
                <App />
            </WeatherProvider>
        );

        expect(await screen.findByText('Current Weather')).toBeInTheDocument();
        expect(await screen.findByText('Today\'s available forecasts')).toBeInTheDocument();
        expect(await screen.findByText('5-day Forecast')).toBeInTheDocument();

        expect(screen.getByTestId('location')).toHaveTextContent('Madrid, ES');

        const weatherDetails = screen.getByLabelText('weather-details');
        const weatherItems = within(weatherDetails).getAllByRole('listitem');
        expect(weatherItems[0].innerHTML).toMatch(/Real feel<\/span><span class="description">18 °C<\/span>/);

    });

    test('should search for citie and render weather', async () => {
        fetchMock.mock(/data\/2.5\/weather/, mockedDataWeatherCO, {
            overwriteRoutes: true
        });

        render(
            <WeatherProvider>
                <App />
            </WeatherProvider>
        );

        fireEvent.click(screen.getByTestId('open-sidebar'));

        const input = screen.getByRole('combobox');

        expect(screen.getAllByRole('listitem').length).toBe(1);

        fireEvent.keyDown(input, {
            key: 'ArrowDown',
            keyCode: 40,
            code: 40,
        });

        fireEvent.click(await screen.findByText('Colombia,CO'));

        expect(await screen.findByText('Current Weather')).toBeInTheDocument();
        expect(await screen.findByText('Today\'s available forecasts')).toBeInTheDocument();
        expect(await screen.findByText('5-day Forecast')).toBeInTheDocument();

        expect(screen.getByTestId('location')).toHaveTextContent('Colombia, CO');

        const weatherDetails = screen.getByLabelText('weather-details');

        const weatherItems = within(weatherDetails).getAllByRole('listitem');
        expect(weatherItems[0].innerHTML).toMatch(/Real feel<\/span><span class="description">18 °C<\/span>/);

    });

    test('should change the temperature to farenheit when we click the toggle', async () => {
        render(
            <WeatherProvider>
                <App />
            </WeatherProvider>
        );

        fireEvent.click(screen.getByRole('checkbox'));

        expect(await screen.findByText('Current Weather')).toBeInTheDocument();
        expect(await screen.findByText('Today\'s available forecasts')).toBeInTheDocument();
        expect(await screen.findByText('5-day Forecast')).toBeInTheDocument();

        expect(screen.getByTestId('location')).toHaveTextContent('Madrid, ES');

        const weatherDetails = screen.getByLabelText('weather-details');
        const weatherItems = within(weatherDetails).getAllByRole('listitem');
        expect(weatherItems[0].innerHTML).toMatch(/Real feel<\/span><span class="description">18 °F<\/span>/);
    });

    test('should have on the sidebar all the locations we visit', async () => {
        render(
            <WeatherProvider>
                <App />
            </WeatherProvider>
        );

        fireEvent.click(screen.getByTestId('open-sidebar'));

        await act(async () => {
            const locations = within(await screen.findByLabelText('saved-locations')).queryAllByRole('listitem');
            expect(locations).toHaveLength(2);
        });
    });
});