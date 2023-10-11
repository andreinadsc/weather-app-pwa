import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.5rem;
    line-height: 3rem;
    text-align: center;
`;

const Offline = () => {
    const [isOnline, setOnlineStatus] = useState(true);

    useEffect(() => {
        if (!navigator.onLine) setOnlineStatus(false);
        else setOnlineStatus(true);
    }, [setOnlineStatus]);

    return !isOnline &&
        <Container data-testid='offline'>
            You are currently offline. <br /> Access to the application might be limited.
        </Container>;
};

export default Offline;