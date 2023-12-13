// Bird and Weather Tracker App
// API Keys for OpenWeatherMap and eBird

// Variables
const weatherApiKey = 'fd4ad30d1c24c909806f019726e9f757';
const ebirdApiKey = '1g81tibr9t8k';
let weatherResults = [];
let birdResults = [];
const citySearch = document.querySelector('#city-zipcode');
const citySearchBtn = document.querySelector('#city-zipcode-btn');
const birdSearch = document.querySelector('#bird-name');
const birdSearchBtn = document.querySelector('#bird-btn');
let allBirdResults = [];
let searchResults = [];
let cityResults = [];
let history = JSON.parse(localStorage.getItem('history')) || [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
var myHeaders = new Headers();
myHeaders.append("X-eBirdApiToken", ebirdApiKey);
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

// Operations
citySearchBtn.addEventListener('click', getAreaLL);
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
                for (let i = 0; i < searchResults.length; i++) {
                    const areaName = document.querySelector('#birdResult');
                    let tempName = [];
                    tempName = searchResults[i];
                    const areaNameEl = document.createElement('li');
                    areaNameEl.textContent = `${searchResults[i].name}, ${searchResults[i].state}, ${searchResults[i].country}`;
                    areaNameEl.setAttribute('data-lat', searchResults[i].lat);
                    areaNameEl.setAttribute('data-lon', searchResults[i].lon);
                    areaNameEl.setAttribute('data-name', searchResults[i].name);
                    areaNameEl.setAttribute('data-state', searchResults[i].state);
                    areaNameEl.setAttribute('data-country', searchResults[i].country);
                    areaNameEl.addEventListener('click', function() {
                        getWeather(this.getAttribute('data-lat'), this.getAttribute('data-lon'));
                        getBird(this.getAttribute('data-lat'), this.getAttribute('data-lon'));
                        history.push(tempName);
                        localStorage.setItem('history', JSON.stringify(history));
                        areaName.innerHTML = '';
                    });
                    areaName.appendChild(areaNameEl);
                };
            });
        } else {
            console.log('Error: getAreaLL(): ' + response.statusText);
        };
    });
};
function getWeather(lat, lon) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;
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
    const birdUrl = `https://api.ebird.org/v2/data/obs/geo/recent?lat=${lat}&lng=${lon}&hotspot=true&maxResults=10&sort=species`;
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
                allBirdResults = data;
            });
        } else {
            console.log('Error: getAllBird(): ' + response.statusText);
        };
    });
};
