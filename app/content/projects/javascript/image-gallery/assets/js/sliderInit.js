// Variables for initialization of the image slider
var sliderDivs = document.getElementById('sliderDivs'),
    sliderThumbnails = document.getElementById('sliderThumbnails'),
    slides = document.getElementsByClassName('image-wrapper'),
    slidesLength = slides.length,
    sliderArrows = document.getElementById('sliderArrows'),
    playButton = document.getElementById('playButton'),
    stoButton = document.getElementById('stopButton');
    

// Default class name for thumbnainls styling
var classNameForThumbnails = 'slider-container__thumbnails__image';


// A function to retrieve the attribute src of all images of the image gallery
function gatherImages () {

    var imagesArray = new Array();
    
    for(i = 0; i < slidesLength; i++) {
            
        imagesArray.push(sliderDivs.children[i].children[0].children[0].src);    
    
    }
    
    return imagesArray;
}

// A function to dynamically create thumbnail elements, as well as all attributes and classes needed to control them
function createThumbnails () {
    
    var imagesArray = gatherImages();
    var thumbnailWidth = sliderDivs.children[0].offsetWidth / slides.length;

    for(i = 0; i < imagesArray.length; i++) {
        
        var imagediv = document.createElement('div');
        var imageElement = document.createElement('img');
        
        imageElement.src = imagesArray[i];
        imagediv.appendChild(imageElement);
        imagediv.setAttribute('onclick', 'playSelected('+ i +')');
        imagediv.style.maxWidth = thumbnailWidth + 'px';
        addClassToElement(imagediv, classNameForThumbnails);
        sliderThumbnails.appendChild(imagediv);
    }
}

// Helpers classes to change an element's class name
function addClassToElement(element, className) {
    
    element.classList.add(className);
}

function removeClassFromElement(element, className) {
    
    element.classList.remove(className);
}