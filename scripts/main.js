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
      $("#population").html(jsonWeather.city.population);
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
        $("#city-name").html("Location N/A");
        $("#population").html("Population N/A");
        $("#sunrise").html("Sunrise N/A");
        $("#sunset").html("Sunset N/A");
      } else {
      console.log("Woah")
      }

});
