const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAY = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thur.', 'Fri.', 'Sat.'];
export const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

export const getDayMonthFromDate = (dateString) => {
    const date = new Date(dateString.split(' ')[0]);
    const month = MONTHS[date.getMonth()];
    const day = date.getUTCDate();

    return day + ' ' + month;
};

export const getDate = (timezone, timeStamp = null) => {
    const d = timeStamp ? new Date(timeStamp * 1000) : new Date();
    const utc = d.getTime() + d.getTimezoneOffset() * 60000;
    const date = utc + (3600000 * (timezone / 3600));
    const [newDate, newTime] = new Date(date).toLocaleString('en-CA', { hour12: false }).split(',');
    const finalTime = newTime.split(' ')[1]

    return [newDate, finalTime.slice(0, 5)];
};

export const splitForecastData = (array, date) => {
    return array.list.reduce((acc, item) =>
        item.dt_txt.split(' ')[0] <= date
            ? (acc[0].push({
                id: item.dt,
                date: item.dt_txt,
                text: item.weather[0].main,
                icon: item.weather[0].icon,
                main: item.main,
                temp: Math.round(item.main.temp),
                wind: item.wind.speed,
                clouds: item.clouds.all,
                name: array.city.name,
                country: array.city.country,
                sunrise: array.city.sunrise,
                sunset: array.city.sunset,
                timezone: array.city.timezone
            }), acc)
            : (acc[1].push({ date: item.dt_txt.split(' ')[0], temp_min: Math.round(item.main.temp_min), temp_max: Math.round(item.main.temp_max), text: item.weather[0].main, icon: item.weather[0].icon }), acc),
        [[], []]);
}

export const getWeekForecastData = (array) => {
    let output = [];

    array.forEach((item) => {
        const foundIndx = output.findIndex(el => el.date === item.date);

        if (foundIndx >= 0) {
            const { temp_max, temp_min } = output[foundIndx];

            output[foundIndx] = {
                ...output[foundIndx],
                temp_max: temp_max < item.temp_max ? item.temp_max : temp_max,
                temp_min: temp_min > item.temp_min ? item.temp_min : temp_min
            };
        } else {
            const day = WEEKDAY[new Date(item.date).getDay()];

            output.push({ ...item, day: day });
        }

    });

    return output;
};