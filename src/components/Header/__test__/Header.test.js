import { render } from '@testing-library/react'
import Header from '../Header';

describe('Header', () => {
    test('should render the Header Component correctly', () => {
        const { baseElement } = render(<Header />);

        expect(baseElement).toMatchSnapshot();
    });
});