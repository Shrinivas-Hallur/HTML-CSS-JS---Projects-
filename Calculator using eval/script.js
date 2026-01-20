let input=document.querySelector('#input-box');
let buttons=document.querySelectorAll('button');

let string=""
let arr=Array.from(buttons);
console.log(arr);
arr.forEach(button=>{
    button.addEventListener('click',(e)=>{
        if(e.target.innerHTML=='='){
            string=eval(string).toString(); //beacuse eval returns an number
            console.log(string);
            input.value=string;
            console.log(input.value);
        }
        else if(e.target.innerHTML=='AC'){
            string="";
            console.log(string);
            input.value=string;
            console.log(input.value);
        }else if(e.target.innerHTML=='DEL'){
            string=string.substring(0,string.length-1);
            console.log(string);
            input.value=string;
            console.log(input.value);
        }
        else{
            string+=e.target.innerHTML;
            console.log(string);
            input.value=string;
            console.log(input.value);
        }
    })
})


