let songs=[
    {
        name:"Ekadantaya Vakratundaya",
        Artist: "Shankar Mahadevan",
        file:"",
        img:""
    },

    {
        name:"Pahi lakshmi Narasimha",
        Artist: "Sheshgiridas Raichur",
        file:"",
        img:""
    },

    {
        name:"Shararat",
        Artist: "Shankar Mahadev",
        file:"",
        img:""
    }

]



let rangeBar=document.querySelector("#range2");
let music=document.querySelector("#song");
let ppBtn=document.querySelector("#pause-play");
let backward=document.querySelector("#fast-backward")
let forward=document.querySelector('#fast-forward')

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



