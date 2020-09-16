$(document).ready(function () {
  const apiKey = "d969704309dc87d01c3d23aab084f680";

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

    xhr.open("GET", "https://api.openweathermap.org/data/2.5/forecast?lat="+currLat+"&lon="+currLong+"&units=metric"+"&appid="+apiKey);
    xhr.send();

    function setWeather(jsonWeather) {
      weather = jsonWeather;
      console.log(jsonWeather);
      $("#city-name").html((jsonWeather.city.country) + ", " + (jsonWeather.city.name));
      var sunrise = jsonWeather.city.sunrise;
      var hum_sunrise = new Date(1000*sunrise)
      $("#sunrise").html(hum_sunrise);
      var sunset = jsonWeather.city.sunset;
      var hum_sunset = new Date(1000*sunset)
      $("#sunset").html(hum_sunset);
      $("#clouds").html((jsonWeather.list[0].clouds.all) + "% - " + "\""+ (jsonWeather.list[0].weather[0].description) + "\"");
      $("#feelsLike").html((jsonWeather.list[0].main.feels_like) + "&deg;C");

    }
  }

  navigator.geolocation.getCurrentPosition(lat_long);

  var ultLoc = document.getElementById("city-name").innerText;
      if (ultLoc == ""){
        $("#city-name").html("Location Request Denied");
        $("#sunrise").html("Location Request Denied");
        $("#sunset").html("Location Request Denied");
        $("#clouds").html("Location Request Denied");
        $("#feelsLike").html("Location Request Denied");
      } else {
      console.log("Woah")
      }
  
  //Breaking to the search functionality

  var city = ""

      $("#getForecast").click(function(){
        city = $("#city").val();


        var xhr = new XMLHttpRequest();
      var weather;
  
      xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            setWeather(JSON.parse(this.responseText));
        }
      };
  
      xhr.open("GET", "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=metric"+"&appid="+apiKey);
      xhr.send();
      
      function setWeather(jsonWeather) {
        weather = jsonWeather;
        console.log(jsonWeather);
        $("#searchCityName").html((jsonWeather.city.country) + ", " + (jsonWeather.city.name));
        var sunrise = jsonWeather.city.sunrise;
        var hum_sunrise = new Date(1000*sunrise)
        $("#searchSunrise").html(hum_sunrise);
        var sunset = jsonWeather.city.sunset;
        var hum_sunset = new Date(1000*sunset)
        $("#searchSunset").html(hum_sunset);
        $("#searchClouds").html((jsonWeather.list[0].clouds.all) + "% - " + "\""+ (jsonWeather.list[0].weather[0].description) + "\"");
        $("#searchFeelsLike").html((jsonWeather.list[0].main.feels_like) + "&deg;C");

        $("#todayPlus1").html(jsonWeather.list[8].dt_txt);
        $("#searchCityNameTom").html((jsonWeather.city.country) + ", " + (jsonWeather.city.name));
        $("#searchCloudsTom").html((jsonWeather.list[8].clouds.all) + "% - " + "\""+ (jsonWeather.list[8].weather[0].description) + "\"");
        $("#searchHumidityTom").html((jsonWeather.list[8].main.humidity) + "&percnt;");
        $("#searchFeelsLikeTom").html((jsonWeather.list[8].main.feels_like) + "&deg;C");
  
      }
        

      
      });
  
      
});

