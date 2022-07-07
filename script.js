// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

var inputBox = document.getElementById('inputBox');
var cityName = document.getElementById('cityName');
var currentDate = document.getElementById('currentDate');
var temp = document.getElementById('temp');
var minMax = document.getElementById('minMax');
var weatherType = document.getElementById('weatherType');
var weatherDetails = document.querySelector('.weatherDetails')

var weatherIcon = document.querySelector('.weatherIcon');

const weatherApi = {
    key: 'Enter your own api key here from openweathermap.org',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
}


// listening for keypress on input box
inputBox.addEventListener('keypress', function(event)
{
    if (event.code === 'Enter')
    {
        getWeatherReport(inputBox.value);
        weatherDetails.style.display = 'block';
        inputBox.value = ''
        // console.log(inputBox.value);
    }
})



// get weather report
function getWeatherReport(cityName)
{
    fetch(`${weatherApi.baseUrl}?q=${cityName}&appid=${weatherApi.key}&units=metric`)
    .then(function(weather)
    {
        return weather.json();
    })
    .then(showWeatherReport);
}



// show weather report 
function showWeatherReport(weather)
{
    console.log(weather)
    if (weather.cod === '404')
    {
        cityName.innerHTML = `${weather.message}`
        cityName.style.fontSize = '30px'
        temp.innerHTML = ''
        minMax.innerHTML = ''
        weatherType.innerHTML = ''
        currentDate.innerHTML = ''
        weatherIcon.style.display = 'none'
    }

    else
    {
        cityName.innerHTML = `${weather.name}, ${weather.sys.country}`;
        temp.innerHTML = `${weather.main.temp}&deg;C`;
        minMax.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;
        weatherType.innerHTML = `${weather.weather[0].main}`
        var todayDate = new Date();
        currentDate.innerHTML = getCurrentDate(todayDate);

        const iconURL = "http://openweathermap.org/img/w/";
        weatherIcon.src = `${iconURL}${weather.weather[0].icon}.png`;
        weatherIcon.style.display = 'block';
    }
}



// get date 
function getCurrentDate(todayDate)
{
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let year = todayDate.getFullYear();
    let month = months[todayDate.getMonth()];
    let date = todayDate.getDate();
    let day = days[todayDate.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}










