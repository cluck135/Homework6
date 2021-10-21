//let url = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=a3ea5df50f7a2a8c7c090c87406c6487'
let search = document.querySelector(".search")
let entryText = document.querySelector("#city")
let searchHistory = document.querySelector(".searchHistory")
let city = document.querySelector("#cityName")
let currentTemp = document.querySelector("#currentTemp")
let currentWind = document.querySelector("#currentWind")
let currentHum = document.querySelector("#currentHum")
let currentUvi = document.querySelector("#currentUvi")


let history = []
let apiKey = 'a3ea5df50f7a2a8c7c090c87406c6487';

function getWeatherData(url){
fetch(url)
  .then(function (response) {
      console.log(response)
      if(response.ok){
          return response.json()
      }else{
          throw new Error(message || response.status)
      }
    
  }).then(function (data) {
    console.log(data);
    let weatherData = data
    
    let locationLat = weatherData.coord.lat;
    let locationLon = weatherData.coord.lon;
    currentWeather(locationLat, locationLon, weatherData)
  });

}

function currentWeather(lat, lon, data){
    let url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=hourly,minutely&appid=' + apiKey
    let location = data.name;
    fetch(url)
    .then(function (response) {
        console.log(response)
        if(response.ok){
            return response.json()
        }else{
            throw new Error(message || response.status)
        }
      
    }).then(function (data) {
      console.log(data);
      let weatherData = data
      let temp = weatherData.current.temp
      let wind = weatherData.current.wind_speed
      let hum = weatherData.current.humidity
      let uvi = weatherData.current.uvi
      city.textContent = location
      currentTemp.textContent = temp + '°F'
      currentWind.textContent = wind + 'MPH'
      currentHum.textContent = hum
      currentUvi.textContent = uvi
      if(uvi < 3){
        currentUvi.setAttribute("id", 'uviFavorable')
      }else if(uvi >= 3 && uvi < 6){
        currentUvi.setAttribute("id", 'uviModerate')
      }else {
        currentUvi.setAttribute("id", 'uviSevere')
      }
    });
    dailyWeather();
}


if(localStorage.getItem("entry") != null){
    let loadHistory = JSON.parse(localStorage.getItem("entry"))
    for(let i = 0; i<loadHistory.length; i++){
        let btn = document.createElement("button")
        btn.setAttribute("class", "btn btn-info")
        btn.innerText = loadHistory[i]
        searchHistory.appendChild(btn)
    }
}

function AddHistory(){
    let loadHistory = JSON.parse(localStorage.getItem("entry"))
    if(localStorage.getItem("entry") != null){
            let i = loadHistory.length
            let btn = document.createElement("button")
            btn.setAttribute("class", "btn btn-info")
            btn.innerText = loadHistory[i-1]
            searchHistory.appendChild(btn)
    }
}

function searchLog(event){
    event.preventDefault();
    let apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q='+ entryText.value + '&units=imperial&APPID=' + apiKey;
    if (entryText.value){
        let entry = entryText.value;
        if(localStorage.getItem("entry") != null){
            history = JSON.parse(localStorage.getItem("entry"))
            history.push(entry)
            localStorage.setItem("entry", JSON.stringify(history))
        }else{
            history.push(entry)
            localStorage.setItem("entry", JSON.stringify(history))
        }
    }
    AddHistory();
    getWeatherData(apiUrl);
}



search.addEventListener("submit", searchLog);