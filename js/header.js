const mediaElements = document.querySelectorAll(".Header-Image .Header-Media");
const leftBtn = document.querySelector(".Navigation-Button-Left");
const rightBtn = document.querySelector(".Navigation-Button-Right");

let currentIndex = 0;
let autoChangeTimer = null;
const AUTO_CHANGE_DELAY = 5000; 

mediaElements[0].style.display = "block";  
for (let i = 1; i < mediaElements.length; i++) {
    mediaElements[i].style.display = "none";  
}

mediaElements[0].addEventListener("ended", () => {
    console.log("Video ended, showing first image");
    mediaElements[0].style.display = "none";  
    currentIndex = 1;
    mediaElements[currentIndex].style.display = "block";  
    startAutoChange(); 
});

function startAutoChange() {
    stopAutoChange();  
    
    if (currentIndex > 0) {
        autoChangeTimer = setInterval(() => {
            console.log("Auto-changing to next image");
            nextSlide();
        }, AUTO_CHANGE_DELAY);
    }
}

function stopAutoChange() {
    if (autoChangeTimer) {
        clearInterval(autoChangeTimer);
        autoChangeTimer = null;
    }
}

function nextSlide() {
    mediaElements[currentIndex].style.display = "none";
    
    currentIndex++;
    
    if (currentIndex >= mediaElements.length) {
        currentIndex = 0;  
    }
    
    mediaElements[currentIndex].style.display = "block";
    
    if (currentIndex === 0) {
        mediaElements[0].play();
        stopAutoChange();  
    } else {
        startAutoChange();
    }
}

function prevSlide() {
    mediaElements[currentIndex].style.display = "none";
    
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = mediaElements.length - 1; 
    }
    
    mediaElements[currentIndex].style.display = "block";
    
    if (currentIndex === 0) {
        mediaElements[0].play();
        stopAutoChange() 
    } else {
        startAutoChange();
    }
}

rightBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    
    stopAutoChange();
    
    nextSlide();
});

leftBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    
    stopAutoChange();
    
    prevSlide();
});

setTimeout(() => {
    if (currentIndex === 0 && mediaElements[0].tagName === "VIDEO") {
        if (mediaElements[0].paused || mediaElements[0].readyState < 2) {
            console.log("Video not playing, starting with images");
            mediaElements[0].style.display = "none";
            currentIndex = 1;
            mediaElements[currentIndex].style.display = "block";
            startAutoChange();
        }
    }
}, 3000);