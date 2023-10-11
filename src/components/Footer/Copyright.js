import styled from 'styled-components';
import Logo from '../../images/openweather.webp';

const Container = styled.footer`
    position: relative;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.5rem;
    > a {
        padding-left: 1rem;
    }
`;

const Copyright = () => {
    return (
        <Container>
            <span>Data provided in part by</span>
            <a href='https://openweathermap.org/'>
                <img src={Logo} alt='openweather' width={60} height={30} />
            </a>
        </Container>
    );
};

export default Copyright;