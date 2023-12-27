let imgsearch = document.querySelector('.imgsearch');
let editorImg =  document.querySelector('.editorimg')
let searchEnter = document.querySelector('.searchenter')
let searchClick = document.querySelector('.searchclick')
let form = document.querySelector('form')
let bsub = document.querySelector('.bsub')
let photos = document.querySelector('.photos')
let videos = document.querySelector('.videos')
let allImg = document.querySelector('.all')
let searchQuery = document.querySelector('.searchquery')
let discoverMore = document.querySelector('.discovermore')
let discoverVideo = document.querySelector('.discovervideo')
let queryRes
let pageMore = 1
function handleChange(e) {
let group = e.value;
// imgsearch.placeholder = `${group}`;
imgsearch.placeholder = `Search`;
}



// Show Videos
async function videoSearch() {
  let videoUrl = await fetch(`https://pixabay.com/api/videos/?key=37860007-782d282111110936664077067&q=${queryRes}&page=${pageMore}&per_page=24`);
  let vRaw = await videoUrl.json();
  let videoData = vRaw.hits;
  let newVideoHtml = ''; // Variable to store the new HTML content for videos

  for (let i = 0; i < videoData.length; i++) {
    let vItem = videoData[i];
    let vId = vItem.id;
    let vRes = vItem.videos.medium.url;
    let vName = vItem.tags;
    let vSrc = vItem.pageURL;
    let vPicId = vItem.picture_id;
    if (i / 4 === 0) {
      newVideoHtml += `<div class="row" style="width:97%; margin: 0 auto;">`;
    }
    
    newVideoHtml += `<div class="col-lg-3">
    <div class="img-box">
      <a href="videos.html?id=${vId}">
        <video width="327" height="240" controls>
          <source src="${vRes}" type="video/mp4">
        </video>
         
      </a>
    </div>
    </div>`;
    searchClick.innerHTML = ``;
    editorImg.style.display = `none`;
    videos.innerHTML = ``;
    searchEnter.innerHTML = ``
  }

  // Append the new HTML content for videos
  videos.innerHTML += newVideoHtml;
  if(pageMore === 1){
      discoverMore.style.display = 'none'
      discoverVideo.style.display = 'block'
      pageMore++
      videos.innerHTML = ``
      videos.innerHTML += newVideoHtml;

    }
        return newVideoHtml;  //Return the HTML string and return statement should be outside the loop

}



// Image based on search
async function imgSearchQ() {
  let searchUrl = await fetch(`https://pixabay.com/api/?key=37860007-782d282111110936664077067&q=${queryRes}&page=${pageMore}&per_page=24`);
  let rawSearchUrl = await searchUrl.json();
  let opSearch = rawSearchUrl.hits;
  let newHtml = ''; // Variable to store the new HTML content

  for (let i = 0; i < opSearch.length; i++) {
    let sImgItem = opSearch[i];
    let sImgId = sImgItem.id;
    let sImgRes = sImgItem.webformatURL;
    let sImgName = sImgItem.tags;

    if (i / 4 === 0) {
      newHtml += `<div class="row" style="margin: 0;">`;
    }
    newHtml += `<div class="col-lg-3">
    <div class="img-box">
      <a href="page.html?id=${sImgId}">
        <img class="img-fluid" id="${sImgId}" src="${sImgRes}" alt="${sImgName}"/>
        <div class="transparent-box">
          <div class="caption">
            <p class="opacity-low">${sImgName}</p>
          </div>
        </div> 
      </a>
    </div>
    </div>`;

    photos.style.display = `none`;
    videos.innerHTML = ``;
    editorImg.innerHTML = ``;
    allImg.innerHTML = ``;
  }

  // Clear existing HTML content before appending new results
  searchClick.innerHTML = newHtml;
}


// Search query and click

async function mySearchResultClick(e){
 e.preventDefault()
 queryRes =  document.querySelector('input').value
 searchQuery.innerHTML = `<h3>Results for ${queryRes}</h3>`
 let selectedgroup = document.querySelector('.selectedgroup').value
 let selectOption = selectedgroup
 if(selectOption === 'Photo'){
  imgsearch.value = imgsearch.placeholder   
  console.log(`Photos are here`) 
  searchClick.innerHTML += `
  ${imgSearchQ()}
  `
  searchClick.innerHTML = ``
  photos.innerHTML = ``
  videos.innerHTML = ``
  editorImg.innerHTML = ``

}
else if(selectOption === 'Video'){
  imgsearch.value = imgsearch.placeholder    
  console.log(`Videos are here`) 
  // videoSearch()
  let htmlVideo = await videoSearch()
  videos.innerHTML += `<div class="img-box">
  ${htmlVideo}
  </div>`
  photos.innerHTML = ``
  allImg.innerHTML = ``
  editorImg.innerHTML = ``
}

 
}


//Search by click    
bsub.addEventListener('click', mySearchResultClick)


// Search by submit
form.addEventListener('submit', mySearchResultClick)



  
//Editor's Choice
async function imgFetch(){
   
    let editImgUrl = await fetch(`https://pixabay.com/api/?key=37860007-782d282111110936664077067&editors_choice&page=${pageMore}&per_page=24`)
    let editRawData = await editImgUrl.json()
    let showImgData = editRawData.hits
    let imgFres = '';
    console.log(showImgData)
    for(let i = 0; i < showImgData.length; i++){
        let picItem = showImgData[i]
        let picId = picItem.id
        let imgRes = picItem.webformatURL
        let imgWidth = picItem.webformatWidth
        let imgHeight = picItem.webformatHeight
        let imgName = picItem.tags

        if(i % 4 === 0){
          editorImg.innerHTML += `<div class="row">`
        }

        editorImg.innerHTML += `<div class="col-lg-3">
        <div class="img-box">
        <a href="page.html?id=${picId}">
        <img id="${picId}" src="${imgRes}" alt="${imgName}"/>
        <div class="transparent-box">
        <div class="caption">
          <p class="opacity-low">${imgName}</p>
        </div>
      </div> 
        </a>
      </div>
      </div>
        `
    
    }
}

imgFetch()


discoverMore.addEventListener('click', function(){
  pageMore++
  imgSearchQ()
})

discoverMore.addEventListener('click', function(){
    pageMore++
    imgFetch()
})

discoverVideo.addEventListener('click', function(){
  pageMore++
  videoSearch()

})


//Bootstrap 5 nav
