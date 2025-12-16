document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".Section-Slider");
    const allElements = Array.from(slider.children);
    
    // Filter only the slider items (exclude navigation)
    const itemContainers = allElements.filter(el => el.classList.contains("Section-Elements"));
    
    const btnPrev = slider.querySelector(".Section-Elements-Navigation img[src*='left']");
    const btnNext = slider.querySelector(".Section-Elements-Navigation img[src*='right']");
    let visibleCount = 1;

    function updateVisibleCount() {
        const width = window.innerWidth;
        if (width >= 1440) visibleCount = 6;
        else if (width >= 1350) visibleCount = 5;
        else if (width >= 1100) visibleCount = 4;
        else if (width >= 1020) visibleCount = 3;
        else if (width >= 768) visibleCount = 2;
        else visibleCount = 1;
    }

    function renderSlider() {
        // Only move the actual slider items, keep navigation buttons in place
        itemContainers.forEach(item => slider.insertBefore(item, btnNext.parentElement));
        
        itemContainers.forEach((item, index) => {
            item.style.display = index < visibleCount ? "block" : "none";
        });
    }

    function next() {
        const first = itemContainers.shift();
        itemContainers.push(first);
        renderSlider();
    }

    function prev() {
        const last = itemContainers.pop();
        itemContainers.unshift(last);
        renderSlider();
    }

    btnNext.addEventListener("click", next);
    btnPrev.addEventListener("click", prev);
    window.addEventListener("resize", () => {
        updateVisibleCount();
        renderSlider();
    });

    updateVisibleCount();
    renderSlider();
});
