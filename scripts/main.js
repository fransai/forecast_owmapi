var x = document.getElementById("display-latlong-coordinates");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
    console.log("userLatitude " + position.coords.latitude);
    console.log("userLongitude " + position.coords.longitude);
}

getLocation();