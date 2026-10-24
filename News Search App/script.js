const apiKey = "4f5412d058524183b48d58d36aaca156";

const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomnews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log(data)
    // console.log(data.articles)
    return data.articles;
  } catch (error) {
    console.log("Error Fetching News", error);
    return [];
  }
}

searchButton.addEventListener("click", async () => {
  const query = searchField.value;
  if (query !== "") {
    try {
      const articles = await fetchNewsQuery(query);
      displayBlogs(articles);
    } catch (error) {
      console.log("Error Fetching news...", error);
    }
  }
});

async function fetchNewsQuery(query) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=20&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log(data)
    // console.log(data.articles)
    return data.articles;
  } catch (error) {
    console.log("Error Fetching News", error);
    return [];
  }
}
// fetchRandomnews();

function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("block-card");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("thumbnail");
    if (article.urlToImage) {
      const img = document.createElement("img");

      img.src = article.urlToImage;
      img.alt = article.title || "News image";

       img.addEventListener("error", () => {

        img.remove();

        imgContainer.textContent =
          "News thumbnail not available";

      });

      imgContainer.appendChild(img);
    } else {
      imgContainer.textContent = "News thumbnail not available";
    }

    // img.src = article.urlToImage;
    // // console.log(article.urlToImage)
    // img.alt = article.title;
    const title = document.createElement("h2");
    const truncatedTitle =
      article.title.length > 30
        ? article.title.slice(0, 30) + "....."
        : article.title;
    title.textContent = truncatedTitle;
    const desp = document.createElement("p");
    const truncatedDesp =
      article.description.length > 120
        ? article.description.slice(0, 120) + "...."
        : article.description;
    desp.textContent = truncatedDesp;
    // desp.textContent=article.description

    blogCard.appendChild(imgContainer);
    blogCard.appendChild(title);
    blogCard.appendChild(desp);
    blogCard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
    blogContainer.appendChild(blogCard);
  });
}

// const blogContainer = document.getElementById("blog-container");

(async () => {
  try {
    const articles = await fetchRandomnews();
    // console.log(articles)
    displayBlogs(articles);
  } catch (error) {
    console.log("error fetching random news", error);
  }
})();
