$("document").ready(function(){
console.log("js loaded");
});
function main_ready() {
//var fetchid = setInterval(function(){fetch(fetchid)}, 1000);
console.log("in");
fetch();
}

function fetch(fetchid){
var ClientId = "91086916239-4h24il97ipuitm9ktt2qvvpjhmmd6dt2.apps.googleusercontent.com"
var Scopes = ['https://www.googleapis.com/auth/gmail.readonly'];
authorize(ClientId, Scopes);
function authorize(ClientId, Scopes){
console.log("attempting to authorize");
gapi.auth.authorize({
	'client_id': ClientId,
	'scope': Scopes,
	'immediate': true
  }, checkAuth);
}
function checkAuth(result){
if (!result.error) {
loadAPI();
}
else {
console.log("authorization error");
console.log(result);
}
}
function loadAPI(){
console.log("loading api");
gapi.client.load('gmail', 'v1', request);
}
function request(){
Date.prototype.yyyymmdd = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   return "after:" + yyyy + "/" + (mm[1]?mm:"0"+mm[0]) + "/" + (dd[1]?dd:"0"+dd[0]); // padding
  };

d = new Date();
var d = d.yyyymmdd();
console.log(d);
var request = gapi.client.gmail.users.messages.list({
	'userId': "ybkiosk@gmail.com",
	'maxResults': 1,
	'q': d,
	'labelids': "Label_1",
});
request.execute(function(response){
console.log(response);

});
}
}

/*
function run(){

}
*/

/*
userId: ybkiosk@gmail.com
maxResults: 1
q after: yyy/mm/dd
labelids Label_1
*/