import { render, screen, fireEvent } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import Sidebar from '../Sidebar'
import WeatherProvider from '../../../context/WeatherProvider';
import { mocksFetch } from '../../../utilities/testUtilities';

let container;

describe('Sidebar', () => {
    beforeEach(() => {
        container = document.createElement('div');
        container.setAttribute('id', 'overlays');
        document.body.appendChild(container);
        localStorage.setItem('savedLocations', JSON.stringify(['Madrid,ES', 'Lisbon,PT', 'Caracas,VE']));
        mocksFetch(fetchMock, ['cities']);
    });

    afterEach(() => {
        fetchMock.restore();
        document.body.removeChild(container);
        container = null;
    });

    test('should open/close the sidebar when clicking the corresponding button', () => {
        render(<Sidebar />)
        fireEvent.click(screen.getByTestId('open-sidebar'));
        expect(screen.getByTestId('close-sidebar')).toBeInTheDocument();

        fireEvent.click(screen.getByTestId('close-sidebar'));
        expect(screen.queryByTestId('close-sidebar')).not.toBeInTheDocument();
        expect(screen.getByTestId('open-sidebar')).toBeInTheDocument();
    });

    test('should save the location only if it is not already saved', async () => {
        render(
            <WeatherProvider>
                <Sidebar />
            </WeatherProvider>
        );
    
        fireEvent.click(screen.getByTestId('open-sidebar'));
    
        const input = screen.getByRole('combobox');
    
        expect(screen.getAllByRole('listitem').length).toBe(3);
    
        fireEvent.keyDown(input, {
            key: 'ArrowDown',
            keyCode: 40,
            code: 40,
        });
        fireEvent.click(await screen.findByText('Colombia,CO'));
        fireEvent.click(screen.getByTestId('open-sidebar'));

        expect(screen.getAllByRole('listitem').length).toBe(4);
        expect(localStorage.getItem('savedLocations'))
            .toEqual(JSON.stringify(['Madrid,ES', 'Lisbon,PT', 'Caracas,VE', 'Colombia,CO']));

        fireEvent.click(await screen.findByText('Caracas,VE'));
        fireEvent.click(screen.getByTestId('open-sidebar'));

        expect(screen.getAllByRole('listitem').length).toBe(4);
    });
});

