const inputText=document.getElementById('input-text');
const charCount=document.getElementById('char-count');
const overflowresult=document.getElementById('overflow-result')

inputText.addEventListener('input',(e)=>{
    // let length=e.target.value.length;
    let length=inputText.textLength;
    charCount.innerText=`${length}/100 characters`

    //default conditions
    charCount.style.color = 'black';
    overflowresult.textContent = '';
    charCount.style.fontSize='40px';
    overflowresult.classList.remove('blink');

    
    if(length>0 && length<=100){
        charCount.style.color='green'
    }
    
    if(length===100){
        overflowresult.textContent=`Limit Reached`
        overflowresult.style.color='green'
        charCount.style.fontSize='50px'
        overflowresult.classList.add('blink');
    }

    if(length>100){
        charCount.style.color='red'
        overflowresult.textContent=`Limit Exceeded`
        overflowresult.style.color='red'
        charCount.style.fontSize='50px'
        overflowresult.classList.add('blink');
    }
});