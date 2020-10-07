$(document).ready(function () {
  const apiKey = "d969704309dc87d01c3d23aab084f680";

  /*
  var todaysDay = ""
  function getDayofweek(){
    var d = new Date();
    var today = d.getDay()
    if (today == 1){
      todaysDay = "Monday"
    } 
    else if (today == 2){
      todaysDay = "Tuesday"
    }
    else if (today == 3){
      todaysDay = "Wednesday"
    }
    else if (today == 4){
      todaysDay = "Thursday"
    }
    else if (today == 5){
      todaysDay = "Friday"
    }
    else if (today == 6){
      todaysDay = "Saturday"
    }
    else{
      todaysDay = "Sunday"
    }
    return todaysDay
  }
  const dayofweek = getDayofweek();
  console.log(dayofweek);
  */

  function lat_long(position) {

    //add an if statement to make the below p1 work and if that doesnt work, make p2 work with some "Location Denied Messages"

    var currLat = String(position.coords.latitude);
    console.log(`Lattitude : ${currLat}`);
    //console.log(typeof(currLat));
    var currLong = String(position.coords.longitude);
    console.log(`Longitude : ${currLong}`);
    //console.log(typeof(currLat));

    var xhr = new XMLHttpRequest();
    var weather;

    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        setWeather(JSON.parse(this.responseText));
      }
    };

    xhr.open("GET", "https://api.openweathermap.org/data/2.5/forecast?lat=" + currLat + "&lon=" + currLong + "&units=metric" + "&appid=" + apiKey);
    xhr.send();

    function setWeather(jsonWeather) {
      weather = jsonWeather;
      console.log(jsonWeather);
      $("#city-name").html((jsonWeather.city.country) + ", " + (jsonWeather.city.name));
      var sunrise = jsonWeather.city.sunrise;
      var hum_sunrise = new Date(1000 * sunrise)
      $("#sunrise").html(hum_sunrise);
      var sunset = jsonWeather.city.sunset;
      var hum_sunset = new Date(1000 * sunset)
      $("#sunset").html(hum_sunset);
      $("#clouds").html((jsonWeather.list[0].clouds.all) + "% - " + "\"" + (jsonWeather.list[0].weather[0].description) + "\"");
      $("#cloudsPiccurrent").attr("src", `http://openweathermap.org/img/wn/${(jsonWeather.list[0].weather[0].icon)}@2x.png`);
      $("#feelsLike").html((jsonWeather.list[0].main.feels_like) + "&deg;C");

    }
  }

  navigator.geolocation.getCurrentPosition(lat_long);

  var ultLoc = document.getElementById("city-name").innerText;
  if (ultLoc == "") {
    $("#city-name").html("Location Request Unavailable");
    $("#sunrise").html("Location Request Unavailable");
    $("#sunset").html("Location Request Unavailable");
    $("#clouds").html("Location Request Unavailable");
    $("#feelsLike").html("Location Request Unavailable");
  } else {
    console.log("Woah")
  }

  //Breaking to the search functionality
  var city = ""

  $("#getForecast").click(function () {
    city = $("#city").val();

    var xhr = new XMLHttpRequest();
    var weather;

    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        setWeather(JSON.parse(this.responseText));
      }
    };

    xhr.open("GET", "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric" + "&appid=" + apiKey);
    xhr.send();

    function setWeather(jsonWeather) {
      weather = jsonWeather;
      console.log(jsonWeather);

      //var nextTime = jsonWeather.list[0].dt
      //var humNexttime = new Date(1000 * nextTime);
      //$("#timestamp").html(humNexttime);
      $("#timestamp").html(jsonWeather.list[0].dt_txt);
      $("#searchCityName").html((jsonWeather.city.country) + ", " + (jsonWeather.city.name));
      var sunrise = jsonWeather.city.sunrise;
      var hum_sunrise = new Date(1000 * sunrise)
      $("#searchSunrise").html(hum_sunrise);
      var sunset = jsonWeather.city.sunset;
      var hum_sunset = new Date(1000 * sunset)
      $("#searchSunset").html(hum_sunset);
      $("#timeNowtoday").html(jsonWeather.list[0].dt_txt);
      $("#searchClouds").html((jsonWeather.list[0].clouds.all) + "% - " + "\"" + (jsonWeather.list[0].weather[0].description) + "\"");
      $("#cloudsPic").attr("src", `http://openweathermap.org/img/wn/${(jsonWeather.list[0].weather[0].icon)}@2x.png`)
      $("#searchFeelsLike").html((jsonWeather.list[0].main.feels_like) + "&deg;C");
      $("#searchTemp").html((jsonWeather.list[0].main.temp) + "&deg;C");
      $("#searchTempmin").html((jsonWeather.list[0].main.temp_min) + "&deg;C");
      $("#searchTempmax").html((jsonWeather.list[0].main.temp_max) + "&deg;C");
/*
      var nextTime1 = jsonWeather.list[1].dt
      var humNexttime1 = new Date(1000 * nextTime1);
      $("#timestamp1").html(humNexttime1);
      $("#searchCityName1").html((jsonWeather.city.country) + ", " + (jsonWeather.city.name));
      var sunrise = jsonWeather.city.sunrise;
      var hum_sunrise = new Date(1000 * sunrise)
      $("#searchSunrise1").html(hum_sunrise);
      var sunset = jsonWeather.city.sunset;
      var hum_sunset = new Date(1000 * sunset)
      $("#searchSunset1").html(hum_sunset);
      $("#timeNowtoday1").html(jsonWeather.list[1].dt_txt);
      $("#searchClouds1").html((jsonWeather.list[1].clouds.all) + "% - " + "\"" + (jsonWeather.list[1].weather[0].description) + "\"");
      $("#cloudsPic1").attr("src", `http://openweathermap.org/img/wn/${(jsonWeather.list[1].weather[0].icon)}@2x.png`)
      $("#searchFeelsLike1").html((jsonWeather.list[1].main.feels_like) + "&deg;C");
      $("#searchTemp1").html((jsonWeather.list[1].main.temp) + "&deg;C");
      $("#searchTempmin1").html((jsonWeather.list[1].main.temp_min) + "&deg;C");
      $("#searchTempmax1").html((jsonWeather.list[1].main.temp_max) + "&deg;C");
*/
    }
  });
});

