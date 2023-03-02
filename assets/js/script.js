var APIKey = "060b3b44ee04f00deac7c9f2a67bbd9d";
var cityName = "Atlanta";

var searchElem = document.querySelector('#search-form');
var weatherObj;
var forecastObj;
var tmpWeatherObj = {
    "cod": "200",
    "message": 0,
    "cnt": 40,
    "list": [
        {
            "dt": 1661871600,
            "main": {
                "temp": 296.76,
                "feels_like": 296.98,
                "temp_min": 296.76,
                "temp_max": 297.87,
                "pressure": 1015,
                "sea_level": 1015,
                "grnd_level": 933,
                "humidity": 69,
                "temp_kf": -1.11
            },
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 0.62,
                "deg": 349,
                "gust": 1.18
            },
            "visibility": 10000,
            "pop": 0.32,
            "rain": {
                "3h": 0.26
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2022-08-30 15:00:00"
        },
        {
            "dt": 1661882400,
            "main": {
            "temp": 295.45,
            "feels_like": 295.59,
            "temp_min": 292.84,
            "temp_max": 295.45,
            "pressure": 1015,
            "sea_level": 1015,
            "grnd_level": 931,
            "humidity": 71,
            "temp_kf": 2.61
            },
            "weather": [
            {
                "id": 500,
                "main": "Rain",
                "description": "light rain",
                "icon": "10n"
            }
            ],
            "clouds": {
            "all": 96
            },
            "wind": {
            "speed": 1.97,
            "deg": 157,
            "gust": 3.39
            },
            "visibility": 10000,
            "pop": 0.33,
            "rain": {
            "3h": 0.57
            },
            "sys": {
            "pod": "n"
            },
            "dt_txt": "2022-08-30 18:00:00"
        },
        {
            "dt": 1661893200,
            "main": {
            "temp": 292.46,
            "feels_like": 292.54,
            "temp_min": 290.31,
            "temp_max": 292.46,
            "pressure": 1015,
            "sea_level": 1015,
            "grnd_level": 931,
            "humidity": 80,
            "temp_kf": 2.15
            },
            "weather": [
            {
                "id": 500,
                "main": "Rain",
                "description": "light rain",
                "icon": "10n"
            }
            ],
            "clouds": {
            "all": 68
            },
            "wind": {
            "speed": 2.66,
            "deg": 210,
            "gust": 3.58
            },
            "visibility": 10000,
            "pop": 0.7,
            "rain": {
            "3h": 0.49
            },
            "sys": {
            "pod": "n"
            },
            "dt_txt": "2022-08-30 21:00:00"
        },
        {
            "dt": 1662292800,
            "main": {
            "temp": 294.93,
            "feels_like": 294.83,
            "temp_min": 294.93,
            "temp_max": 294.93,
            "pressure": 1018,
            "sea_level": 1018,
            "grnd_level": 935,
            "humidity": 64,
            "temp_kf": 0
            },
            "weather": [
            {
                "id": 804,
                "main": "Clouds",
                "description": "overcast clouds",
                "icon": "04d"
            }
            ],
            "clouds": {
            "all": 88
            },
            "wind": {
            "speed": 1.14,
            "deg": 17,
            "gust": 1.57
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
            "pod": "d"
            },
            "dt_txt": "2022-09-04 12:00:00"
        }
    ],
    "city": {
      "id": 3163858,
      "name": "Zocca",
      "coord": {
        "lat": 44.34,
        "lon": 10.99
      },
      "country": "IT",
      "population": 4593,
      "timezone": 7200,
      "sunrise": 1661834187,
      "sunset": 1661882248
    }
  };

  function dispForecast () {
    console.log("in dispForecast, city is:", forecastObj.city.name);

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

        // if (forecastObj.list[i].dt_txt !== ) {

        // }
    
    }

    // for (var i=0; i< forecastObj.list.length; i++)
    //create forecast box
    var curForecastBox = document.createElement('div');
    curForecastBox.classList.add("col-md-2", "forecast", "p-2", "m-2", "small");

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
    curForecastBox.append(curForecastDate, curUL);

    //append this forecast to forecast element
    forecastElem.append(curForecastBox);

    //end loop
}

function dispCurrentWeather () {
    console.log("in dispCurrentWeather, city is:", weatherObj.name);

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

function getWeatherAPI (weatherType) {
    console.log("queryType is:", weatherType);
    var queryURL = `http://api.openweathermap.org/data/2.5/${weatherType}?q=${cityName}&units=imperial&appid=${APIKey}`;
    fetch(queryURL)
    .then(function(response) {
        if (!response.ok) {
            throw response.json();
          }
        var respObj = response.json();
        console.log("response is:", respObj);
        return respObj;
    })
    .then (function (data) {
        
        if (weatherType === "weather") {
            weatherObj = data;
            dispCurrentWeather();
        } else {
            forecastObj = data;
            dispForecast();
        }
    })
    .catch(function (error) {
        console.error(error);
    });
}


function handleSearchSubmit (event){
    event.preventDefault();
    var searchVal = document.querySelector('#search-input').value;
    if (!searchVal) {
        console.log('Please enter a City Name');
        return;
    }
    console.log("user submitted:", searchVal);
    cityName = searchVal;
    //get current weather
    getWeatherAPI("weather")
    //get forecast
    getWeatherAPI("forecast");
}

searchElem.addEventListener('submit', handleSearchSubmit);