import { useEffect, useContext } from 'react';
import Card from './components/Common/Card';
import Header from './components/Header/Header';
import WeatherWrapper from './components/Weather/WeatherWrapper';
import Spinner from './components/Common/Spinner';
import Error from './components/Common/Error';
import Copyright from './components/Footer/Copyright';
import Sidebar from './components/Sidebar/Sidebar';
import Offline from './components/Common/Offline';
import useHttp from './hooks/http';
import WeatherContext from './context/weather-context';

const App = () => {
  const { isLoading, error, sendRequest } = useHttp();
  const { dispatchLocations, theme } = useContext(WeatherContext);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        sendRequest(
          {
            url: `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
          },
          (data) => dispatchLocations({ type: 'ADD_NEW', location: `${data.city},${data.countryCode}` })
        );
      });
    }
  }, [sendRequest, dispatchLocations]);

  useEffect(() => {
    document.documentElement.classList.add('theme-transition');
    document.documentElement.setAttribute("data-theme", theme);

    let timer = window.setTimeout(function () {
      document.documentElement.classList.remove('theme-transition')
    }, 1000);

    return () => clearTimeout(timer);
  }, [theme]);

  return (
    <>
      <Offline />
      <Card isSmall={false} >
        <Sidebar />
        <Header />
        <main>
          {!isLoading && !error && <WeatherWrapper />}
          {isLoading && <Spinner />}
          {error && <Error message='We were unable to access your location, so we have no data to display. Please select a location from the search bar to continue.' />}
          {!isLoading && <Copyright />}
        </main>
      </Card>
    </>
  );
};

export default App;