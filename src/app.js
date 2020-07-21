function formateDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let dayIndex = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[dayIndex];
    return `${day} ${hours}:${minutes}`;
  }
  
  let h3 = document.querySelector(".time-date");
  let currentTime = new Date();
  
  h3.innerHTML = formateDate(currentTime);

function citySearch(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-input");

  let headlineCity = document.querySelector("#headline-city");
  if (inputCity.value) {
    headlineCity.innerHTML = `${inputCity.value}`;

    let apiKey = "f1c77eff562f2c8461f69c753ac36d7d";
    let city = headlineCity.innerHTML;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

    function showTemperature(response) {
      headlineCity.innerHTML = `${response.data.name}, ${
        response.data.sys.country
      }`;
      let temperature = Math.round(response.data.main.temp);
      let temperatureElement = document.querySelector("#temperature-numbers");
      temperatureElement.innerHTML = `${temperature}`;
      let maxTemp = document.querySelector("#max");
      maxTemp.innerHTML = Math.round(response.data.main.temp_max);
      let minTemp = document.querySelector("#min");
      minTemp.innerHTML = Math.round(response.data.main.temp_min);
      let humidity = document.querySelector("#humidity");
      humidity.innerHTML = `${response.data.main.humidity}`;
      let windSpeed = document.querySelector("#wind");
      windSpeed.innerHTML = `${Math.round(response.data.wind.speed)}`;
      let iconElement = document.querySelector("#icon");
      iconElement. setAttribute(
          "src",
          `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      )
      let descriptionElement = document.querySelector("#description");
      descriptionElement.innerHTML = response.data.weather[0].description;
    }
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  } else {
    inputCity.innerHTML = null;
    alert("Please enter a city");
  }
}
let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", citySearch);

function showTemp(event) {
  event.preventDefault();
  let tempChange = document.querySelector("#temperature-numbers");
  let temperature = tempChange.innerHTML;
  temperature = Number(temperature);
  tempChange.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
let tempFah = document.querySelector("#fahrenheit");
tempFah.addEventListener("click", showTemp);

function backTemp(event) {
  event.preventDefault();
  let originalTemp = document.querySelector("#temperature-numbers");
  let temperature = originalTemp.innerHTML;
  temperature = Number(temperature);
  originalTemp.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}
let tempCel = document.querySelector("#celsius");
tempCel.addEventListener("click", backTemp);
let apiKey = "f1c77eff562f2c8461f69c753ac36d7d";

function showCity(response) {
 let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature-numbers");
  temperatureElement.innerHTML = `${temperature}`;
  let maxTemp = document.querySelector("#max");
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  let minTemp = document.querySelector("#min");
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}`;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)}`;
  let iconElement = document.querySelector("#icon");
      iconElement. setAttribute(
          "src",
          `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      )
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showCity);
}
function dispayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;
  
    for (let index = 0; index < 5; index++) {
      forecast = response.data.list[index];
      forecastElement.innerHTML += `
          <div class="col-2">
              <h2>
              ${formatHours(forecast.dt * 1000)}
              </h2>
              <img 
              src="https://openweathermap.org/img/wn/${
                forecast.weather[0].icon
              }@2x.png" alt="" />
              <div class="weather-forecast-temperature">
                <strong>
                ${Math.round(forecast.main.temp_max)}º
                </strong> 
                ${Math.round(forecast.main.temp_min)}º
              </div>
            </div>`;
    }
  }
  