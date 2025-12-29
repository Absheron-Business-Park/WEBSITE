document.addEventListener('DOMContentLoaded', function () {
    
    document.querySelectorAll('a[href^="#popup-"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const popupId = this.getAttribute('href').substring(1);
            const popup = document.getElementById(popupId);
            
            if (popup) {
                openPopup(popup);
            }
        });
    });
    
    function openPopup(popup) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        const content = popup.querySelector('.popup-content');
        const imageStack = popup.querySelector('.image-stack');
        const expandBtn = popup.querySelector('.popup-expand');
        
        if (content) {
            content.classList.remove('expanded');
        }
        if (imageStack) {
            imageStack.classList.remove('expanded');
        }
        if (expandBtn) {
            expandBtn.querySelector('img').src = '../assets/svg/arrow-slider-expand.svg';
        }
        
        const items = popup.querySelectorAll('.popup-item');
        const totalCount = popup.querySelector('.total-count');
        
        if (totalCount) {
            totalCount.textContent = items.length;
        }
        
        showPopupItem(popup, 0);
        
        updateDownloadButton(popup);
    }
    
    function closePopup(popup) {
        popup.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        const videos = popup.querySelectorAll('video');
        videos.forEach(video => {
            video.pause();
        });
    }
    
    function toggleExpandMode(popup) {
        const content = popup.querySelector('.popup-content');
        const imageStack = popup.querySelector('.image-stack');
        const expandBtn = popup.querySelector('.popup-expand');
        
        if (!content || !imageStack || !expandBtn) return;
        
        const isExpanded = content.classList.contains('expanded');
        
        if (isExpanded) {
            content.classList.remove('expanded');
            imageStack.classList.remove('expanded');
            expandBtn.querySelector('img').src = '../assets/svg/arrow-slider-expand.svg';
        } else {
            content.classList.add('expanded');
            imageStack.classList.add('expanded');
            expandBtn.querySelector('img').src = '../assets/svg/arrow-slider-compress.svg';  
        }
        
        if (isExpanded) {
            content.style.width = '';
            content.style.height = '';
            content.style.maxWidth = '';
            content.style.maxHeight = '';
            imageStack.style.height = '';
            imageStack.style.minHeight = '';
        } else {
            content.style.width = '100%';
            content.style.height = '100%';
            content.style.maxWidth = 'none';
            content.style.maxHeight = 'none';
            imageStack.style.height = '100%';
            imageStack.style.minHeight = '0';
        }
    }
    
    function showPopupItem(popup, index) {
        const items = popup.querySelectorAll('.popup-item');
        const currentIndex = popup.querySelector('.current-index');
        const downloadBtn = popup.querySelector('.popup-download');
        const prevBtn = popup.querySelector('.nav-btn.prev');
        const nextBtn = popup.querySelector('.nav-btn.next');
        
        if (index < 0 || index >= items.length) return;
        
        items.forEach(item => {
            item.classList.remove('active');
            
            const video = item.querySelector('video');
            if (video) {
                video.pause();
            }
        });
        
        items[index].classList.add('active');
        
        const video = items[index].querySelector('video');
        if (video) {
            video.play().catch(e => console.log("Autoplay prevented:", e));
        }
        
        if (currentIndex) {
            currentIndex.textContent = index + 1;
        }
        
        if (downloadBtn) {
            const currentItem = items[index];
            const type = currentItem.getAttribute('data-type');
            const src = currentItem.getAttribute('data-src');
            
            if (type === 'image' && src) {
                downloadBtn.href = src;
                downloadBtn.download = src.split('/').pop();
                downloadBtn.classList.remove('disabled');
            } else {
                downloadBtn.href = '#';
                downloadBtn.classList.add('disabled');
            }
        }
        
        if (items.length <= 1) {
            if (prevBtn) prevBtn.classList.add('hidden');
            if (nextBtn) nextBtn.classList.add('hidden');
        } else {
            if (prevBtn) prevBtn.classList.remove('hidden');
            if (nextBtn) nextBtn.classList.remove('hidden');
        }
        
        popup.dataset.currentIndex = index;
    }
    
    function updateDownloadButton(popup) {
        const downloadBtn = popup.querySelector('.popup-download');
        const items = popup.querySelectorAll('.popup-item');
        const currentIndex = parseInt(popup.dataset.currentIndex) || 0;
        
        if (downloadBtn && items.length > currentIndex) {
            const currentItem = items[currentIndex];
            const type = currentItem.getAttribute('data-type');
            const src = currentItem.getAttribute('data-src');
            
            if (type === 'image' && src) {
                downloadBtn.href = src;
                downloadBtn.download = src.split('/').pop();
                downloadBtn.classList.remove('disabled');
            } else {
                downloadBtn.href = '#';
                downloadBtn.classList.add('disabled');
            }
        }
    }
    
    document.querySelectorAll('.popup-overlay').forEach(popup => {
        const closeBtn = popup.querySelector('.popup-close');
        const expandBtn = popup.querySelector('.popup-expand');
        const prevBtn = popup.querySelector('.nav-btn.prev');
        const nextBtn = popup.querySelector('.nav-btn.next');
        const downloadBtn = popup.querySelector('.popup-download');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                closePopup(popup);
            });
        }
        
        if (expandBtn) {
            expandBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleExpandMode(popup);
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const items = popup.querySelectorAll('.popup-item');
                let currentIndex = parseInt(popup.dataset.currentIndex) || 0;
                let newIndex = currentIndex - 1;
                
                if (newIndex < 0) {
                    newIndex = items.length - 1;
                }
                
                showPopupItem(popup, newIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const items = popup.querySelectorAll('.popup-item');
                let currentIndex = parseInt(popup.dataset.currentIndex) || 0;
                let newIndex = currentIndex + 1;
                
                if (newIndex >= items.length) {
                    newIndex = 0;
                }
                
                showPopupItem(popup, newIndex);
            });
        }
        
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function(e) {
                if (this.classList.contains('disabled')) {
                    e.preventDefault();
                    alert('Download is only available for images');
                }
            });
        }
        
        popup.addEventListener('click', function(e) {
            if (e.target === this) {
                closePopup(popup);
            }
        });
        
        const items = popup.querySelectorAll('.popup-item');
        if (items.length > 0) {
            popup.dataset.currentIndex = '0';
        }
    });
    
    document.addEventListener('keydown', function(e) {
        const popup = document.querySelector('.popup-overlay.active');
        if (!popup) return;
        
        const items = popup.querySelectorAll('.popup-item');
        if (items.length === 0) return;
        
        let currentIndex = parseInt(popup.dataset.currentIndex) || 0;
        
        switch(e.key) {
            case 'Escape':
           
                const content = popup.querySelector('.popup-content');
                if (content && content.classList.contains('expanded')) {
                    toggleExpandMode(popup);
                } else {
                    closePopup(popup);
                }
                break;
                
            case 'ArrowLeft':
                e.preventDefault();
                let prevIndex = currentIndex - 1;
                if (prevIndex < 0) prevIndex = items.length - 1;
                showPopupItem(popup, prevIndex);
                break;
                
            case 'ArrowRight':
                e.preventDefault();
                let nextIndex = currentIndex + 1;
                if (nextIndex >= items.length) nextIndex = 0;
                showPopupItem(popup, nextIndex);
                break;
                
            case 'f':
            case 'F':
                e.preventDefault();
                toggleExpandMode(popup);
                break;
                
            case ' ':  
                const currentItem = items[currentIndex];
                const video = currentItem.querySelector('video');
                if (video) {
                    e.preventDefault();
                    if (video.paused) {
                        video.play();
                    } else {
                        video.pause();
                    }
                }
                break;
        }
    });
    
    document.querySelectorAll('.popup-video').forEach(video => {
        video.addEventListener('ended', function() {
            const popup = this.closest('.popup-overlay');
            if (popup && popup.classList.contains('active')) {
                const items = popup.querySelectorAll('.popup-item');
                let currentIndex = parseInt(popup.dataset.currentIndex) || 0;
                let nextIndex = currentIndex + 1;
                
                if (nextIndex >= items.length) {
                    nextIndex = 0;
                }
                
                showPopupItem(popup, nextIndex);
            }
        });
    });
});