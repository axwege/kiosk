$("document").ready(function(){
loop();
});

function loop(){
var loop = setInterval(update, 30000);
localStorage.setItem("loopid", loop);
}

function update(){
$.ajax({
  url : "http://localhost/publicData/HostPage/switches.json",
  jsonpCallback : 'jsonCallback',
  dataType: "jsonp",
  success: function(data){
  var time = data['time'];
	var d = new Date();
	var month = ("0" + (d.getMonth() + 1)).slice(-2)
	var date = ("0" + d.getDate()).slice(-2)
	var hours = ("0" + d.getHours()).slice(-2)
	var minutes = ("0" + d.getMinutes()).slice(-2)
	var minutes2 = ("0" + (minutes - 1)).slice(-2)
	var time2 = d.getFullYear() + "-" + month + "-" + date + hours + ":" + minutes;
	var time3 = d.getFullYear() + "-" + month + "-" + date + hours + ":" + minutes2;
  	//console.log(time);
	//console.log(time2);
	//console.log(time3);
  if (time == time2){
	alert("time");
	document.getElementById("mode").src="broadcast/template.html";
	playing();
  }
  else if (time == time3) {
	alert("time2");
	document.getElementById("mode").src="broadcast/template.html";
	playing();
  }
  }
  })
}

function playing() {
  clearInterval(localStorage.getItem("loopid"));
  localStorage.setItem("stat", "playing");
  var id = setInterval(function(){handler(id);}, 600);
}

function handler(id) {
    var stat = localStorage.getItem("stat");
    if (stat == "completed") {
  	$("#mode").attr("src", "http://localhost/Client/main.html");
	clearInterval(id);
	loop();
    }
}