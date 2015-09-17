$("document").ready(function(){
update();
});

function update() {
console.log("updating");
$.ajax({
    url : "http://localhost/publicData/HostPage/switches.json",
    jsonpCallback : 'jsonCallback',
    dataType : "jsonp",
    success : function(data) {
	var feed = data['source'];
	var type = data['type'];
	console.log(type);
	$("#data").attr("type", "video/" + type);
	$("#data").attr("src", feed);
	media();
    }
})
}
function media() {
$("#player").mediaelementplayer( {
	success : function(media) {
		//alert("successful");
		media.addEventListener('ended', function() {
			localStorage.setItem("stat", "completed");
		});
	}
});
}
