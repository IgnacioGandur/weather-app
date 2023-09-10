import format from 'date-fns/format';

export function startClock() {
    setInterval(() => {
        const time = new Date().toLocaleTimeString();
        document.querySelector('[data-time]').innerHTML = time;
    }, 1000);
}

export function setDate() {
    const date = format(new Date(), 'EEEE, do MMMM, y');
    document.querySelector('[data-date]').textContent = date;
}
