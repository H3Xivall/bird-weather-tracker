// Bird and Weather Tracker App
// API Keys for OpenWeatherMap and eBird
const weatherApiKey = 'h3xcafe, h3xivall@gmail.com';
const ebirdApiKey = '1g81tibr9t8k';

// Variables

// Operations

// Functions
function getWeather(location) {
    $.ajax({
        url: '',
        dataType: 'json',
        success: function(data) {
            console.log(data);
            const currentPeriod = data.properties.periods[0];
            $('#weather-description').text(currentPeriod.detailedForecast);
            $('#weather-icon').attr('src', currentPeriod.icon);
            $('#weather-temp').text(currentPeriod.temperature);
            $('#weather-temp-unit').text(currentPeriod.temperatureUnit);
        },
        error: function(error) {
            console.log(error);
        }
    });
};
function getBirds(location) {
    $.ajax({
        url: '',
        dataType: 'json',
        success: function(data) {
            console.log(data);
            $('#bird-list').empty();
            for (const observation of data) {
                $('#bird-list').append(`<li>${observation.comName}</li>`);
                $('#species').append('<li>${observation.speciesCode}</li>');
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
}