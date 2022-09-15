const API_KEY = '44b6df905c1664b3157f43e6ed769554';
const sky = document.querySelector('.sky');
const skyImage = document.querySelector('.sky-image')
const city = document.querySelector('.city');
const country = document.querySelector('.country');
const temp = document.querySelector('.temp');
const tempFeelsLike = document.querySelector('.temp-feels-like');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const locationForm = document.querySelector('#location-form');
const locationInput = document.querySelector('#location');

async function getWeather(userLocation) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=${API_KEY}`, {mode: 'cors'});
    const weatherData = await response.json();
    const processedWeatherData = await processJSON(weatherData);
    return processedWeatherData;
  } catch (error) {
    console.log(error);
  }
}

//process the JSON data from the API and return an object with only the data required.
async function processJSON(data) {
  try {
    const weatherData = {
      sky: await data['weather'][0]['description'],
      skyImage: await data['weather'][0]['icon'],
      country: await data.sys.country,
      city: await data.name,
      temp: await data.main.temp,
      tempFeelsLike: await data.main.feels_like,
      wind: await data.wind.speed,
      humidity: await data.main.humidity,
    };
    return weatherData;
  } catch (error) {
    console.log(error);
  }
}

function renderWeatherDataToDOM(weatherData) {
  let temperature = weatherData.temp;
  let temperatureFeelsLike = weatherData.tempFeelsLike;
  if (weatherData.country === 'US') {
    temperature = kelvinToFahrenheit(temperature)
    temperatureFeelsLike = kelvinToFahrenheit(temperatureFeelsLike)
  } else {
    temperature = kelvinToCelsius(temperature)
    temperatureFeelsLike = kelvinToCelsius(temperatureFeelsLike)
  }
  locationInput.value = '';
  sky.textContent = weatherData.sky;
  skyImage.src = `https://openweathermap.org/img/wn/${weatherData.skyImage}@2x.png`;
  country.textContent = weatherData.country;
  city.textContent = weatherData.city;
  temp.textContent = temperature;
  tempFeelsLike.textContent = `Feels like ${temperatureFeelsLike}`;
  wind.textContent = `wind: ${weatherData.wind} m/s`;
  humidity.textContent = `humidity: ${weatherData.humidity}%`;
}

function kelvinToFahrenheit(k) {
  const f = Math.round(1.8*(k-273) + 32) + '\u00B0F';
  return f;
}

function kelvinToCelsius(k) {
  const c = Math.round(k - 273.15) + '\u00B0C';;
  return c;
}

//retrieve user location from form
window.onload = function() {
  locationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const weatherData = await getWeather(locationInput.value);
    renderWeatherDataToDOM(weatherData);
  });
}
