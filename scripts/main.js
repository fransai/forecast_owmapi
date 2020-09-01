function lat_long(position) {
  var lat = position.coords.latitude;
  console.log(`Latitude : ${lat}`);
  var long = position.coords.longitude;
  console.log(`Longitude : ${long}`);
}

navigator.geolocation.getCurrentPosition(lat_long);
