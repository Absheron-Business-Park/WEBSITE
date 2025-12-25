document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".Image-Container");
    const images = Array.from(container.querySelectorAll("img.Area-Style"));
    const btnLeft = container.querySelector(".Navigation-Button-Left");
    const btnRight = container.querySelector(".Navigation-Button-Right");
    let currentIndex = 0;

    images.forEach((img, index) => {
        img.style.display = index === 0 ? "block" : "none";
    });

    btnLeft.addEventListener("click", () => {
        images[currentIndex].style.display = "none";
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        images[currentIndex].style.display = "block";
    });

    btnRight.addEventListener("click", () => {
        images[currentIndex].style.display = "none";
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].style.display = "block";
    });
});
