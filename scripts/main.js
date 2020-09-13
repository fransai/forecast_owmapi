$(document).ready(function () {
  const apiKey = "d969704309dc87d01c3d23aab084f680";

  function lat_long(position) {
    currLat = position.coords.latitude;
    console.log(`Latitude : ${currLat}`);
    currLong = position.coords.longitude;
    console.log(`Longitude : ${currLong}`);

    var xhr = new XMLHttpRequest();
    var weather;

    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          setWeather(JSON.parse(this.responseText));
      }
    };

  xhr.open("GET", "https://api.openweathermap.org/data/2.5/forecast?lat="+currLat+"&lon="+currLong+"&appid="+apiKey);
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

    }
  
    

  }

  navigator.geolocation.getCurrentPosition(lat_long);

  
  
});
