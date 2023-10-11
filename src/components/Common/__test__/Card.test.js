import { render, screen } from '@testing-library/react'
import Card from '../Card';

describe('Card', () => {
    test('should add a new big card', () => {
        render(<Card isSmall={false} />);
        expect(
            screen.getByTestId(
                'card',
            )
        ).not.toHaveClass('card small_card');
    });

    test('should add a new small card', () => {
        render(<Card isSmall={true} />);
        expect(
            screen.getByTestId(
                'card',
            )
        ).toHaveClass('card small_card');
    });
});