const newsDataLoad = () => {
const url = `https://openapi.programming-hero.com/api/news/categories`;
fetch(url)
.then(res => res.json())
.then(data => displayNewsLoad(data.data.news_category))
.catch(error => console.log(error))

}


const displayNewsLoad = news => {
    const newsContainer = document.getElementById('categories-container');
    newsContainer.textContent = '';
    // newaSpecificCategory(1)
    news.forEach(news => { 
           const newsDiv = document.createElement('div')
           newsDiv.innerHTML = `
           <button class="border border-0 bg-light" onclick="newaSpecificCategory(${news.category_id})">${news.category_name}</button>
           `;
           newsContainer.appendChild(newsDiv);
    })
};

newsDataLoad()

