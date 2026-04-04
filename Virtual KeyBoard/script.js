let textContainer=document.querySelector(".textContainer");
let enterKey=document.querySelector('.enter');
let space=document.querySelector('.space');
let deleteKey=document.querySelector('.delete');
let capsLock=document.querySelector('.capslock');
let allKeys=document.querySelectorAll('.key');
let iscaps=false;

function enterKeys(){
    let content=textContainer.innerText;
    let newContent=content+"\n";
    textContainer.innerText=newContent;
}

// function spaceKey(){
//     let content=textContainer.innerText;
//     let newContent=content+" ";
//     textContainer.innerText=newContent;
// }

function deleteKEys(){
    let content=textContainer.innerText;
    let newContent=content.slice(0,content.length-1);
    textContainer.innerText=newContent;
}

enterKey.addEventListener('click',function(){
    // let content=textContainer.innerText;
    // let newContent=content+"\n";
    // textContainer.innerText=newContent;
    enterKeys();
 })

//  space.addEventListener('click',function(){
//     spaceKey();
//  })

 deleteKey.addEventListener('click',()=>{
    deleteKEys();
 })

capsLock.addEventListener('click',()=>{
    iscaps=!iscaps;
    if(iscaps){
        capsLock.classList.add('active');
        for(let key of allKeys){
            if(key.classList.length>1){
                continue;
            }else{
                key.innerText=key.innerText.toUpperCase();
            }
        }
    }else{
        capsLock.classList.remove(('active'));
        for(let key of allKeys){
            if(key.classList.length>1){
                continue;
            }else{
                key.innerText=key.innerText.toLowerCase();
            }
        }
    }
})

for(let key of allKeys){

    if(
        key.classList.contains('delete') ||
        key.classList.contains('capslock') ||
        key.classList.contains('enter')
    ){
        continue;
    }

    key.addEventListener('click',()=>{

        if(key.classList.contains('space')){
            textContainer.innerText += " ";   // ✅ directly add space
        }else{
            textContainer.innerText += key.innerText;
        }

    });
}
