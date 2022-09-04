
// categories news load and show start here
const newsDataLoad = () => {
const url = `https://openapi.programming-hero.com/api/news/categories`;
fetch(url)
.then(res => res.json())
.then(data => displayNewsLoad(data.data.news_category))
.catch(error => console.log(error))
};
const displayNewsLoad = news => {
    const newsContainer = document.getElementById('categories-container');
    newsContainer.textContent = '';
 

    newaSpecificCategory(1)

    news.forEach(news => { 
    
           const newsDiv = document.createElement('div')
           newsDiv.innerHTML = `
           <button class="border border-0 bg-light" onclick="newaSpecificCategory(${news.category_id})">${news.category_name}</button> `;
           newsContainer.appendChild(newsDiv);
    })};
// categories news load and show end here
// spinner 
const loaderSpinner = loader => {
  const loaderSpin = document.getElementById('lodear');
  if(loader){
      loaderSpin.classList.remove('d-none');
  }else{
      loaderSpin.classList.add('d-none');
  }
};

// specific category news load and showing start here 
const newaSpecificCategory = categoryId => {    
  // spinner calling    
  loaderSpinner(true)

  const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`;
  fetch(url)
  .then(res => res.json())
  .then(data => displayCategoryLoad(data.data))
  .catch(error => console.log(error))
};

const displayCategoryLoad = news => {
const newsContainer = document.getElementById('category-container');
newsContainer.textContent = '';

const noPhone = document.getElementById('nofound-Text')
if(news.length === 0){
   noPhone.classList.remove('d-none')
}else{
   noPhone.classList.add('d-none')
}

news.forEach(news => { 

     const newsDiv = document.createElement('div')
     newsDiv.classList.add('card')
     newsDiv.innerHTML = `
     <div class="row g-0 p-4">
     <div class=" col-12 col-md-3 text-center text-sm-center">
       <img src="${news.thumbnail_url}" class="img-fluid rounded-start myImage" alt="...">
     </div>
     <div class="col-12 col-md-9 p-3">
       <div class="card-body">
         <h5 class="card-title mb-5">${news.title}</h5>
         <p class="card-text mb-5"><small class="text-muted">${news.details.slice(0, 380)}...</small></p>
       
         <div class="d-flex flex-column flex-sm-column flex-lg-row align-items-center align-items-sm-center justify-content-lg-between align-items-lg-center"> 
             <div class="d-flex align-items-lg-center"> 
                <img src="${news.author.img}" class="img-fluid authorImage" alt="...">
                <div class="">
                  <h5 class="mb-0">${news.author.name ? news.author.name:'No data found'}</h5>
                  <p class="mb-0"><small> ${news.author.published_date}</small></p>
                </div>
              </div>
             <div> <p class="mb-0">  viewed: ${news.total_view ? news.total_view:'No data found'}</div>
             <p class="mb-0"> Rating: <b> ${news.rating.badge} ${news.rating.number} </b> </p>
             <button onclick="getDetailsNews('${news._id}')" class="btn btn-primary px-5 myButtonBorder" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
         </div>
      
       </div>
     </div>
   </div>
     `;
     newsContainer.appendChild(newsDiv);
})
// spinner end here 
loaderSpinner(false)
}

// specific category news load and showing end here 
// news individually showing start here in modal
const getDetailsNews = newsId => {
  const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
  fetch(url)
  .then(res => res.json())
  .then(data => displayDetailsNews(data.data[0]))
  .catch(error => console.log(error));
};

const displayDetailsNews = news => {
  
const newsContainer = document.getElementById('exampleModalLabel');
newsContainer.textContent = '';
newsContainer.innerText = news.title;

const modalBody = document.getElementById('modal-body');
modalBody.textContent = '';
const newsDetails = document.createElement('div');
newsDetails.classList.add('card');
newsDetails.innerHTML = `
<div class="row g-0 p-4">
<div class="col-md-12 text-center">
  <img src="${news.image_url}" class="img-fluid rounded-start myImage" alt="...">
</div>
<div class="col-md-12 p-3">
  <div class="card-body">

    <p class="card-text mb-3"><small class="text-muted">${news.details}...</small></p>
    <p class="card-title mb-5"> Category Id: ${news.category_id}. News Id: ${news._id}</p>
    <div class="d-flex justify-content-lg-between align-items-lg-center"> 
        <div class="d-flex align-items-lg-center"> 
           <img src="${news.author.img}" class="img-fluid authorImage" alt="...">
           <div class="">
             <h5 class="mb-0">${news.author.name ? news.author.name: 'No Data Found'}</h5>
             <p class="mb-0"><small> ${news.author.published_date}</small></p>
           </div>
         </div>
        <div> <p class="mb-0">  viewed: ${news.total_view ? news.total_view: 'No Data Found' }</div>
        <p class="mb-0"> Rating: <b> ${news.rating.badge} ${news.rating.number} </b> </p>
        <p class="card-title">Other: ${news.others_info.is_trending}</p>
    </div>
  </div>
</div>
</div>
`;
modalBody.appendChild(newsDetails);
}
// news individually showing end here in modal

// calling function to show news category
newsDataLoad()



