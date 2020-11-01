var videoID = localStorage.getItem("vid");
var name = localStorage.getItem("title");
const frame = document.getElementById("frame");
const title = document.getElementById("title");

frame.src = "https://www.youtube.com/embed/"+videoID;
title.innerHTML = name;