const apiKey = "5910790e573c9d054e516d0889383bfb"
const submitBtn = document.querySelector('#submitBtn')


function getFiveDay(search, key){
    let apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=`+search+`&appid=`+key;

    fetch(apiURL)
        .then(function(response){
        if(response.ok){
            return response.json();
        }
        })
        .then(function (data) {
            console.log(data)
        })


}



function getToday(search, key) {
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=`+search+`&appid=`+key;

    fetch(apiURL)
        .then(function(response){
            if(response.ok){
                return response.json();
            }
        })
        .then(function (data) {
            console.log(data)
        })
}



function submitHandler() {
    const citySearch = document.querySelector('#cityInput').value;

    getToday(citySearch, apiKey);
    getFiveDay(citySearch, apiKey);
}











submitBtn.addEventListener('click', submitHandler)