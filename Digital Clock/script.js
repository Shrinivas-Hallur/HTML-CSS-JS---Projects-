const date=document.querySelector("#date");
const time=document.querySelector("#time");

function dateFunction(){
    const options={
        weekday:"short",
        year:"numeric",
        month:"short",
        day:"numeric",
    };
    const now=new Date();
    date.innerText=now.toLocaleDateString("en-GB",options);
}

function timeFunction(){
    const now=new Date();
    let hh=(now.getHours()>0?now.getHours()%12:12).toString().padStart(2,0);
    let mm=(now.getMinutes()).toString().padStart(2,"0");
    let ss=(now.getSeconds()).toString().padStart(2,"0");
    let ampm=now.getHours()>=12?"PM":"AM";
    time.innerText=`${hh}:${mm}:${ss} ${ampm}`
    dateFunction();
}

timeFunction();
setInterval(timeFunction,1000);

