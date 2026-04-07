let textarea=document.querySelector("#txtarea");
let listen=document.querySelector("#btn");
let select=document.querySelector("#slct");

let speech=new SpeechSynthesisUtterance();

let voices=[];

let voiceSelect=select;

window.speechSynthesis.onvoiceschanged=()=>{
    voices=window.speechSynthesis.getVoices();
    speech.voice=voices[0];

    voices.forEach((voice,i)=>(voiceSelect.options[i]=new Option(voice.name,i)))
};

voiceSelect.addEventListener("change",()=>{

    speech.voice=voices[voiceSelect.value];
})

listen.addEventListener('click',()=>{
    speech.text=textarea.value;
    window.speechSynthesis.speak(speech);
});