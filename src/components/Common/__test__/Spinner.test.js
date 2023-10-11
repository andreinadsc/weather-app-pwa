import { render } from '@testing-library/react'
import Spinner from '../Spinner';

describe('Spinner Common Component', () => {
    test('should render the spinner correctly', () => {
        const { baseElement } = render(<Spinner />)

        expect(baseElement).toMatchSnapshot();
    });
});