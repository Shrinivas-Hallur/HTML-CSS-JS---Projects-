const input=document.querySelector('input');
const btn=document.querySelector('button');
const dictapp=document.querySelector('.dictionary-app');

async function dictionaryFn(word){
    const res=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(res =>res.json())

    // console.log(res);
    return res[0]
}

btn.addEventListener('click',fetchndCreateCard)

async function fetchndCreateCard(){
    const data=await dictionaryFn(input.value);

    console.log(data);

    let partsOfSpeechArray=[]

    for(let i=0;i<data.meanings.length;i++){
        partsOfSpeechArray.push(data.meanings[i].partOfSpeech);
    }

    dictapp.innerHTML=`<div class="card">
                <div class="property">
                    <span>Word:</span>
                    <span>${data.word}</span>
                </div>

                <div class="property">
                    <span>Phonetics:</span>
                    <span>${data.phonetic}</span>
                </div>

                <div class="property">
                    <span>
                    <audio controls src="${data.phonetics[0].audio || "No Audio available"}"></audio>
                    </span>
                </div>

                <div class="property">
                    <span>Definition:</span>
                    <span>${data.meanings[0].definitions[0].definition || "No Definitions available"}</span>
                </div>

                <div class="property">
                    <span>Example:</span>
                    <span>${data.meanings[0].definitions[0].example || "No Example Available"}</span>
                </div>

                <div class="property">
                    <span>Parts of Speech:</span>
                    <span>${partsOfSpeechArray.join(",")}</span>
                </div>
            </div>`
}
// dictionaryFn('Laptop');