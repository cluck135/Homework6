let search = document.querySelector(".search")
let entryText = document.querySelector("#city")
let searchHistory = document.querySelector(".searchHistory")
let reSearch = document.querySelector("#history")
let city = document.querySelector("#cityName")
let currentTemp = document.querySelector("#currentTemp")
let currentWind = document.querySelector("#currentWind")
let currentHum = document.querySelector("#currentHum")
let currentUvi = document.querySelector("#currentUvi")
let fiveDayForecast = document.getElementsByClassName("fiveDayForecast")
let date1 = document.querySelector("#date1")
let icon1 = document.querySelector("#icon1")
let temp1 = document.querySelector("#temp1")
let wind1 = document.querySelector("#wind1")
let hum1 = document.querySelector("#hum1")
let date2 = document.querySelector("#date2")
let icon2 = document.querySelector("#icon2")
let temp2 = document.querySelector("#temp2")
let wind2 = document.querySelector("#wind2")
let hum2 = document.querySelector("#hum2")
let date3 = document.querySelector("#date3")
let icon3 = document.querySelector("#icon3")
let temp3 = document.querySelector("#temp3")
let wind3 = document.querySelector("#wind3")
let hum3 = document.querySelector("#hum3")
let date4 = document.querySelector("#date4")
let icon4 = document.querySelector("#icon4")
let temp4 = document.querySelector("#temp4")
let wind4 = document.querySelector("#wind4")
let hum4 = document.querySelector("#hum4")
let date5 = document.querySelector("#date5")
let icon5 = document.querySelector("#icon5")
let temp5 = document.querySelector("#temp5")
let wind5 = document.querySelector("#wind5")
let hum5 = document.querySelector("#hum5")

if (date1.value == null) {
    fiveDayForecast[0].style.display = "none";
}


let history = []
// my API key
let apiKey = 'a3ea5df50f7a2a8c7c090c87406c6487';
// gets the data from the api and sends the lattitude and longitude along with the data to the current weather function 
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
// pulls the weather data from the lattitude and longitude that was sent into the function
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
      // sets all the data for the current weather to the dashboard
      let weatherData = data
      let temp = weatherData.current.temp
      let wind = weatherData.current.wind_speed
      let hum = weatherData.current.humidity
      let uvi = weatherData.current.uvi
      let iconPic = weatherData.current.weather[0].icon  
      let iconUrl = "https://openweathermap.org/img/wn/" + iconPic + ".png"
      let img = document.createElement("img")
      img.setAttribute("src", iconUrl)
      city.textContent = location
      city.appendChild(img) 
      currentTemp.textContent = temp + '°F'
      currentWind.textContent = wind + ' MPH'
      currentHum.textContent = hum
      currentUvi.textContent = uvi
        //sets the correct color for the UVI rating
      if(uvi < 3){
        currentUvi.setAttribute("id", 'uviFavorable')
      }else if(uvi >= 3 && uvi < 6){
        currentUvi.setAttribute("id", 'uviModerate')
      }else {
        currentUvi.setAttribute("id", 'uviSevere')
      }
      // daily weather is next to be displayed, data is sent to it to be used
      dailyWeather(weatherData);

    });
}

function dailyWeather(weatherData) {
    fiveDayForecast[0].style.display = "flex";
    let days = weatherData.daily;
    for(let i = 1; i<6; i++){

        let temp = days[i].temp.day
        let icon = days[i].weather[0].icon
        let iconUrl = "https://openweathermap.org/img/wn/" + icon + ".png"
        let hum = days[i].humidity
        let wind = days[i].wind_speed
        // determines the date of the card to be displayed next
        let unix = days[i].dt
        let milliseconds = unix * 1000
        let date = new Date(milliseconds)
        let dateFormat = date.toLocaleString("en-US").split(',')[0]
        // each case is a different card on the dashboard for data to be displayed on
        switch(i){
            case 1: 
                date1.textContent = dateFormat
                let img1 = document.createElement("img")
                img1.setAttribute("src", iconUrl)
                date1.appendChild(img1) 
                temp1.textContent = 'Temperature: ' + temp + '°F'
                wind1.textContent = 'Wind: ' + wind + '  MPH'
                hum1.textContent = 'Humidity: ' + hum + '%'
                break;
            case 2:
                date2.textContent = dateFormat
                let img2 = document.createElement("img")
                img2.setAttribute("src", iconUrl)
                date2.appendChild(img2) 
                temp2.textContent = 'Temperature: ' + temp + '°F'
                wind2.textContent = 'Wind: ' + wind + ' MPH'
                hum2.textContent = 'Humidity: ' + hum + '%'
                break;
            case 3:
                date3.textContent = dateFormat
                let img3 = document.createElement("img")
                img3.setAttribute("src", iconUrl)
                date3.appendChild(img3) 
                temp3.textContent = 'Temperature: ' + temp + '°F'
                wind3.textContent = 'Wind: ' + wind + ' MPH'
                hum3.textContent = 'Humidity: ' + hum + '%'
                break;
            case 4:
                date4.textContent = dateFormat
                let img4 = document.createElement("img")
                img4.setAttribute("src", iconUrl)
                date4.appendChild(img4) 
                temp4.textContent = 'Temperature: ' + temp + '°F'
                wind4.textContent = 'Wind: ' + wind + ' MPH'
                hum4.textContent = 'Humidity: ' + hum + '%'
                break;
            case 5:
                date5.textContent = dateFormat
                let img5 = document.createElement("img")
                img5.setAttribute("src", iconUrl)
                date5.appendChild(img5) 
                temp5.textContent = 'Temperature: ' + temp + '°F'
                wind5.textContent = 'Wind: ' + wind + ' MPH'
                hum5.textContent = 'Humidity: ' + hum + '%'
                break;
        }
    }
}
// checks if there is any history from local storage to be loaded after refresh 
if(localStorage.getItem("entry") != null){
    let loadHistory = JSON.parse(localStorage.getItem("entry"))
    for(let i = 0; i<loadHistory.length; i++){
        let btn = document.createElement("button")
        btn.setAttribute("class", "btn btn-info")
        btn.innerText = loadHistory[i]
        searchHistory.appendChild(btn)
    }
}
// adds history to the left side of dashboard
function AddHistory(check){
    if(check == 1){
    let loadHistory = JSON.parse(localStorage.getItem("entry"))
    if(localStorage.getItem("entry") != null){
            let i = loadHistory.length
            let btn = document.createElement("button")
            btn.setAttribute("class", "btn btn-info reSearch")
            btn.innerText = loadHistory[i-1]
            searchHistory.appendChild(btn)
    }
}
}
// sets what city is to be serched in the api
function searchLog(event){
    event.preventDefault();
    let check = 1; // used to check if the entry is a repeating city so it doesnt log the same history twice
    let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+ entryText.value + '&units=imperial&APPID=' + apiKey;
    if (entryText.value){
        let entry = entryText.value;
        if(localStorage.getItem("entry") != null){
            history = JSON.parse(localStorage.getItem("entry"))
            for(let i = 0; i<history.length; i++){
                if(entry == history[i]){
                    check = 0;
                }
            }
            if(check == 1){
                history.push(entry)
                localStorage.setItem("entry", JSON.stringify(history))
            }
        }else{
            history.push(entry)
            localStorage.setItem("entry", JSON.stringify(history))
        }
    }
    //check is sent to history to determine if the entry has been added or not yet, if it has it will skip the code inside
    AddHistory(check);
    // url is sent to be used to pull data from
    getWeatherData(apiUrl);
}
    

// event listener for the history buttons on the side of the screen
reSearch.addEventListener("click", function (event){
        let searchHist = event.target.localName;
        let targetData = event.target
        if(searchHist == 'button'){
            let newSearch = targetData.innerText;
            let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+ newSearch + '&units=imperial&APPID=' + apiKey;
            getWeatherData(apiUrl);
        }
})

search.addEventListener("submit", searchLog);