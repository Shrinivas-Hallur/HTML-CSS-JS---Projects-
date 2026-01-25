//for hour hand
//12hour=360deg
// 1hour = 360deg/12=30
// h hours=30h+m/2

// effect of minutes in hour hand
// 60min=30deg of hour hand
// 1min=30/60=1/2
// m mins=(1/2)m

//forminutes
// 60min=360deg 
// 1min=360/60=6deg 
// m min =6m deg

// For seconds
//60sec=360deg
//1sec=360/60=6deg
//s sec=6s deg

let hours=document.querySelector('#hour');
let minutes=document.querySelector('#min')
let seconds=document.querySelector('#sec')

function displayTime(){
    let date=new Date();

    // getting hour min and sec form date

    let hh=date.getHours();
    let mm= date.getMinutes();
    let ss=date.getSeconds();

    let hRotation=30*hh+mm/2
    let mRotation=6*mm
    let sRotation=6*ss

    hours.style.transform=`rotate(${hRotation}deg)`
    minutes.style.transform=`rotate(${mRotation}deg)`
    seconds.style.transform=`rotate(${sRotation}deg)`
}

setInterval(displayTime,1000)