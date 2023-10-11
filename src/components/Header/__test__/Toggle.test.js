import { fireEvent, render, screen } from '@testing-library/react';
import Toggle from '../Toggle';

describe('Toggle', () => {
    test('should render with celsius temperature metric by default', () => {
        render(<Toggle />);
        expect(screen.getByRole('checkbox')).toBeChecked();
    });

    test('should render with farenheit when toggle is clicked', async () => {
        render(<Toggle />);
        
        fireEvent.click(screen.getByRole('checkbox'));

        expect(screen.getByRole('checkbox')).not.toBeChecked();
    });
});