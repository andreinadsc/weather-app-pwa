import { useContext } from 'react';
import { AiFillDelete } from 'react-icons/ai'
import WeatherContext from '../../context/weather-context';
import Title from '../Common/Title';
import classes from './SavedLocations.module.css';

const SavedLocations = ({ setNavIsOpen }) => {
    const { stateLocations: { savedLocations }, dispatchLocations } = useContext(WeatherContext);

    const removeSavedLocation = (event) => dispatchLocations({ type: 'REMOVE_SAVED', location: event.currentTarget.parentElement.id });

    const openSavedLocations = (event) => {
        dispatchLocations({ type: 'OPEN_SAVED', location: event.currentTarget.parentElement.id });
        setNavIsOpen(false);
    };

    return (
        <>
            {
                savedLocations.length > 0 &&
                <>
                    <Title title='Recent cities' isSubtitle={true} />
                    <ul aria-label='saved-locations'>
                        {
                            savedLocations.map(location => (
                                <li className={classes.item} key={location} id={location}>
                                    <button onClick={openSavedLocations} className={classes.button}>
                                        {location}
                                    </button>
                                    <button className={`${classes.bin} ${classes.button}`} onClick={removeSavedLocation}>
                                        <AiFillDelete />
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                </>
            }
        </>
    );
}

export default SavedLocations;