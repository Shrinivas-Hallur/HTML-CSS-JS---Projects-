let input=document.querySelector('#inp-tsk');
let savebtn=document.querySelector('#save-btn');
let tasklist=document.querySelector('#adds-tsk');

savebtn.addEventListener('click',()=>{
    const li=document.createElement('li');//<li></li>
    li.innerText=input.value;//<li>data</li>

    const button=document.createElement('button'); //<button></button>
    button.innerText='X';//<button>X</button>

    button.addEventListener('click',()=>{
        li.remove();
    });

    li.appendChild(button);//<li>data <button>X</button></li>

    tasklist.appendChild(li);//<ol><li>data <button>X</button></li></ol>

    input.value="";
});

