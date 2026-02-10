// const Button=document.querySelector("#btn");
// const bodycolr=document.querySelector('body');
// Button.addEventListener('click',()=>{
    // if(bodycolr.style.backgroundColor==='white'){
    //     bodycolr.style.backgroundColor='black'
    // }else{
    //     bodycolr.style.backgroundColor='white'
    // }
// });

const radio=document.querySelector('#switchCheckDefault');
const bodycolr=document.querySelector('body');
const label=document.querySelector('#labeler')
const head=document.querySelector('#heading');

radio.addEventListener('change',()=>{
    if(radio.checked){
        bodycolr.style.backgroundColor='black'
        label.style.color='white'
        label.innerHTML=`Switched to Dark Mode`
        head.style.color='white'
    }else{
        bodycolr.style.backgroundColor='white'
        label.style.color='black'
        label.innerHTML=`Switched to Light Mode`
        head.style.color='black'
    }
})


