//Write HTML- Do we write the html for the weather API now, or do we use Javascript to write the HTML?

//Basic CSS

/*Javascript -
GIVEN a weather dashboard with form inputs
WHEN I search for a city
1.  Search form - event listener on submit button*/
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || []

for (var i = 0; i < searchHistory.length; i++) {
    renderHistoryItem(searchHistory[i])
}

$("#search-button").on("click", function (event) {
    //console.log(event.target);
    var city = $("#search-value").val()
    //console.log(city)
    getcurrentWeather(city);
    getForecast(city);


})
//2. Save to local Storage
function addCityToHistory(city) {
    searchHistory.push(city)
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
}



function renderHistoryItem(city) {
    var li = document.createElement("li")
    li.className = "list-group-item"
    li.textContent = city
    li.addEventListener("click", function () {
        console.log(city)
    })
    document.getElementById("search-history").prepend(li)
}
//Write HTML - Use JavaScript to write the HTML in an empty div by creating the element and adding bootstrap classes to it.
/*THEN I am presented with current and future conditions for that city and that city is added to the search history
1. Fetch to get weather data from that city using OpenWeatherAPI
2. put the data from that fetch into my HTML*/

//conditional statement that checks the value of the UVI and compares it with the set value that 
//0-3 green background, greater than 3 but less than 7 warning orange, 7+ red
//use a button with built in features danger etc
//var date = new Date(response.daily[i].dt).toLocalDateString()

function todayWeather(temperature, windSpeed, humidity, name) {
    var tempEl = document.getElementById('temperature')
    tempEl.textContent = "Temperature: " + temperature
    var humidEl = document.getElementById('humidity')
    humidEl.textContent = "Humidity: " + humidity
    var windEl = document.getElementById('wind-speed')
    windEl.textContent = "Wind Speed: " + windSpeed
    var nameEl = document.getElementById('forecast-header')
    nameEl.textContent = name
}



function getcurrentWeather(searchQuery) {
    //console.log(searchQuery)
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchQuery + "&units=imperial&apikey=25d8d087027fd4ca304fa1a83a21cf96",
        method: 'GET',
    }).then(function (response) {
        //console.log(response)
        addCityToHistory(response.name)
        renderHistoryItem(response.name)
        var name = response.name
        //console.log(name)
        var temperature = response.main.temp
        //console.log(temperature)
        var windSpeed = response.wind.speed
        //console.log(windSpeed)
        var humidity = response.main.humidity
        //console.log(humidity)

        todayWeather(temperature, windSpeed, humidity, name);
        getWeatherData(response.coord.lat, response.coord.lon)
    }).catch(function (error) {
        console.log(error)
    })

}

function getWeatherData(lat, lon) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=25d8d087027fd4ca304fa1a83a21cf96",
        method: 'GET',
    }).then(function (response) {
        //console.log(response)
        //console.log("uviIndex", response.current.uvi)
        var uviIndex = response.current.uvi
        //console.log(uviIndex)
        todayUvi(uviIndex);
    })
}

function getForecast(city) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=25d8d087027fd4ca304fa1a83a21cf96",
        method: 'GET',
    }).then(function (response) {
        console.log("forecast", response)
        // create for loop to loop over all forecasts
        for (var i = 0; i < response.list.length; i++) {
            if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                console.log(response.list.length[i])
                var col = $("<div>").addClass("col-md-2");
                var card = $("<div>").addClass("card bg-primary text-white");
                var body = $("<div>").addClass("card-body p-2");

                var title = $("<h5>").addClass("card-title").text(new Date(response.list[i].dt_txt).toLocaleDateString());

                var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");

                var p1 = $("<p>").addClass("card-text").text("Temp: " + response.list[i].main.temp_max + " °F");
                var p2 = $("<p>").addClass("card-text").text("Humidity: " + response.list[i].main.humidity + "%");

                col.append(card.append(body.append(title, img, p1, p2)));
                $("#fiveday").append(col);
            }
        }
    })
}

function todayUvi(uviIndex) {
    var uviEl = document.getElementById('uv-index')
    uviEl.textContent = "UV Index: " + uviIndex
    var btn = $("<span>").addClass("btn btn-sm").text(uviIndex);

    //btn change colors
    if (uviIndex < 3) {
        btn.addClass("btn-success");
    }
    else if (uviIndex < 7) {
        btn.addClass("btn-warning")
    }
    else {
        btn.addClass("btn-danger");
    }

    $("#forecast-header .card-body").append($(uviEl).append(btn));
}


/*WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
1. Pull different places of information from the API

WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
1. Color code the button to be different colors based on the weather conditions

WHEN I view future weather conditions for that city
THEN I am presented with a 5 - day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
1. 5 bootstrap cards that are made and display API information

WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
1. When we pull localStorage we are going to create buttons or links that then search that city.
Our links will run the same function that our initial search runs just with a different city name.*/
