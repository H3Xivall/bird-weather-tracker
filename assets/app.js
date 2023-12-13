// Bird and Weather Tracker App
// API Keys for OpenWeatherMap and eBird

// Variables
const weatherApiKey = 'fd4ad30d1c24c909806f019726e9f757';
const ebirdApiKey = '1g81tibr9t8k';
const weatherResults = [];
const birdResults = [];
const citySearch = document.querySelector('#city-zipcode');
const citySearchBtn = document.querySelector('#city-zipcode-btn');
const birdSearch = document.querySelector('#bird-name');
const birdSearchBtn = document.querySelector('#bird-btn');
var myHeaders = new Headers();
myHeaders.append("X-eBirdApiToken", ebirdApiKey);
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

// Operations
getAllBird();
// Functions
function getAreaLL() {
    let aName = citySearch.value.trim();
    console.log(aName);
    const geoCodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${aName}&limit=5&appid=${weatherApiKey}`;
    fetch(geoCodeUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                searchResults = data;
            });
        } else {
            console.log('Error: getAreaLL(): ' + response.statusText);
        };
    });
};
function getWeather(lat, lon) {
    const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;
    fetch(weatherUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                weatherResults = data;
            });
        } else {
            console.log('Error: getWeather(): ' + response.statusText);
        };
    });
};
function getBird(lat, lon) {
    const birdUrl = `https://api.ebird.org/v2/data/obs/geo/recent?lat=${lat}&lng=${lon}&sort=species`;
    fetch(birdUrl, requestOptions).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                birdResults = data;
            });
        } else {
            console.log('Error: getBird(): ' + response.statusText);
        };
    });
};
function getAllBird() {
    const birdUrl = `https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json`;
    fetch(birdUrl, requestOptions).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                birdResults = data;
            });
        } else {
            console.log('Error: getAllBird(): ' + response.statusText);
        };
    })
}