const hamburger = document.querySelector('.Hamburger');
const menu = document.querySelector('.Navbar-Items');
const items = document.querySelectorAll('.Item');
const navbarGroup = document.querySelector('.Navbar-Group');
const popups = document.querySelectorAll('.Item-Popup');
const mainButton = document.querySelector('.Main-Button');  

function closeAllItemsAndPopups() {
    items.forEach(item => {
        item.classList.remove('open');
        item.classList.remove('active'); // Add this line
        item.style.display = 'flex';
    });
    
    popups.forEach(popup => {
        popup.style.display = 'none';
        popup.classList.remove('active');
    });
    
    if (mainButton) {
        mainButton.style.display = 'flex';  
    }
}

function isClickOutsideNavbar(event) {
    return !menu.contains(event.target) && 
           !hamburger.contains(event.target) &&
           !navbarGroup.contains(event.target);
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    menu.classList.remove('active');
    navbarGroup.style.outline = 'none';
    closeAllItemsAndPopups();
}

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');

    if (menu.classList.contains('active')) {
        navbarGroup.style.outline = '100px solid var(--background-color)';
        if (mainButton && window.innerWidth <= 1024) {
            mainButton.style.display = 'flex';
        }
    } else {
        closeMobileMenu();
    }
});

items.forEach(item => {
    item.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            e.stopPropagation();

            const isOpen = item.classList.contains('open');
            const popup = item.querySelector('.Item-Popup');

            // Close all other items first
            items.forEach(i => {
                i.classList.remove('open');
                i.classList.remove('active'); // Add this line
                if (i !== item) {
                    i.style.display = 'none';
                }
            });

            popups.forEach(p => {
                p.style.display = 'none';
                p.classList.remove('active');
            });

            if (!isOpen) {
                item.classList.add('open');
                item.classList.add('active'); // Add this line
                item.style.display = 'flex';
                
                if (popup) {
                    popup.style.display = 'block';
                    popup.classList.add('active');
                }
                
                if (mainButton) {
                    mainButton.style.display = 'none';
                }
            } else {
                // If clicking an already open item, close it and show all items
                items.forEach(i => {
                    i.style.display = 'flex';
                    i.classList.remove('open');
                    i.classList.remove('active'); // Add this line
                });
                
                if (mainButton) {
                    mainButton.style.display = 'flex';
                }
            }
        }
    });
});

document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024) {
        if (mainButton && mainButton.contains(e.target)) {
            return;
        }
        
        if (menu.classList.contains('active') && isClickOutsideNavbar(e)) {
            closeMobileMenu();
        }
        else if (!hamburger.contains(e.target) && !navbarGroup.contains(e.target)) {
            const anyItemOpen = Array.from(items).some(item => 
                item.classList.contains('open') || item.classList.contains('active')
            );
            if (anyItemOpen) {
                closeAllItemsAndPopups();
            }
        }
    }
});

window.addEventListener('scroll', () => {
    if (window.innerWidth <= 1024) {
        closeAllItemsAndPopups();
        menu.classList.remove('active');
        hamburger.classList.remove('active');
        navbarGroup.style.outline = 'none';
    }
});

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 1024) {
            items.forEach(item => {
                item.style.display = 'flex';
                item.classList.remove('open');
                item.classList.remove('active'); // Add this line
            });
            
            popups.forEach(popup => {
                popup.style.display = 'none';
                popup.classList.remove('active');
            });
            
            menu.classList.remove('active');
            hamburger.classList.remove('active');
            navbarGroup.style.outline = 'none';
            
            if (mainButton) {
                mainButton.style.display = 'flex';
            }
            
        } else {
            closeAllItemsAndPopups();
            
            items.forEach(item => {
                item.style.display = 'flex';
            });
        }
    }, 100);
});