// Default options for the image gallery
var options = {
    autoplay: true, // whether to begin an automatic slideshow or not
    sliderDelay: 5000, // duration of each slide when the autoplay option is true
    showThumbnails: true, // option to display thumbnail
    showCaptions: true, // option to display the caption
    imageTrsansition: 'fade', // 3 options: slideLeft, sliderRight, fade
    // default class names for elements to be controled by script
    classNameForDisplay: 'image-wrapper--active',
    classNameForThumbnail: 'slider-container__thumbnails__image--active'
}

// Default value of the image to be displayed when image gallery is loaded
var slideDisplay = 0;
var startSlider;

// Checking if the options to show thumbnails is true
if (options.showThumbnails) {
    createThumbnails();
    addClassToElement(sliderThumbnails.children[slideDisplay], options.classNameForThumbnail);
}

// Checking whether to display or not based on the option selected
if(options.showCaptions) {
    for(i=0; i < slidesLength; i++) {
        sliderDivs.children[i].children[1].style.display = 'block';
    }
} else {
    for(i=0; i < slidesLength; i++) {
        sliderDivs.children[i].children[1].style.display = 'none';
    }
}

// Checking if autoplay is true and beginning the slide show
if (options.autoplay) {
    startSlider = setInterval(playNext, options.sliderDelay);
}

// Adding function to play the previous image when the left arrow is clicked
sliderArrows.children[0].addEventListener('click', playPrevious);

// Adding function to play the nex image when the right arrow is clicked
sliderArrows.children[1].addEventListener('click', playNext);

playButton.addEventListener('click', start);

stoButton.addEventListener('click', stop);

// A function that starts the slider
function start () {
    if(!options.autoplay) {
        startSlider = setInterval(playNext, options.sliderDelay);
        options.autoplay = true;  
    }
}

// A function to stop the slider
function stop () {
    if(options.autoplay) {
        clearInterval(startSlider);
        options.autoplay = false;
    }
}

// A function to remove the class that is used to display an image, as well as removing the opacity effecr from thumbnail
function reset () {
    
    for (i=0; i < slidesLength; i++) {
        removeClassFromElement(slides[i], options.classNameForDisplay);
    }
    
    for (i=0; i < slidesLength; i++) {
        removeClassFromElement(slides[i].children[0], options.imageTrsansition);
    }
    
    if(options.showThumbnails) {
        for (i=0; i < slidesLength; i++) {
            removeClassFromElement(sliderThumbnails.children[i], options.classNameForThumbnail);
        }  
    }   
}

// A function to display the appropriate image when a thumbnail is clicked
function playSelected(slideIndex) {
    
    reset();
    slideDisplay = slideIndex;
    addClassToElement(slides[slideDisplay], options.classNameForDisplay);
    addClassToElement(slides[slideDisplay].children[0], options.imageTrsansition);
    if(options.showThumbnails) {
        addClassToElement(sliderThumbnails.children[slideDisplay], options.classNameForThumbnail);  
    }
}

// A function to display the next image and thumbnail if the option to show the thumbnails is true
function playNext () {
    
    if (slideDisplay == slidesLength - 1) {
        reset();
        slideDisplay = 0;
        addClassToElement(slides[slideDisplay], options.classNameForDisplay);
        addClassToElement(slides[slideDisplay].children[0], options.imageTrsansition);
        if(options.showThumbnails) {
          addClassToElement(sliderThumbnails.children[slideDisplay], options.classNameForThumbnail);  
        } 
    } else {
        reset();
        slideDisplay++;
        addClassToElement(slides[slideDisplay], options.classNameForDisplay);
        addClassToElement(slides[slideDisplay].children[0], options.imageTrsansition);
        if(options.showThumbnails) {
          addClassToElement(sliderThumbnails.children[slideDisplay], options.classNameForThumbnail);  
        }
    }   
}

// A function to display the previous image and thumbnail if the option to show the thumbnails is true
function playPrevious () {
    
    if (slideDisplay == 0) {
        reset();
        slideDisplay = slidesLength - 1;
        addClassToElement(slides[slideDisplay], options.classNameForDisplay);
        addClassToElement(slides[slideDisplay].children[0], options.imageTrsansition);
        if(options.showThumbnails) {
          addClassToElement(sliderThumbnails.children[slideDisplay], options.classNameForThumbnail);  
        }
    } else {
        reset();
        slideDisplay--;
        addClassToElement(slides[slideDisplay], options.classNameForDisplay);
        addClassToElement(slides[slideDisplay].children[0], options.imageTrsansition);
        if(options.showThumbnails) {
          addClassToElement(sliderThumbnails.children[slideDisplay], options.classNameForThumbnail);  
        }
    }    
}
