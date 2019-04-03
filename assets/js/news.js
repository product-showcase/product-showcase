let news = [];
let page = 5;

async function fetchNews() {
  let url =
      `https://newsapi.org/v2/everything?pageSize=${page}&q=Apple&from=2019-03-30&sortBy=popularity&apiKey=ef0baffbb28d4777842bb510f2dcc979`;
  let results = await fetch(url);
  let data = await results.json();
  news = data.articles;
  render();
}

function render() {
  document.getElementById(
    "total-stories"
  ).innerHTML = `<center>Number of stories currently: ${news.length}</center>`;
  document.getElementById("news-stories").innerHTML = news.map(
    article => `
        <div class="news-story d-flex border border-success rounded p-5 m-2">
        <div class="news-content col-8">
          <h2>${article.title}</h2>
          <p>${article.source.name}</p>
          <p>${moment(article.publishedAt)
            .startOf("hour")
            .fromNow()}</p>
          <p>${article.description}</p>
          <p><a href="${article.url}">Read More</a></p>
        </div>
        <div class="news-imgage col-4">
          <img class='img-thumbnail'
            src="${article.urlToImage}"
          />
        </div>
      </div>`
  );
}

let loadMore = () => {
  page += 5;
  fetchNews();
};


let loadBtn = document.querySelector('#load-more');
loadBtn.addEventListener('click', loadMore);

fetchNews();