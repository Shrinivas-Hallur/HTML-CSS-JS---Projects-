let userScore=0;
let compScore=0;

const userscore_span=document.getElementById('user-score');
const compscore_span=document.getElementById('comp-score');

const scoreBoard_div=document.querySelector('.score-board');
const result_p=document.querySelector('.result>p');

const rock_div=document.getElementById('r');
const paper_div=document.getElementById('p');
const scissor_div=document.getElementById('s');

function main(){
    rock_div.addEventListener('click',()=>{
        game('r');
    });

    paper_div.addEventListener('click',()=>{
        game('p');
    });

    scissor_div.addEventListener('click',()=>{
        game('s');
    });
}

main();
// rock_div.addEventListener('click',()=>{
//     console.log('you clicked rock');
//     game('r');
// });

// paper_div.addEventListener('click',()=>{
//     console.log('you clicked paper');
//     game('p');
// });

// scissor_div.addEventListener('click',()=>{
//     console.log('you clicked scissor');
//     game('s');
// });

function game(userChoice){
    // console.log("user choice: "+userChoice);
    // console.log("Computer Choice: "+getCompChoice());

    const computerChoice=getCompChoice();
    switch(userChoice+computerChoice){
        case "rs":
        case "pr":
        case "sp":
            console.log(userChoice+computerChoice);
            console.log("user wins");
            win(userChoice, computerChoice);
            break;
        case "rp":
        case "ps":
        case "sr":
            console.log(userChoice+computerChoice); 
            console.log("Computer wins");
            lose(userChoice,computerChoice);
            break;
        case "rr":
        case "pp":
        case "ss":
            console.log(userChoice+computerChoice);
            console.log("It's a DRAW");
            draw(userChoice, computerChoice);
    }
    
}

function getCompChoice(){
    const choices=['r','p','s'];
    const randomNumber=Math.floor(Math.random()*3);
    return choices[randomNumber];
}

function win(userChoice,compChoice){
    userScore++;
    userscore_span.innerHTML=userScore;
    compscore_span.innerHTML=compScore;
    result_p.innerHTML=`${convertToWord(userChoice)}${smallUser()} beats ${convertToWord(compChoice)}${compUser()}. You WIN!🔥`; 
    const userChoice_div=document.getElementById(userChoice);
    userChoice_div.classList.add('green-glow');
    setTimeout(()=>{userChoice_div.classList.remove('green-glow');},500);
    userscore_span.classList.add('on-win');
    setTimeout(()=>{userscore_span.classList.remove('on-win');},500)
}

function lose(userChoice,compChoice){
    compScore++;
    userscore_span.innerHTML=userScore;
    compscore_span.innerHTML=compScore;
    result_p.innerHTML=`${convertToWord(compChoice)}${smallUser()} loses to ${convertToWord(userChoice)}${compUser()}. You LOSE!😒`; 
    const userChoice_div=document.getElementById(userChoice);
    userChoice_div.classList.add('red-glow');
    setTimeout(()=>{userChoice_div.classList.remove('red-glow');},500);
    compscore_span.classList.add('on-win');
    setTimeout(()=>{compscore_span.classList.remove('on-win');},500)
}

function draw(userChoice,compChoice){
    userscore_span.innerHTML=userScore;
    compscore_span.innerHTML=compScore;
    result_p.innerHTML=`${convertToWord(userChoice)}${smallUser()} equals ${convertToWord(compChoice)}${compUser()}. It's a TIE!👍`; 
    const userChoice_div=document.getElementById(userChoice);
    userChoice_div.classList.add('gray-glow');
    setTimeout(()=>{userChoice_div.classList.remove('gray-glow');},500);
}

function convertToWord(letter){
    if(letter==='r'){
        return "Rock"
    }else if(letter==='p'){
        return "Paper"
    }else if(letter==='s'){
        return "Scissor"
    }
}

function smallUser(){
    return "user".fontsize(5).sup(); 
}

function compUser(){
    return "comp".fontsize(5).sup(); 
}

// console.log(getCompChoice());
