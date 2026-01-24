let input=document.querySelector('#inp-txt');
// let range=document.querySelector('#range1');
// let rangeValue=document.querySelector('#range-value');
let otpLengths = document.querySelectorAll('input[name="otpLength"]');
let lowerCase=document.querySelector('#lower');
let upperCase=document.querySelector('#upper');
let nums=document.querySelector('#numbers');
let symbols=document.querySelector('#symbol');
let btn=document.querySelector('#generate');
let copybtn=document.querySelector('#copyBtn');

// rangeValue.textContent=range.value;
// range.addEventListener('input',()=>{
//     rangeValue.textContent=range.value;
// });

btn.addEventListener('click',()=>{
    input.value=generateOTP();
});

let lowerChars="abcdefghijklmnopqrstuvwxyz";
let upperChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let numBers="0123456789"
let symBols="~!@#$%^&*()_+-={}[]|:;'<>,.?/";


// function generateOTP(){
//     let genOTP="";

//     let allChars=""

//     allChars+=lowerCase.checked?lowerChars: "";
//     allChars+=upperCase.checked?upperChars: "";
//     allChars+=nums.checked?numBers: "";
//     allChars+=symbols.checked?symBols: "";

//     if(allChars=="" || allChars.length==0){
//         return genOTP;
//     }

//     let i=1
//     while(i<=range.value){
//         genOTP+=allChars.charAt(Math.floor(Math.random()*allChars.length));
//         i++;
//     }
//     return genOTP;
// }

// copybtn.addEventListener('click',()=>{
//     if(input.value !==""|| input.value.length>0){
//         navigator.clipboard.writeText(input.value);
//         // copybtn.innerText="check";
//         copybtn.title="OTP Copied";
//         // setTimeout(()=>{
//         //     copybtn.innerHTML="content_copy"
//         //     copybtn.title="";
//         // },3000);
//     }
// });


function getSelectedLength() {
    let length = 4; // default
    otpLengths.forEach(radio => {
        if (radio.checked) {
            length = parseInt(radio.value);
        }
    });
    return length;
}

function generateOTP(){
    let genOTP = "";
    let allChars = "";

    
    allChars+=lowerCase.checked?lowerChars: "";
    allChars+=upperCase.checked?upperChars: "";
    allChars += nums.checked ? numBers : "";
    allChars+=symbols.checked?symBols: "";


    if(allChars.length === 0){
        return genOTP;
    }

    let otpLength = getSelectedLength();

    for(let i = 0; i < otpLength; i++){
        genOTP += allChars.charAt(
            Math.floor(Math.random() * allChars.length)
        );
    }

    return genOTP;
}


copybtn.addEventListener('click', () => {
    if (input.value !== "" && input.value.length > 0) {

        navigator.clipboard.writeText(input.value);

        // change icon to check
        copybtn.classList.remove("bi-copy");
        copybtn.classList.add("bi-check-lg");
        copybtn.title = "OTP Copied";

        setTimeout(() => {
            copybtn.classList.remove("bi-check-lg");
            copybtn.classList.add("bi-copy");
            copybtn.title = "";
        }, 2000);
    }
});
