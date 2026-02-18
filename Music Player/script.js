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

if(music.play()){
    setInterval(()=>{
        rangeBar.value=music.currentTime;
    },500)
}

rangeBar.onchange=function(){
    music.currentTime=rangeBar.value;
    music.play();
    ppBtn.classList.add("bi-pause-fill")
    ppBtn.classList.remove("bi-play-fill")
}

backward.addEventListener('click',()=>{
    music.currentTime-=10;
    if(music.currentTime<0){
        music.currentTime=0;
    }
})

forward.addEventListener('click',()=>{
    music.currentTime+=10;
    if(music.currentTime>music.duration){
        music.currentTime=music.duration;
    }
})

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






