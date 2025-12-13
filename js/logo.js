const bigGear = document.querySelector('.Big-Gear');
const smallGear = document.querySelector('.Small-Gear');

const autoInterval = 10000;

let autoTimer;

function startSwing() {
    bigGear.classList.add('swing-animation');
    smallGear.classList.add('swing-animation');

    setTimeout(() => {
        bigGear.classList.remove('swing-animation');
        smallGear.classList.remove('swing-animation');
    }, 4000);
}

function startAutoSwing() {
    autoTimer = setInterval(() => {
        startSwing();
    }, autoInterval);
}

function resetAutoSwing() {
    clearInterval(autoTimer);
    startAutoSwing();
}

[bigGear, smallGear].forEach(gear => {
    gear.addEventListener('mouseenter', () => {
        startSwing();
        resetAutoSwing();
    });
});

startAutoSwing();
