const days=document.querySelector("#day");
const hours=document.querySelector("#hour");
const mins=document.querySelector("#mins");
const secs=document.querySelector("#seconds")


const updateCountDown=(deadline)=>{
    const currentTime=new Date();
    const timeDifference=deadline-currentTime;
    let calcSecs=Math.floor(timeDifference/1000)%60;
    secs.textContent=calcSecs.toString().padStart(2, "0");;
    let calcMins=Math.floor(timeDifference/1000/60)%60;
    mins.textContent=calcMins.toString().padStart(2, "0");;
    let calcHrs=Math.floor(timeDifference/1000/60/60)%24;
    hours.textContent=calcHrs.toString().padStart(2, "0");;
    let calcDays=Math.floor(timeDifference/1000/60/60/24);
    days.textContent=calcDays.toString().padStart(2, "0");;
    // console.log(calcSecs);
}

const countDown=(targetDate)=>{
    setInterval(()=>updateCountDown(targetDate),1000);
}

const targetDate=new Date("April 12 2026 00:00");
countDown(targetDate);