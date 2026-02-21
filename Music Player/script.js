let songs=[
    {
        name:"Ekadantaya Vakratundaya",
        Artist: "Shankar Mahadevan",
        file:"media/Ekadantaya Vakratundaya - PagalWorld.mp3",
        img:"media/HD-wallpaper-white-ganpati-statue-in-blur-background-ganesh-thumbnail.jpg"
    },

    {
        name:"Toogire Rayara",
        Artist: "Dr Vidyabhushan",
        file:"media/Sri_Vidyabhushana_-_Toogire_rayara_(mp3.pm).mp3",
        img:"media/fa38cdd6241eed3d05463c9d89ca8f34.jpg"
    },

    {
        name:"Bhuvanam Gaganam",
        Artist: "Puneeth Rajkumar",
        file:"media/2917.mp3",
        img:"media/vamshi.jpg"
    },

    {
        name:"Dasanagu Visheshanagu",
        Artist: "Kanaka Dasaru",
        file:"media/Anantha_Kulkarni_-_Dasanagu_Visheshanagu_(mp3.pm).mp3",
        img:"media/dasanagu.jpg"
    },

    {
        name:"Shararat",
        Artist: "Ranveer Singh, Ayesh khan",
        file:"media/Shararat Dhurandhar 128 Kbps.mp3",
        img:"media/Shararat-From-Dhurandhar-Hindi-2025-20251215084216-500x500.jpg"
    }

]



let rangeBar=document.querySelector("#range2");
let music=document.querySelector("#song");
let ppBtn=document.querySelector("#pause-play");
let backward=document.querySelector("#fast-backward")
let forward=document.querySelector('#fast-forward')
let songTitle = document.querySelector(".songname h1");
let songArtist = document.querySelector(".songname h4");
let thumbnail = document.querySelector("#img-thumb");
let likeBtn=document.querySelector("#like");
let favMenuBtn=document.querySelector("#left");
let menuBtn=document.querySelector("#menu")
let playlist=document.querySelector("#playlist")
let songlist=document.querySelector("#song-list")
let favPlaylist=document.querySelector("#fav-playlist")
let favSonglist=document.querySelector("#fav-song-list")

let currentSongIndex=0;

music.onloadedmetadata=function(){
    rangeBar.max=music.duration;
    rangeBar.value=music.currentTime;
}

function playPause(){
    if(ppBtn.classList.contains("bi-play-fill")){
        music.play();
        ppBtn.classList.remove("bi-play-fill")
        ppBtn.classList.add("bi-pause-fill")
    }
    else{
        music.pause();
        ppBtn.classList.remove("bi-pause-fill")
        ppBtn.classList.add("bi-play-fill")
    }
}

ppBtn.addEventListener('click',()=>{
    playPause();
})

// if(music.play()){
//     setInterval(()=>{
//         rangeBar.value=music.currentTime;
//     },500)
// }

music.addEventListener("timeupdate", function () {
    rangeBar.value = music.currentTime;
});

rangeBar.onchange=function(){
    music.currentTime=rangeBar.value;
    music.play();
    ppBtn.classList.add("bi-pause-fill")
    ppBtn.classList.remove("bi-play-fill")
}

// backward.addEventListener('click',()=>{
//     music.currentTime-=10;
//     if(music.currentTime<0){
//         music.currentTime=0;
//     }
// })

// forward.addEventListener('click',()=>{
//     music.currentTime+=10;
//     if(music.currentTime>music.duration){
//         music.currentTime=music.duration;
//     }
// })

let favourites=JSON.parse(localStorage.getItem("favourites")) || [];


function loadSong(index){
    // music.src=songs[index].file;

    if (music.src !== songs[index].file) {
        music.src = songs[index].file;
    }

    songTitle.textContent=songs[index].name;
    songArtist.textContent=songs[index].Artist;
    thumbnail.src=songs[index].img;

    updateLikeIcon();
    // let isFav=favourites.find(
    //     fav=>fav.file === songs[index].file
    // );

    // likeBtn.style.color=isFav?"red":"rgb(201,81,99)";
}


loadSong(currentSongIndex);

function updateLikeIcon() {

    let isFav = favourites.find(
        fav => fav.file === songs[currentSongIndex].file
    );

    likeBtn.style.color = isFav ? "red" : "rgb(201,81,99)";
}


forward.addEventListener("click", function () {
    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0; // loop to first
    }

    loadSong(currentSongIndex);
    music.play();
    ppBtn.classList.remove("bi-play-fill");
    ppBtn.classList.add("bi-pause-fill");
});

backward.addEventListener("click", function () {
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1; // go to last
    }

    loadSong(currentSongIndex);
    music.play();
    ppBtn.classList.remove("bi-play-fill");
    ppBtn.classList.add("bi-pause-fill");
});

music.addEventListener("ended", function () {
    forward.click();
});


menuBtn.addEventListener('click',()=>{
    favPlaylist.classList.remove("active");
    playlist.classList.toggle("active")
})


function displaySongs(){
    songlist.innerHTML="";

    songs.forEach((song,index)=>{

        let li=document.createElement("li");

        let span= document.createElement("span");
        span.textContent=song.name;
        span.style.cursor="pointer";

        span.addEventListener("click", function(){
            currentSongIndex=index;
            loadSong(currentSongIndex);
            music.play();

            ppBtn.classList.remove("bi-play-fill");
            ppBtn.classList.add("bi-pause-fill");
            playlist.classList.remove("active");
        })

        let downloadBtn=document.createElement("i");
        downloadBtn.className="bi bi-download";
        downloadBtn.style.float="right";
        downloadBtn.style.cursor="pointer";

        downloadBtn.addEventListener("click", function (e) {
            e.stopPropagation(); // prevents song playing

            downloadSong(song);
        });

        li.appendChild(span);
        li.appendChild(downloadBtn);

        // li.textContent=song.name;
        // li.addEventListener("click",function(){
            
        // })
        songlist.appendChild(li);
    })
}

displaySongs();

function downloadSong(song){
    let a=document.createElement("a");
    a.href=song.file;
    a.download=song.name;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

likeBtn.addEventListener("click",()=>{

    let song=songs[currentSongIndex]

    let exists=favourites.find(fav=>fav.file===song.file);

    if(exists){
        favourites=favourites.filter(fav=>fav.file!==song.file);
        // likeBtn.style.color="rgb(201,81,99)"
    }else{
        favourites.push(song);
        // likeBtn.style.color="red";
    }
    localStorage.setItem("favourites",JSON.stringify(favourites));
    // loadSong(currentSongIndex);

    updateLikeIcon();
})


function displayFavourites(){
    favSonglist.innerHTML=""
    if(favourites.length===0){
        let li=document.createElement("li")
        li.textContent="No Favourite songs yet";
        favSonglist.appendChild(li);
        return;
    }

    favourites.forEach((song)=>{
        let li=document.createElement("li");
        li.textContent=song.name;

        li.addEventListener("click",()=>{
            currentSongIndex=songs.findIndex(
                s=>s.file===song.file
            )
            
        loadSong(currentSongIndex);
        music.play();

        favPlaylist.classList.remove("active");
        })
        favSonglist.appendChild(li);
    })
}

favMenuBtn.addEventListener("click", ()=>{

    playlist.classList.remove("active"); // close song list
    favPlaylist.classList.toggle("active");

    if(favPlaylist.classList.contains("active")){
        displayFavourites();
    }
});
