var APIKey = "060b3b44ee04f00deac7c9f2a67bbd9d";
var cityName = "Atlanta";

var searchElem = document.querySelector('#search-form');
var historyElem = document.querySelector('#prev-search');
var weatherObj;
var forecastObj; 
var weatherStorage;

  function dispForecast () {
    // console.log("in dispForecast, city is:", forecastObj.city.name);

    //access and clear current forecast element
    var forecastElem = document.getElementById("forecast-elem");
    forecastElem.textContent = "";

    //create Title element
    var forecastTitle = document.createElement('p');
    forecastTitle.classList.add("mt-2");
    forecastTitle.textContent = "5-Day Forecast:";
    forecastElem.append(forecastTitle);

    //loop through list
    for (var i=0; i<forecastObj.list.length; i++) {
        var curListTime = forecastObj.list[i].dt_txt;
        curListTime = curListTime.split(' ')[1];
        // console.log("current list time:", curListTime);
        if (curListTime === "09:00:00") {
            //create forecast box
            var curForecastBox = document.createElement('div');
            curForecastBox.classList.add("col-md-2", "forecast", "p-1", "m-1", "small");

            //create date element
            var curForecastDate = document.createElement('p');
            curForecastDate.classList.add("small", "m-2");

            //calculate forecast date from unix UTC
            let unixDT = forecastObj.list[i].dt;
            var date = new Date(unixDT * 1000);
            var month = (date.getMonth() + 1);
            var day = date.getDate();
            var year = date.getFullYear();
            var curDate = `(${month}/${day}/${year})`;
            curForecastDate.textContent = curDate;

            //create icon element
            let curIcon = forecastObj.list[i].weather[0].icon;
            var curIconElem = document.createElement('img');
            curIconElem.setAttribute("src", `https://openweathermap.org/img/wn/${curIcon}.png`);

            //create forecast weather element
            var curUL = document.createElement('ul');
            curUL.classList.add("small");
            var curTemp = document.createElement('li');
            curTemp.textContent = ("Temp: "+ forecastObj.list[i].main.temp+"\u2109");
            var curWind = document.createElement('li');
            curWind.textContent = ("Wind: "+ forecastObj.list[i].wind.speed+ " MPH");
            var curHumid = document.createElement('li');
            curHumid.textContent = ("Humidity: "+ forecastObj.list[i].main.humidity+ " %");

            //append UL elements
            curUL.append(curTemp, curWind, curHumid);

            //append date and weather to current forecast box
            curForecastBox.append(curForecastDate, curIconElem, curUL);

            //append this forecast to forecast element
            forecastElem.append(curForecastBox);
        }
    
    }

}

function dispCurrentWeather () {
    //access and clear current-city element
    var curCityElem = document.getElementById("current-city");
    curCityElem.textContent = "";

    //calculate date of recording
    let unixDT = weatherObj.dt;
    var date = new Date(unixDT * 1000);
    var month = (date.getMonth() + 1);
    var day = date.getDate();
    var year = date.getFullYear();
    var curDate = `(${month}/${day}/${year})`;

    //create Current City Name element
    var curCityName = document.createElement('p');
    curCityName.classList.add("m-2");
    curCityName.textContent = `${weatherObj.name} ${curDate}`;

    //create icon element
    let curIcon = weatherObj.weather[0].icon;
    var curIconElem = document.createElement('img');
    curIconElem.setAttribute("src", `https://openweathermap.org/img/wn/${curIcon}.png`);

    //create Current City Weather elements
    var curUL = document.createElement('ul');
    var curTemp = document.createElement('li');
    curTemp.textContent = ("Temp: "+ weatherObj.main.temp+"\u2109");
    var curWind = document.createElement('li');
    curWind.textContent = ("Wind: "+ weatherObj.wind.speed+ " MPH");
    var curHumid = document.createElement('li');
    curHumid.textContent = ("Humidity: "+ weatherObj.main.humidity+ " %");

    //append UL elements
    curUL.append(curTemp, curWind, curHumid);

    //append current weather elements
    curCityElem.append(curCityName, curIconElem, curUL);
}

//get weather object from API
function getWeatherAPI (weatherType) {
    //set fetch API variable string
    var queryURL = `https://api.openweathermap.org/data/2.5/${weatherType}?q=${cityName}&units=imperial&appid=${APIKey}`;
    fetch(queryURL)
    .then(function(response) {
        if (!response.ok) {
            throw response.json();
          }
        var respObj = response.json();
        return respObj;
    })
    .then (function (data) {
        //if we're looking for current weather, display that first
        if (weatherType === "weather") {
            weatherObj = data;
            dispCurrentWeather();
        } 
        //if we're looking for a forecast, display that
        else {
            forecastObj = data;
            dispForecast();
            //make sure this search doesn't appear twice in history
            for (var i=0; i < weatherStorage.length; i++) {
                if (weatherStorage[i].current.name === weatherObj.name) {
                    weatherStorage = weatherStorage.splice(i, 1);
                }
            }
            //add fetched weather objects to front of storage array
            var newWeatherObj = {"current": weatherObj, "forecast": forecastObj};
            weatherStorage.unshift(newWeatherObj);
            //put new array in localStorage
            localStorage.setItem("weather-dash", JSON.stringify(weatherStorage));
            //refresh search history
            init();
        }
        
    })
    .catch(function (error) {
        console.error(error);
    });
}

//capture search text and submits to API functions
function handleSearchSubmit (event){
    event.preventDefault();
    init();
    var searchVal = document.querySelector('#search-input').value;
    if (!searchVal) {
        console.log('Please enter a City Name');
        return;
    }
    //set global current weather search
    cityName = searchVal.trim();
    //get current weather
    getWeatherAPI("weather")
    //get forecast
    getWeatherAPI("forecast");
    
}

//start loading the search history and last search
function init () {
    //load previous fetch objects from localStorage
    weatherStorage = localStorage.getItem('weather-dash');
    //if we have stored content, load it
    if (weatherStorage) {
        // console.log("weatherStorage is:", weatherStorage);
        weatherStorage = JSON.parse(weatherStorage);
        //display previous searches in sidebar ul
        var searchListElem = document.getElementById("prev-search");
        searchListElem.textContent = "";
        for (var i=1; i < weatherStorage.length; i++) {
            // console.log("weatherStorage[i].current:", weatherStorage[i].current);
            var newSearchLi = document.createElement('li');
            var newSearchLink = document.createElement('a');
            newSearchLink.setAttribute("id", `search-${i}`);
            newSearchLink.textContent = weatherStorage[i].current.name;
            newSearchLi.append(newSearchLink);
            searchListElem.append(newSearchLi);
            if (i === 7) {
                break;
            }
        }
        //load last search into Dashboard
        weatherObj = weatherStorage[0].current;
        dispCurrentWeather();
        forecastObj = weatherStorage[0].forecast;
        dispForecast();
    } else {
        weatherStorage = [];
    }

}

//listen to search button
searchElem.addEventListener('submit', handleSearchSubmit);

//listen to clicks on search history
historyElem.addEventListener('click', function (event) {
    var element = event.target;
    //as long as we click on an element in our search history
    if (element.id) {
        //grab the index number from its id name
        var elemIndex = parseInt((element.id).slice(7));
        if (weatherStorage) {
            let tmpName = weatherStorage[elemIndex].current.name;
            //remove selected city from search history
            
            weatherStorage.splice(elemIndex, 1);
            //load weather for selected city
            cityName = tmpName;
            //get current weather
            getWeatherAPI("weather")
            //get forecast
            getWeatherAPI("forecast");
        }
    }  
        
})

//start-up
init();