//enter key activationn
document.getElementById("search").addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        document.getElementById("search-btn").click()
    }
})


const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '20271503-16f84ef3fd9398e3f86e59243';

const getImages = (query) => {
    //toggleSpinner("false")
    fetch(`https://pixabay.com/api/?key=${KEY}&q=${query}`)
        .then(response => response.json())
        .then(data => showImages(data.hits))
        .catch(err => console.log(err))
}

// show images 
const showImages = (images) => {
    imagesArea.style.display = 'block';
    gallery.innerHTML = '';
    // show gallery title
    galleryHeader.style.display = 'flex';
    
    images.forEach(image => {
        let div = document.createElement('div');
        div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
        div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
        gallery.appendChild(div)
        //toggleSpinner("true")
    })
}

let slideIndex = 0;
const selectItem = (event, img) => {
    let element = event.target;
    let item = sliders.indexOf(img);
    if (item === -1) {
        element.classList.add('added');
        sliders.push(img);
    }
    else {
        alert('Hey, Already added !')  
        element.classList.remove('added');
        sliders.pop(img);
    }
}

var timer
const createSlider = () => {
    // check slider image length
    console.log(sliders)
    if (sliders.length < 2) {
        alert('Select at least 2 image.')
        return 0;
    }
    // crate slider previous next area
    sliderContainer.innerHTML = '';
    const prevNext = document.createElement('div');
    prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
    prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

    sliderContainer.appendChild(prevNext)
    document.querySelector('.main').style.display = 'block';
    // hide image aria
    imagesArea.style.display = 'none';
    const duration = document.getElementById('duration').value || 1000;
    // if(duration<0){
    //     alert("Time can't be negative")
    //     getImages(query)
    //     return
    // }
    sliders.forEach(slide => {
        console.log(slide)
        let item = document.createElement('div')
        item.className = "slider-item";
        item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
        sliderContainer.appendChild(item)
    })
    changeSlide(0)
    timer = setInterval(function () {
        slideIndex++;
        changeSlide(slideIndex);
    }, duration);
}

// change slider index 
const changeItem = index => {
    changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

    const items = document.querySelectorAll('.slider-item');
    if (index < 0) {
        slideIndex = items.length - 1
        index = slideIndex;
    };

    if (index >= items.length) {
        index = 0;
        slideIndex = 0;
    }

    items.forEach(item => {
        item.style.display = "none"
    })

    items[index].style.display = "block"
}

searchBtn.addEventListener('click', function () {
    document.querySelector('.main').style.display = 'none';
    clearInterval(timer);
    const search = document.getElementById('search');
    getImages(search.value)
    sliders.length = 0;
})

sliderBtn.addEventListener('click', function () {
    createSlider()
})

// const toggleSpinner = (isTrue) =>{
//     const spinner = document.getElementById("loadingSpinner")
//     const galleryConatainer = document.getElementById("gallery-container")
//     if(isTrue === "false"){
//         spinner.classList.remove("d-none")
//     }
//     else{
//         spinner.classList.add("d-none")
//     }
// }
