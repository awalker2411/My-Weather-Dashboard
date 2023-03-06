//declaring global variables
const apiKey = "5910790e573c9d054e516d0889383bfb"
const submitBtn = document.querySelector('#submitBtn')
let cityHistory = localStorage.getItem('cityHistory')||0;

//takes the fetch call from weather api and renders today's weather
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

//takes the fetch call from 5-day weather forecast api and renders in 5 seperate containers
function renderFive(data){

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


//contacting 5-day forecast api with a get call
function getFiveDay(search, key){
    let apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=`+search+`&appid=`+key+`&units=imperial`;

    fetch(apiURL)
        .then(response => response.json())
        .then(response => renderFive(response))
        .catch(err => console.error(err));
}


//contacting current weather forecast api with a get call
function getToday(search, key) {
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=`+search+`&appid=`+key+`&units=imperial`;

    fetch(apiURL)
        .then(response => response.json())
        .then(response => renderToday(response))
        .catch(err => console.error(err));
}

//handles the click event on a history button
function historyHandler(thisBtn) {
    const btnID = thisBtn.innerHTML;
    getToday(btnID, apiKey);
    getFiveDay(btnID, apiKey);
}

//creates a history button when the user searches for a city's weather forecast
function createHistory(search){
    const historyTitle = document.querySelector(`#historyTitle`);
    const doubleCheck = document.querySelector(`#`+search);

    if(doubleCheck){
        return;
    }else{
        const newCity = document.createElement(`button`);
        newCity.setAttribute('id', search);
        newCity.classList.add(`btn`);
        newCity.classList.add(`btn-info`);
        newCity.classList.add(`searchHistory`);
        newCity.innerHTML = search;
        historyTitle.appendChild(newCity);
    }
}



//handles when a user clicks the submit button to search for a city's weather forecast
function submitHandler() {
    const citySearch = document.querySelector('#cityInput').value;
    let grabHistory = JSON.parse(localStorage.getItem('cityHistory'));

    if(grabHistory === null){
        grabHistory = [];
    }
    
    grabHistory.push(citySearch);
    localStorage.setItem('cityHistory', JSON.stringify(grabHistory));


    createHistory(citySearch);
    getToday(citySearch, apiKey);
    getFiveDay(citySearch, apiKey);
}




//adding an event listener to check local storage for previous user searches
document.addEventListener("DOMContentLoaded", function() {
    let grabHistory = JSON.parse(localStorage.getItem('cityHistory'));

    if(grabHistory === null){
        return;
    }else{
        for(let i=0;i<grabHistory.length;i++){
            createHistory(grabHistory[i]);
        }
    }
});

//adding an event listener for when a user searches a city's weather forecast
submitBtn.addEventListener('click', submitHandler);

//adds event listeners to history buttons
document.addEventListener("click", function(thisBtn){
    const clickedBtn = thisBtn.target.closest(".searchHistory");
    if(clickedBtn){
        historyHandler(clickedBtn);
    }
});