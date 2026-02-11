const timeDisplay=document.querySelector('#times');
const indicate=document.querySelector('h1');
const startBtn=document.querySelector('#start-btn');
const pauseBtn=document.querySelector('#pause-btn');
const resumeBtn=document.querySelector('#resume-btn')
const resetBtn=document.querySelector('#reset-btn')
const pomoCountsDisplay=document.querySelector('.pomoCountsDisplay')

const workTime=1*60;
const breaktime=0.5*60;
let timerID=null;
let oneRoundCompleted=false; //one round=work time+break time
let totalCount=0;
let paused=false;

const updateTitle=(msg)=>{
    indicate.textContent=msg;
}

const saveLocalCounts=()=>{
    let counts=JSON.parse(localStorage.getItem("pomoCounts"));

    if (counts === null) {
        counts = 1;
    } else {
        counts++;
    }

    localStorage.setItem("pomoCounts",JSON.stringify(counts));
}

const countDown=(time)=>{
    return()=>{
        const minutes=Math.floor(time/60).toString().padStart(2,'0');
        const secs=(time%60).toString().padStart(2,'0');
        timeDisplay.textContent=`${minutes}:${secs}`;
        time--;
        if(time<0){
            stopTimer();
            if(!oneRoundCompleted){
                timerID=startTimer(breaktime);
                // indicate.textContent`It's Break Time`
                oneRoundCompleted=true;
                updateTitle("It's Break Time")
            }
            else{
                updateTitle("One Round Completed");
                setTimeout(()=>updateTitle("Start timer Again"),2000); 
                totalCount++;       
                saveLocalCounts();
                showPomoCounts();    
                oneRoundCompleted = false;       
            }
        }
    }
}

const startTimer=(startTime)=>{
    if(timerID !==null){
        stopTimer();
    }
    return setInterval(countDown(startTime),1000);

};

const stopTimer=()=>{
    clearInterval(timerID);
    timerID=null;
}

startBtn.addEventListener('click',()=>{
    timerID=startTimer(workTime);
    updateTitle("It's Work Time")
});

const showPomoCounts=()=>{
    const count=JSON.parse(localStorage.getItem("pomoCounts"));
    if(count>0){
        pomoCountsDisplay.style.display="flex";
    } 
    pomoCountsDisplay.firstElementChild.textContent=count;  
}

showPomoCounts();

const getTimeinSeconds=(timeString)=>{
    const[minutes, seconds]=timeString.split(":");
    return parseInt(minutes)*60 + parseInt(seconds);
}

resetBtn.addEventListener('click',()=>{
    stopTimer();
    timeDisplay.textContent="01:00";
})

pauseBtn.addEventListener('click',()=>{
    stopTimer();
    paused=true;
    updateTitle("Timer Paused")
})

resumeBtn.addEventListener('click',()=>{
    if(paused){
        const currentTime=timeDisplay.textContent;
        const seconds=getTimeinSeconds(currentTime);
        timerID=startTimer(seconds);
        paused=false;
        (!oneRoundCompleted)? updateTitle("It's Work Time") : 
            updateTitle("It's Break Time");
    }
})