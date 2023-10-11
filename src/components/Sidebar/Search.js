import { useCallback, useContext } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import useHttp from '../../hooks/http';
import classes from './Sidebar.module.css';
import WeatherContext from '../../context/weather-context';

const Search = ({ setNavIsOpen }) => {
    const { stateLocations, dispatchLocations } = useContext(WeatherContext);
    const { sendRequest } = useHttp();

    const loadOptions = async (inputValue) => {
        const citiesInfo = {
            options: []
        };

        await sendRequest(
            {
                url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=10000&limit=10&namePrefix=${inputValue}`,
                headers: {
                    "X-RapidAPI-Key": `${process.env.REACT_APP_RAPID_API_KEY}`,
                    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
                }
            },
            (jsonData) => {
                citiesInfo.options = jsonData.data.map((city) => {
                        return {
                            label: `${city.name},${city.countryCode}`,
                        };
                    });
            }
        );

        return citiesInfo;
    };

    const searchChangeHandler = useCallback(enteredData => {
        setNavIsOpen(false)
        dispatchLocations({ type: 'ADD_NEW', location: enteredData.label });
    }, [setNavIsOpen, dispatchLocations]);

    return (
        <div className={classes.search}>
            <AsyncPaginate
                closeMenuOnScroll={true}
                styles={{ padding: '4rem 1rem' }}
                placeholder='Search for cities'
                debounceTimeout={600}
                value={stateLocations.location}
                onChange={searchChangeHandler}
                loadOptions={loadOptions}
            />
        </div>
    );
};

export default Search;