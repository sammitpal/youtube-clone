const youtube_api = (res, search) => `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyD9dYcLSrF6wTlqOiIUKSAUGwFkt9cZBLk&type=video&maxResults=${res}&q=${search}&order=relevance&videoEmbeddable=any`;
const form = document.getElementById("form");
const find = document.getElementById("search");
const main = document.getElementById("main");
const element = document.getElementById("element");
const load = document.getElementById("loadmore");
const gb = "";
let more = 5;

load.style.display = "none";
async function fetchData(res, search) {
    load.style.display = "block";
    const resp = await fetch(youtube_api(res, search));
    const respData = await resp.json();

    console.log(respData.items);

    respData.items.forEach(item => {
        const element = document.createElement("div");
        element.classList.add("element");
        element.id = "element";
        var pdate = new Date(item.snippet.publishTime);
        var now = new Date();
        var tsec = (now - pdate) / 1000;

        
        var weeks = Math.floor(tsec/604800);
        var days = Math.floor(tsec / 3600 / 24)%7;
        var hours = Math.floor(tsec / 3600) % 24;
        var mins = Math.floor(tsec / 60) % 60;
        var sec = Math.floor(tsec % 60);

        element.innerHTML =
            `<div class = "image">
            <img src = "${item.snippet.thumbnails.medium.url}" />
         </div>
         <div class = "details">
            <h2>${item.snippet.title}</h2>
            <p class="time">${weeks} weeks ${days} days ${hours} hours ago</p>
            <p class="channelt">${item.snippet.channelTitle}</p>
            <p class="desc">${item.snippet.description}</p>
         </div><hr>`;
        main.appendChild(element);

        element.addEventListener('click', function () {
            window.open("player.html");
            localStorage.setItem("vid", item.id.videoId);
            localStorage.setItem("title", item.snippet.title);
        })
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    main.innerHTML = "";
    const search = find.value;
    fetchData(more, search);
})

function loadmore() {
    more = more + 5;
    const search = find.value;
    main.innerHTML = "";
    fetchData(more, search);
}
