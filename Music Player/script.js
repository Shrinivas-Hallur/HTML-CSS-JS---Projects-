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

function loadSong(index){
    music.src=songs[index].file;
    songTitle.textContent=songs[index].name;
    songArtist.textContent=songs[index].Artist;
    thumbnail.src=songs[index].img;
}

loadSong(currentSongIndex);

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

let menuBtn=document.querySelector("#menu")
let playlist=document.querySelector("#playlist")
let songlist=document.querySelector("#song-list")

menuBtn.addEventListener('click',()=>{
    playlist.classList.toggle("active")
})


function displaySongs(){
    songlist.innerHTML="";

    songs.forEach((song,index)=>{
        let li=document.createElement("li");
        li.textContent=song.name;
        li.addEventListener("click",function(){
            currentSongIndex=index;
            loadSong(currentSongIndex);
            music.play();

            ppBtn.classList.remove("bi-play-fill");
            ppBtn.classList.add("bi-pause-fill");
            playlist.classList.remove("active");
        })
        songlist.appendChild(li);
    })
}

displaySongs();

let favourites=[]

let likeBtn=document.querySelector("#like");
let favMenuBtn=document.querySelector("#left");

likeBtn.addEventListener("click",()=>{

    let song=songs[currentSongIndex]

    let exists=favourites.find(fav=>fav.file===song.file);

    if(exists){
        favourites=favourites.filter(fav=>fav.file!==song.file);
        likeBtn.computedStyleMap.color="rgb(201,81,99)"
    }else{
        favourites.push(song);
        likeBtn.style.color="red";
    }
})


let favPlaylist=document.querySelector("#fav-Playlist")
let favSonglist=document.querySelector("fav-song-list")

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
        favSongList.appendChild(li);
    })
}

favMenuBtn.addEventListener("click", ()=>{

    favPlaylist.classList.toggle("active");

    if(favPlaylist.classList.contains("active")){
        displayFavourites();
    }

});

