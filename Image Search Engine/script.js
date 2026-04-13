const accessKey="d1-tbMIqFuM9qBeAWA67eqUT_dBCHIXbCZdaX4keat0"
const srchButton=document.querySelector('#btn');
const inpuTxt=document.querySelector('#search-box');
const showMore=document.querySelector('#show-more');
const forms=document.querySelector('#search-form');
const searchResult = document.querySelector('#search-result');

// d1-tbMIqFuM9qBeAWA67eqUT_dBCHIXbCZdaX4keat0

// 2H-SiNyR3WN7dH1mc3qsiwwXE4vDAeazEYj58KpcNDE

let keyword=""
let page=1;

async function searchImages(){
    keyword=inpuTxt.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`
    const response=await fetch(url);
    const data=await response.json();
    

    if(page === 1){
        searchResult.innerHTML="";
    }
    const results=data.results;

    results.map((result)=>{
        const image=document.createElement("img");
        image.src=result.urls.small;
        const imageLink=document.createElement("a");
        imageLink.href=result.links.html;
        imageLink.target="_blank";
        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    })

    showMore.style.display="block";
}

forms.addEventListener("submit",(e)=>{
    e.preventDefault();
    page=1;
    searchImages();
})

showMore.addEventListener("click",()=>{
    page++;
    searchImages();
})