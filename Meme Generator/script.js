const memeBtn = document.querySelector("#memebtn");
const loadText = document.querySelector("#loadtext");
const memeGenerate = document.querySelector("#meme-generator");
const memeTitle = document.querySelector("#memetitle");
const memeAuthor = document.querySelector("#memeauthor");
const memeImg = document.querySelector("#memeimg");
const loadImg=document.querySelector('#loadimg')

const updateDetails = (url, title, author) => {
  memeTitle.textContent = title;
  memeImg.setAttribute("src", url);
  memeAuthor.textContent = author;
  memeImg.style.display = "block";
};

const generateMeme = () => {
  loadText.textContent = "Loading...";
  loadImg.textContent="Image Loading..."

  fetch("https://meme-api.com/gimme/wholesomememes")
    .then((response) => {
        // console.log(response)
      return response.json();
    })
    .then((data) => {
        // console.log(data)
      updateDetails(data.url, data.title, data.author);
      loadText.textContent = "";
      loadImg.textContent="";
    })
    .catch((error) => {
    //   console.error(error);
      loadText.textContent = "Failed to load meme 😢";
    });
};

memeBtn.addEventListener("click", generateMeme);
