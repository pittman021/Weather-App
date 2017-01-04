window.onload = getMyLocation;

function getMyLocation() {

if  (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayLocation);
  } else {
    alert("Whoops no support for location");
  }

}

// take weather data and build json URL using coordinates
function displayLocation(p) {
  console.log(p);
  var lat = p.coords.latitude;
  var long = p.coords.longitude;
  var url = "http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" + lat + "&lon=" + long + "&APPID=98acbdc8fed4c94098e54b139af1f559&callback=getWeather";
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.setAttribute("src", url);
  script.setAttribute("id", "jsonp");
  head.appendChild(script);
  getWeather();
}

function getWeather(weather) {
  console.log(weather);
  var p = document.getElementById('mylocation');
  var p2 = document.getElementById('mydescription');
  var p3 = document.getElementById('mytemp');
  var loc = weather.name;
  var desc = weather.weather[0].description;
  var temp = Math.round(weather.main.temp);
  var icon = weather.weather[0].icon;
  p.innerHTML = loc;
  p2.innerHTML = desc;
  p3.innerHTML = temp;
  console.log(weather);
  setIcon(icon);
}

function setIcon(icon) {
  var sun = "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-10-128.png"
  var w = document.getElementById('icon');
  var iconURL = sun;
  var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
  var img = document.createElement('img');
  img.setAttribute("src", iconUrl);
  img.setAttribute('height',100);
  w.appendChild(img);
}

// converts temperature type using button onlick event //
function convertTemp(p) {
  var t = document.getElementById('mytemp');
  var temp = t.innerHTML;
  var c = document.getElementById('tempC');
  var f = document.getElementById('tempF');
  if (c == null) {
    var celcius = Math.round((temp - 32) * 5 / 9);
    t.innerHTML = celcius;
    f.setAttribute('id', 'tempC');
    f.innerHTML = "Change to Farenheit";
  } else {
    var faren = Math.round(temp * 9 / 5 + 32);
    t.innerHTML = faren;
    c.setAttribute('id', 'tempF');
    c.innerHTML = "Change to Celcius";
  }
}

var button = document.getElementById('tempF');
button.addEventListener('click',convertTemp);
