// const qrTxt=document.querySelector("#inp-txt");
// const generateBtn=document.querySelector("#generate-btn");
// const downloadBtn=document.querySelector("#download-btn");
// const qrBody=document.querySelector("#qrbody");
// const optionBoxs=document.querySelector("#option-boxs");

// let size=256;

// generateBtn.addEventListener("click",(e)=>{
//     e.preventDefault(); // to stop refreshing of page
//     generateQRCode();
// });

// optionBoxs.addEventListener('change',(e)=>{
//     size=e.target.value;
//     generateQRCode();
// });

// function generateQRCode(){
//     qrBody.innerHTML="";
//     new QRCode(qrBody,{
//         text:qrTxt.value,
//         height:size,
//         width:size,
//         colorLight: "#ffff",
//         colorDark:"#0000",
//     });
// }


const qrTxt = document.getElementById("inp-txt");
const generateBtn = document.getElementById("generate-btn");
const downloadBtn=document.getElementById("download-btn")
const qrBody = document.getElementById("qrbody");
const optionBoxs = document.getElementById("option-boxs");

generateBtn.addEventListener("click", () => {
    console.log("Generate clicked"); // 👈 check console

    if (!qrTxt.value.trim()) {
        alert("Please enter text");
        return;
    }

    qrBody.innerHTML = "";

    new QRCode(qrBody, {
        text: qrTxt.value,
        width: optionBoxs.value || 256,
        height: optionBoxs.value || 256,
        colorLight: "#ffffff",
        colorDark: "#000000",
    });
});

downloadBtn.addEventListener("click", () => {
    const img = qrBody.querySelector("img");
    const canvas = qrBody.querySelector("canvas");

    if (img) {
        downloadBtn.href = img.src;
    } 
    else if (canvas) {
        downloadBtn.href = canvas.toDataURL("image/png");
    } 
    else {
        alert("Generate QR code first!");
    }
});

