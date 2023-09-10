/* eslint-disable max-len */
import { addDays, format, parseISO } from 'date-fns';
import setHourlyForecast from './set-hourly-weather';

function setNext3DaysForecast() {
    // References to dom elements.
    const nextDay = document.querySelector('[data-tomorrow-date]');
    const dayAfterTomorrow = document.querySelector('[data-day-after-tomorrow-date]');
    const twoDaysLater = document.querySelector('[data-2-days-date]');
    // Get the next three days.
    const todaysDate = new Date();
    const threeDaysLater = addDays(todaysDate, 3);
    const dateRange = [];
    for (let date = todaysDate; date <= threeDaysLater; date = addDays(date, 1)) {
        dateRange.push(date);
    }
    const formattedDateRange = dateRange.map((date) => format(date, 'EEEE, LLLL do'));
    formattedDateRange.shift();
    const [dayOne, dayTwo, dayThree] = formattedDateRange;
    nextDay.textContent = dayOne;
    dayAfterTomorrow.textContent = dayTwo;
    twoDaysLater.textContent = dayThree;
}

function handleError(error) {
    // Show modal on error.
    // Get dom elements.
    const modal = document.querySelector('[data-modal]');
    const closeButton = document.querySelector('[data-close-modal]');
    const errorPara = document.querySelector('[data-error-message]');
    // Show modal on error.
    modal.style.display = 'block';
    // Hide modal when click on x button.
    closeButton.onclick = function () {
        modal.style.display = 'none';
    };
    // Hide modal when clicking outside the modal.
    window.onclick = function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    };

    errorPara.textContent = `An error has occurred: ${error.message}`;
}

export default async function setWeatherInfo(location) {
    try {
        // Fetch weather info.
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=032078bb3e3e4d509ed23057230209&q=${location}&days=3&aqi=no&alerts=no`, { mode: 'cors' });
        const weather = await response.json();
        if (weather.error) {
            handleError(weather.error);
            setWeatherInfo('argentina');
            localStorage.setItem('location', 'argentina');
            setHourlyForecast('argentina');
            return;
        }
        // Create references to dom elements.
        const country = document.querySelector('[data-location-country]');
        const regionName = document.querySelector('[data-location-name]');
        const region = document.querySelector('[data-location-region]');
        const weatherCondition = document.querySelector('[data-weather-condition]');
        const weatherTemperature = document.querySelector('[data-weather-temperature]');
        const weatherWindSpeed = document.querySelector('[data-wind-speed]');
        const weatherFeelsLikeTemp = document.querySelector('[data-feels-like-temp]');
        const weatherHumidity = document.querySelector('[data-humidity]');
        const weatherLastUpdate = document.querySelector('[data-last-update]');
        // Tomorrow info.
        const tomorrowWeatherIcon = document.querySelector('[data-tomorrow-weather-icon]');
        const tomorrowWeatherCondition = document.querySelector('[data-tomorrow-weather-condition]');
        const tomorrowWeatherMinTemp = document.querySelector('[data-tomorrow-min-temp]');
        const tomorrowWeatherMaxTemp = document.querySelector('[data-tomorrow-max-temp]');
        // Day after tomorrow info.
        const dayAfterTomorrowWeatherIcon = document.querySelector('[data-day-after-tomorrow-weather-icon]');
        const dayAfterTomorrowWeatherCondition = document.querySelector('[data-day-after-tomorrow-weather-condition]');
        const dayAfterTomorrowWeatherMinTemp = document.querySelector('[data-day-after-tomorrow-min-temp]');
        const dayAfterTomorrowWeatherMaxTemp = document.querySelector('[data-day-after-tomorrow-max-temp]');
        // Two days later.
        const twoDaysWeatherIcon = document.querySelector('[data-2-days-weather-icon]');
        const twoDaysWeatherCondition = document.querySelector('[data-2-days-weather-condition]');
        const twoDaysMinTemp = document.querySelector('[data-2-days-min-temp]');
        const twoDaysMaxTemp = document.querySelector('[data-2-days-max-temp]');
        // Append info to dom elements.
        country.textContent = weather.location.country;
        regionName.textContent = weather.location.name;
        region.textContent = weather.location.region;
        weatherCondition.textContent = weather.current.condition.text;
        weatherTemperature.textContent = `${weather.current.temp_c}° C`;
        weatherWindSpeed.textContent = weather.current.wind_kph;
        weatherFeelsLikeTemp.textContent = `${weather.current.feelslike_c}° C`;
        weatherHumidity.textContent = weather.current.humidity;
        // Format last updated time.
        const lastUpdateArr = weather.current.last_updated.split(' ');
        const newFormat = format(parseISO(lastUpdateArr[0]), 'EEEE, LLLL do');
        const finalFormat = `${newFormat} at ${lastUpdateArr[1]}`;
        weatherLastUpdate.textContent = finalFormat;

        // Tomorrow.
        tomorrowWeatherIcon.src = weather.forecast.forecastday[0].day.condition.icon;
        tomorrowWeatherCondition.textContent = weather.forecast.forecastday[0].day.condition.text;
        tomorrowWeatherMinTemp.textContent = `${Math.floor(weather.forecast.forecastday[0].day.mintemp_c)}° C`;
        tomorrowWeatherMaxTemp.textContent = `${Math.floor(weather.forecast.forecastday[0].day.maxtemp_c)}° C`;
        // Day after tomorrow.
        dayAfterTomorrowWeatherIcon.src = weather.forecast.forecastday[1].day.condition.icon;
        dayAfterTomorrowWeatherCondition.textContent = weather.forecast.forecastday[1].day.condition.text;
        dayAfterTomorrowWeatherMinTemp.textContent = `${Math.floor(weather.forecast.forecastday[1].day.mintemp_c)}° C`;
        dayAfterTomorrowWeatherMaxTemp.textContent = `${Math.floor(weather.forecast.forecastday[1].day.maxtemp_c)}° C`;
        // Two days later.
        twoDaysWeatherIcon.src = weather.forecast.forecastday[2].day.condition.icon;
        twoDaysWeatherCondition.textContent = weather.forecast.forecastday[2].day.condition.text;
        twoDaysMinTemp.textContent = `${Math.floor(weather.forecast.forecastday[2].day.mintemp_c)}° C`;
        twoDaysMaxTemp.textContent = `${Math.floor(weather.forecast.forecastday[2].day.maxtemp_c)}° C`;
        setNext3DaysForecast();
    } catch (error) {
        console.log(error);
    }
}
