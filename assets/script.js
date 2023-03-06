const apiKey = "5910790e573c9d054e516d0889383bfb"
const submitBtn = document.querySelector('#submitBtn')


function renderToday(data){
    const cityTitle = document.querySelector(`#searchDisplayTitle`);
    const weatherEmoji = document.querySelector(`#weatherEmoji`);
    const temp = document.querySelector(`#temp`);
    const wind = document.querySelector(`#wind`);
    const humidity = document.querySelector(`#humidity`);

    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const date = `(`+month+`/`+day+`/`+year+`)`;

    cityTitle.innerHTML = data.name+` `+date;
    weatherEmoji.setAttribute(`src`, `https://openweathermap.org/img/wn/`+data.weather[0].icon+`.png`);
    temp.innerHTML = `Temp (Fahrenheit): `+JSON.stringify(data.main.temp);
    wind.innerHTML = `Wind (mph): `+data.wind.speed;
    humidity.innerHTML = 'Humidity (%): '+JSON.stringify(data.main.humidity);
}


function renderFive(data){
    const forecastTitle = document.querySelector(`#forecastTitle`);

    for(let i = 0; i < 5; i++){
        const cityTitle = document.querySelector(`#searchDisplayTitle`+i);
        const weatherEmoji = document.querySelector(`#weatherEmoji`+i);
        const temp = document.querySelector(`#temp`+i);
        const wind = document.querySelector(`#wind`+i);
        const humidity = document.querySelector(`#humidity`+i);

        const dateObj = new Date();
        const month = dateObj.getUTCMonth() + 1;
        const day = dateObj.getUTCDate() + 1 + i;
        const year = dateObj.getUTCFullYear();
        const date = `(`+month+`/`+day+`/`+year+`)`;

        cityTitle.innerHTML = data.city.name+` `+date;
        weatherEmoji.setAttribute(`src`, `https://openweathermap.org/img/wn/`+data.list[i*8].weather[0].icon+`.png`);
        temp.innerHTML = `Temp (Fahrenheit): `+JSON.stringify(data.list[i*8].main.temp);
        wind.innerHTML = `Wind (mph): `+data.list[i*8].wind.speed;
        humidity.innerHTML = 'Humidity (%): '+JSON.stringify(data.list[i*8].main.humidity);
    }
}



function getFiveDay(search, key){
    let apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=`+search+`&appid=`+key+`&units=imperial`;

    fetch(apiURL)
        .then(response => response.json())
        .then(response => renderFive(response))
        .catch(err => console.error(err));
}



function getToday(search, key) {
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=`+search+`&appid=`+key+`&units=imperial`;

    fetch(apiURL)
        .then(response => response.json())
        .then(response => renderToday(response))
        .catch(err => console.error(err));
}



function submitHandler() {
    const citySearch = document.querySelector('#cityInput').value;

    getToday(citySearch, apiKey);
    getFiveDay(citySearch, apiKey);
}











submitBtn.addEventListener('click', submitHandler)