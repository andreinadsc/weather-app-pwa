import Card from './Card';
import classes from './Error.module.css';
import { PiWarningCircleFill } from 'react-icons/pi';

const Error = ({ message }) => {
    return (
        <Card>
            <div className={classes.oops}><PiWarningCircleFill /> Oops!</div>
            {message && <div className={classes['error-message']}>{message}</div>}
        </Card>
    );
};

export default Error;