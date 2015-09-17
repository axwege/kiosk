function refresh() {
  //current weather data
  $.ajax({
  //url : "http://localhost/publicData/conditions1.json",
  url : "http://api.wunderground.com/api/2062cf09449e02a3/conditions/q/MN/Albany.json",
  //jsonpCallback : 'jsonCallback',
  dataType : "jsonp",
  success : function(parsed_json) {
  //parse json, and define strings
  var time = parsed_json['current_observation']['observation_time'];
  var location = parsed_json['current_observation']['display_location']['city'];
  var Timestamp = location + time
  var weather = parsed_json['current_observation']['icon'];
  var weather_icon = parsed_json['current_observation']['icon_url'];
  var feelslike_f = parsed_json['current_observation']['feelslike_f'];
  var temp_f = parsed_json['current_observation']['temp_f'];
  var wind_mph = parsed_json['current_observation']['wind_mph'];
  var wind_gust = parsed_json['current_observation']['wind_gust_mph'];
  var winddir = parsed_json['current_observation']['wind_dir'];
  var wind = wind_mph + " - " + wind_gust + "mph"
  var winddir_deg = parsed_json['current_observation']['wind_degrees'];
  var humidity = parsed_json['current_observation']['relative_humidity'];
  var dewpoint = parsed_json['current_observation']['dewpoint_f'];
  var pressure = parsed_json['current_observation']['pressure_in'];
  var precip = parsed_json['current_observation']['precip_today_in'];
  //update html elements
  document.getElementById("temp").innerHTML=temp_f;
  document.getElementById("weather_description").innerHTML=weather;
  document.getElementById("Timestamp").innerHTML=Timestamp;
  document.getElementById("weather_icon").src=weather_icon;
  document.getElementById("feelslike_f").innerHTML=feelslike_f;
  document.getElementById("wind").innerHTML=wind;
  document.getElementById("wind_mph").innerHTML=wind_mph;
  document.getElementById("wind_dir").innerHTML=winddir;
  document.getElementById("wind_compass").style.transform="rotate(" + winddir_deg + "deg)";
  document.getElementById("relative_humidity").innerHTML=humidity;
  document.getElementById("dewpoint_f").innerHTML=dewpoint;
  document.getElementById("pressure_in").innerHTML=pressure;
  document.getElementById("precip_today_in").innerHTML=precip;
  }
  })
  //forecast weather data
  $.ajax({
  //url : "http://localhost/publicData/forecast1.json",
  url : "http://api.wunderground.com/api/2062cf09449e02a3/forecast/q/MN/Albany.json",
  //jsonpCallback : 'jsonCallback',
  dataType : "jsonp",
  success : function(parsed_json) {
  //parse json, and define strings
  var high = parsed_json['forecast']['simpleforecast']['forecastday'][0]['high']['fahrenheit'];
  var low = parsed_json['forecast']['simpleforecast']['forecastday'][0]['low']['fahrenheit'];
  var Temprange = high + " to " + low
  //update html elements
  document.getElementById("TempRange").innerHTML=Temprange;
  }
  });
  //weather alert data
  $.ajax({
  //url: "http://localhost/publicData/alerts1.json",
  url : "http://api.wunderground.com/api/2062cf09449e02a3/alerts/q/MN/Albany.json",
  //jsonpCallback : 'jsonCallback',
  dataType : "jsonp",
  success : function(parsed_json) {
  $.each($("#alert_bar").children, function(index, child) {
	$("#alert_bar").removeChild(child);
  });
  var alerts = parsed_json['alerts'];
  if (alerts.length>0){
  for (i = 0; i<=alerts.length; i++){
    var code = parsed_json['alerts'][i]['type'];
    var desc = parsed_json['alerts'][i]['description'];
    var expire = parsed_json['alerts'][i]['expires'];
    var message = parsed_json['alerts'][i]['message'];
    var child = "<div><b>" + desc + "</b>(" + code + ")" + " until " + expire + "</div>"
    $("#alert_bar").append(child);
    $("#alerts_container").show();
  }
  }
  }
 });
}
//F903D3
$(document).ready(function(){
refresh();
setInterval(refresh, 120000);
setInterval(function() {$("#radar").load();}, 1000);
})


