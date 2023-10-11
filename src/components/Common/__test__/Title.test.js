import { render } from '@testing-library/react'
import Title from '../Title';

describe('Title Common Component', () => {
    test('should render header title correctly', () => {
        const { baseElement } = render(<Title title='Header' />)

        expect(baseElement).toMatchSnapshot();
    });

    test('should render subtitle correctly', () => {
        const { baseElement } = render(<Title title='Subtitle' isSubtitle={true} />)

        expect(baseElement).toMatchSnapshot();
    });
});