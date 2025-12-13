document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.Section-Slider');
    const leftBtn = document.querySelector('.Section-Elements-Navigation:first-child');
    const rightBtn = document.querySelector('.Section-Elements-Navigation:last-child');
    const allItems = Array.from(document.querySelectorAll('.Section-Elements'));
    
    let currentIndex = 0;
    const totalItems = allItems.length;
    let visibleCount = 6; // Show 6 items at a time
    
    function updateVisibleCount() {
        const width = window.innerWidth;
        if (width >= 1440) visibleCount = 6;
        else if (width >= 1350) visibleCount = 5;
        else if (width >= 1100) visibleCount = 4;
        else if (width >= 1020) visibleCount = 3;
        else if (width >= 768) visibleCount = 2;
        else visibleCount = 1;
        
        updateDisplay();
    }
    
    function updateDisplay() {
        // Hide all items
        allItems.forEach(item => {
            item.style.display = 'none';
        });
        
        // Show current visible items
        for (let i = currentIndex; i < currentIndex + visibleCount && i < totalItems; i++) {
            if (allItems[i]) {
                allItems[i].style.display = 'flex';
            }
        }
    }
    
    function slideRight() {
        // Move to next item, but don't go beyond total items - visible count
        if (currentIndex + visibleCount < totalItems) {
            currentIndex++;
            updateDisplay();
        }
    }
    
    function slideLeft() {
        // Move to previous item, but not below 0
        if (currentIndex > 0) {
            currentIndex--;
            updateDisplay();
        }
    }
    
    // Event listeners
    rightBtn.addEventListener('click', slideRight);
    leftBtn.addEventListener('click', slideLeft);
    
    // Initial setup
    updateVisibleCount();
    
    // Update on resize
    window.addEventListener('resize', updateVisibleCount);
});