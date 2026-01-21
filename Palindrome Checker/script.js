const inp=document.querySelector('#input-text');
const check=document.querySelector('#check')
const para=document.querySelector('#result')
para.classList.add("blink");

check.addEventListener('click',(e)=>{
    let data=inp.value.toLowerCase().replace(/[^a-z0-9]/g,"")
    // console.log(data);

    if (data === "") {
        para.textContent = "";
        return;
    }

    let reversedString="";
    for(let i=data.length-1;i>=0;i--){
        reversedString+=data[i];
    }
    // console.log(reversedString);
    para.classList.add("blink");

    if(data===reversedString){
        para.textContent=`${inp.value} is a Palindrome.`
        para.style.color='green';
    }else{
        para.textContent=`${inp.value} is not a Palindrome.`
        para.style.color='red';
    }
    
    inp.value=""
    // let reversedata=data.split("").reverse().join("")
    // console.log(reversedata);
});

inp.addEventListener('input', () => {
    para.textContent = "";
    para.classList.remove("blink");
});
