const mediaElements = document.querySelectorAll(".Header-Image .Header-Media");
const leftBtn = document.querySelector(".Navigation-Button-Left");
const rightBtn = document.querySelector(".Navigation-Button-Right");

let currentIndex = 0;
let autoChangeTimer = null;
const AUTO_CHANGE_DELAY = 5000; 

if (mediaElements.length > 0) {
    mediaElements[0].style.display = "block";
    for (let i = 1; i < mediaElements.length; i++) {
        mediaElements[i].style.display = "none";
    }

    if (mediaElements[0].tagName === "VIDEO") {
        mediaElements[0].addEventListener("ended", () => {
            console.log("Video ended");
            
            if (mediaElements.length > 1) {
                mediaElements[0].style.display = "none";
                currentIndex = 1;
                mediaElements[currentIndex].style.display = "block";
                startAutoChange();
            } else {
                mediaElements[0].currentTime = 0;
                mediaElements[0].play();
            }
        });
    }

    function startAutoChange() {
        stopAutoChange();
        
        if (mediaElements.length > 1 && currentIndex > 0) {
            autoChangeTimer = setInterval(() => {
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
        if (mediaElements.length <= 1) return;
        
        mediaElements[currentIndex].style.display = "none";
        
        currentIndex++;
        
        if (currentIndex >= mediaElements.length) {
            currentIndex = 0;
        }
        
        mediaElements[currentIndex].style.display = "block";
        
        if (currentIndex === 0 && mediaElements[0].tagName === "VIDEO") {
            mediaElements[0].play();
            stopAutoChange();
        } else {
            startAutoChange();
        }
    }

    function prevSlide() {
        if (mediaElements.length <= 1) return;
        
        mediaElements[currentIndex].style.display = "none";
        
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = mediaElements.length - 1;
        }
        
        mediaElements[currentIndex].style.display = "block";
        
        if (currentIndex === 0 && mediaElements[0].tagName === "VIDEO") {
            mediaElements[0].play();
            stopAutoChange();
        } else {
            startAutoChange();
        }
    }

    if (rightBtn) {
        rightBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            stopAutoChange();
            nextSlide();
        });
    }

    if (leftBtn) {
        leftBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            stopAutoChange();
            prevSlide();
        });
    }

    if (mediaElements.length > 1) {
        setTimeout(() => {
            if (currentIndex === 0 && mediaElements[0].tagName === "VIDEO") {
                if (mediaElements[0].paused || mediaElements[0].readyState < 2) {
                    mediaElements[0].style.display = "none";
                    currentIndex = 1;
                    mediaElements[currentIndex].style.display = "block";
                    startAutoChange();
                }
            }
        }, 3000);
    }
}