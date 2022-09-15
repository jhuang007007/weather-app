let API_KEY = '44b6df905c1664b3157f43e6ed769554';
const sky = document.querySelector('.sky');
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
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=${API_KEY}`, {mode: 'cors'});
    const weatherData = await response.json();
    const newWeather = await processJSON(weatherData);
    return newWeather;
  } catch (error) {
    console.log(error);
  }
}

//Write the functions that process the JSON data you’re getting from the API and return an object with only the data you require for your app.
async function processJSON(data) {
  try {
    const weatherData = {
      sky: await data['weather'][0]['description'],
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

//get user location from form
window.onload = function() {
  locationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const weatherData = await getWeather(locationInput.value);
    locationInput.value = '';
    sky.textContent = weatherData.sky;
    country.textContent = weatherData.country;
    city.textContent = weatherData.city;
    temp.textContent = weatherData.temp;
    tempFeelsLike.textContent = weatherData.tempFeelsLike;
    wind.textContent = weatherData.wind;
    humidity.textContent = weatherData.humidity;
  });
}

