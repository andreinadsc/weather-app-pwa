import { render, screen } from '@testing-library/react'
import Offline from '../Offline';

describe('Offline', () => {
    let onLine;

    beforeAll(() => {
        onLine = jest.spyOn(navigator, 'onLine', 'get');
    });

    test('Not Offline', () => {
        onLine.mockReturnValue(true);
        render(<Offline />); 
        expect(screen.queryByText('You are currently offline')).not.toBeInTheDocument();
    });

    test('Offline', () => {
        onLine.mockReturnValue(false);
        render(<Offline />);
        expect(screen.getByTestId('offline').textContent).toContain('You are currently offline.');
    });
});