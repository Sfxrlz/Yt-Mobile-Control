var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
let player;
let width = window.innerWidth || document.documentElement.clientWidth ||
  document.body.clientWidth;
width = width * 0.8;
let height = window.innerHeight || document.documentElement.clientHeight ||
  document.body.clientHeight;
height = height * 0.7;
const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
var socket = io();
const linkArr = [];


function onYouTubeIframeAPIReady() {
  player = new YT.Player('ifr', {
    width: width,
    height: height,
    videoId: 'Ei0fDplwsk8',
    playerVars: {
      'autoplay': 1,
      'controls': 1,
      'rel': 1
     },
     events: {
       'onStateChange': ev
     }
  });
}

function hSubmit() {
  let url = document.getElementById("yt").value;
  player.loadVideoById(trimUrl(url));
  document.getElementById("smit").clear;
};

function ev () {
  if(player.getPlayerState() === 0){
    nextVid();
  }
}

function trimUrl(url) {
  const match = url.match(regExp);
  if (match && match[2].length == 11) {
    return (match[2]);
  } else {
    window.alert("error opening the Link");
  }
};

function nextVid(){
  if(linkArr[0] != null){
  player.loadVideoById(trimUrl(linkArr[0]));
  linkArr.shift();
  }
};

socket.on('pse', function () {
  if (player.getPlayerState() === 1) {
    player.pauseVideo();
  }
  if (player.getPlayerState() === 2) {
    player.playVideo();
  }
});
socket.on('chV', function (link) {
  console.log("change url");
  player.loadVideoById(trimUrl(link));
});
socket.on('vUp', function () {
  let curV = player.getVolume();
  player.setVolume(curV += 5);
});
socket.on('vDw', function () {
  let curV = player.getVolume();
  player.setVolume(curV -= 5);
});
socket.on('liV', function(link){
    linkArr.push(link);
});
socket.on('nxV', function(){
  nextVid();
});