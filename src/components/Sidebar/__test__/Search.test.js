import { render, screen, fireEvent } from '@testing-library/react';
import fetchMock from 'fetch-mock';

import Search from '../Search';
import WeatherProvider from '../../../context/WeatherProvider';
import { mocksFetch } from '../../../utilities/testUtilities';

describe('Search Cities', () => {
    beforeEach(() => {
        mocksFetch(fetchMock, ['cities']);
    });

    afterEach(() => fetchMock.restore());

    test('should saved the selected location on the localStorage', async () => {
        render(
            <WeatherProvider>
                <Search setNavIsOpen={() => { }} />
            </WeatherProvider>
        );

        const placeholder = screen.getByText('Search for cities');
        const input = screen.getByRole('combobox');

        expect(placeholder).toBeInTheDocument();
        expect(input).toHaveValue('');

        fireEvent.keyDown(input, {
            key: 'ArrowDown',
            keyCode: 40,
            code: 40,
        });
        fireEvent.click(await screen.findByText('Caracas,VE'));

        expect(localStorage.getItem('savedLocations')).toEqual(JSON.stringify(['Caracas,VE']));
    });
});