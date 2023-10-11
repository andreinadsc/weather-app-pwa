import { render, screen } from '@testing-library/react'
import Error from '../Error';

describe('Error', () => {
    test('should add a new big card', () => {
        render(<Error message='Something went wrong'/>);
        expect(screen.getByTestId('card')).toHaveTextContent('Something went wrong');
    });
});
