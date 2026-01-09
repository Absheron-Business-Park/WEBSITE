document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.Item').forEach(item => {
        item.addEventListener('click', function(e) {
            if (!this.querySelector('.popup')) {
                return;
            }

            if (e.target.closest('.Sub-Item') || e.target.closest('.popup')) {
                return;
            }
            
            e.preventDefault();
            
            const popup = this.querySelector('.popup');
            const arrow = this.querySelector('img');
            
            if (!popup) return;
            
            if (popup.style.display === 'flex') {
                popup.style.display = 'none';
                if (arrow) arrow.style.transform = 'rotate(0deg)';
                this.classList.remove('active');  
            } else {
                document.querySelectorAll('.popup').forEach(p => {
                    p.style.display = 'none';
                });
                document.querySelectorAll('.Item img').forEach(a => {
                    a.style.transform = 'rotate(0deg)';
                });
                document.querySelectorAll('.Item').forEach(i => {
                    i.classList.remove('active');
                });
                
                popup.style.display = 'flex';
                if (arrow) arrow.style.transform = 'rotate(180deg)';
                this.classList.add('active');  
            }
        });
    });
    
    document.querySelectorAll('.Sub-Item').forEach(subItem => {
        subItem.addEventListener('click', function(e) {
            e.stopPropagation();  
        });
    });
    
    document.addEventListener('click', function(e) {
        const clickedItem = e.target.closest('.Item');
        const clickedPopup = e.target.closest('.popup');
        
        if (!clickedItem && !clickedPopup) {
            document.querySelectorAll('.popup').forEach(p => {
                p.style.display = 'none';
            });
            document.querySelectorAll('.Item img').forEach(a => {
                a.style.transform = 'rotate(0deg)';
            });
            document.querySelectorAll('.Item').forEach(item => {
                item.classList.remove('active');
            });
        }
    });
});


// Hover functionality for desktop devices

document.addEventListener('DOMContentLoaded', function () {
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (!isDesktop) return; 
    document.querySelectorAll('.Item').forEach(item => {
        const popup = item.querySelector('.popup');
        const arrow = item.querySelector('img');

        if (!popup) return;

        item.addEventListener('mouseenter', function () {
            document.querySelectorAll('.popup').forEach(p => p.style.display = 'none');
            document.querySelectorAll('.Item img').forEach(a => a.style.transform = 'rotate(0deg)');
            document.querySelectorAll('.Item').forEach(i => i.classList.remove('active'));

            popup.style.display = 'flex';
            if (arrow) arrow.style.transform = 'rotate(180deg)';
            item.classList.add('active');
        });

        item.addEventListener('mouseleave', function () {
            popup.style.display = 'none';
            if (arrow) arrow.style.transform = 'rotate(0deg)';
            item.classList.remove('active');
        });
    });
});
