function createCard(hour) {
    const hourlyForecastContainer = document.querySelector('[data-hourly-forecast-container]');
    const card = document.createElement('div');
    const hourTime = hour.time.split(' ');
    card.classList.add('card');
    card.innerHTML = `
        <p class="hour">${hourTime[1]}</p>
        <div class="separator"></div>
        <div class="icon-container">
            <img src="${hour.condition.icon}">
        </div>
        <span class="temperature">${hour.temp_c} °C</span>
        <span class="condition">${hour.condition.text}</span>
    `;
    hourlyForecastContainer.appendChild(card);
}

export default async function setHourlyForecast(location) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=032078bb3e3e4d509ed23057230209&q=${location}&days=3&aqi=no&alerts=no`, { mode: 'cors' });
        const weather = await response.json();
        const hourlyForecastArray = weather.forecast.forecastday[0].hour;
        document.querySelector('[data-hourly-forecast-container]').innerHTML = '';
        hourlyForecastArray.forEach((hour) => {
            createCard(hour);
        });
    } catch (error) {
        console.log(error);
    }
}
