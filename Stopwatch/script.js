const display=document.querySelector('#result');
const lapsContainer=document.querySelector('#laps');
const startbtn=document.querySelector('#start-btn');
const stopbtn=document.querySelector('#stop-btn');
const resetbtn=document.querySelector('#reset-btn');
const flagbtn=document.querySelector('#flag-btn');

let interval;
let running=false;
let startTime=0;
let lapCount=1;
let elapsedTime=0;

const padding=(num)=>num.toString().padStart(2,'0');
const milliPadding=(num)=>num.toString().padStart(3,'0');

startbtn.addEventListener('click',()=>{
    // if(startTime==0){
        startTime=Date.now()-elapsedTime;
    // }

    if(!running){
        running=true;
        interval=setInterval(()=>{
            let timeGap=Date.now()-startTime
            let inMilliSeconds=timeGap%1000;
            let inSeconds=Math.floor(timeGap/1000)
            let inMinute=Math.floor(timeGap/1000/60)
            if(inSeconds>=60)inSeconds%=60;

            display.textContent=`${padding(inMinute)}:${padding(inSeconds)}:${milliPadding(inMilliSeconds)}`
         },15);
    }
});

stopbtn.addEventListener('click',()=>{
    running=false;

    elapsedTime=Date.now()-startTime;
    clearInterval(interval)
});

resetbtn.addEventListener('click',()=>{
     running=false;
     clearInterval(interval);
     startTime=0;
     elapsedTime=0;
     lapCount=1;
     display.textContent="00:00:000";
     lapsContainer.innerHTML="";
});

flagbtn.addEventListener('click',()=>{
    if(!running) return;

    const lap=document.createElement('div');
    lap.textContent=`Lap ${lapCount}: ${display.textContent}`;
    lapsContainer.appendChild(lap);
    lapCount++;
});