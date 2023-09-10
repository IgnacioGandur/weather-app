import './css/styles.css';
import { startClock, setDate } from './js/date-and-clock';
import setHourlyForecast from './js/set-hourly-weather';
import setWeatherInfo from './js/set-weather-info';

// Set local storage to save location.
(function () {
    // If local storage found call functions with location from local storage.
    if (localStorage.getItem('location')) {
        const location = localStorage.getItem('location');
        setWeatherInfo(location);
        setHourlyForecast(location);
    }
}());
const searchLocationForm = document.querySelector('[data-location-form]');
searchLocationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = document.querySelector('#location').value;
    if (location === '') {
        return;
    }
    localStorage.setItem('location', location);
    setHourlyForecast(location);
    setWeatherInfo(location);
    document.querySelector('#location').value = '';
});

window.addEventListener('load', () => {
    startClock();
    setDate();
});

// Scroll horizontally the hourly forecast section.
const scrollContainer = document.querySelector('.hourly-forecast-container');

scrollContainer.addEventListener('wheel', (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
});
