var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
var width  = window.innerWidth || document.documentElement.clientWidth ||
document.body.clientWidth;width = width*0.95;
var height = window.innerHeight|| document.documentElement.clientHeight||
document.body.clientHeight;height = height*0.8;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('ifr', {
    width: width,
    height: height,
    videoId: 'Ei0fDplwsk8',
    playerVars: {
      'autoplay': 0,
      'controls': 1
    },
    events: {}
  });
}

function hSubmit(){
    var url = document.getElementById("yt").value;
    updateUrl(url);
};

function regEd(url){
  var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  if(match && match[2].length === 11){
    return url;
  }
  else {
    window.alert("Please post a proper link")
  }
}
function updateUrl(url){
var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
var match = url.match(regExp);
if (match && match[2].length == 11) {
  player.loadVideoById(match[2]);
} else {
  window.alert("error opening the Link");
}
};

var socket = io();
socket.on('cmd', function(msg){
  console.log("change url");
  updateUrl(msg);
  window.scrollTo(document.getElementById('ifr'));
});
socket.on('pse', function(){
  if(player.getPlayerState() === 1){ player.pauseVideo();}
  if(player.getPlayerState() === 2){ player.playVideo();}
});
socket.on('volUp', function(){
  var curV = player.getVolume();
  player.setVolume(curV += 5);
});
socket.on('volDown', function(){
  var curV = player.getVolume();
  player.setVolume(curV -= 5);
});
socket.on('cueVid', function(){
  player
});
