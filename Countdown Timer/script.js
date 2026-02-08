const startbtn=document.querySelector("#start-btn");
const inp=document.querySelector('input');
const display=document.querySelector("#display-count");
const result=document.querySelector("#result");

startbtn.addEventListener('click',()=>{
    let i=Number(inp.value);
    result.innerHTML="";
    const timer=setInterval(()=>{
        display.innerHTML=i;
        // inp.value=i;
        if(i<=0){
            clearInterval(timer);
            result.innerHTML=`Time's up`
        }
        i--;
    },1000)
});