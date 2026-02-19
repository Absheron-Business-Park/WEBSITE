document.addEventListener('DOMContentLoaded', function() {
    
    const mapItems = [
        { target: 'azplay', src: '../assets/map/azplay_hover.png' },
        { target: 'biznespark', src: '../assets/map/biznespark_hover.png' },
        { target: 'parking', src: '../assets/map/parking_hover.png' },
        { target: 'faza_1_a', src: '../assets/map/faza_1_a_hover.png' },
        { target: 'faza_1_b', src: '../assets/map/faza_1_b_hover.png' },
        { target: 'faza_2_a', src: '../assets/map/faza_2_a_hover.png' },
        { target: 'faza_2_b', src: '../assets/map/faza_2_b_hover.png' },
        { target: 'faza_3_a', src: '../assets/map/faza_3_a_hover.png' },
        { target: 'faza_3_b', src: '../assets/map/faza_3_b_hover.png' }
    ];

    const container = document.querySelector('.Image-hover-items');
    if (!container) return;

    container.innerHTML = '';

    const canvases = [];

    mapItems.forEach((item, index) => {
        const canvas = document.createElement('canvas');
        canvas.className = 'Sidepanel-Map-hover-img-item canvas-hover-item';
        canvas.setAttribute('data-target', item.target);
        canvas.setAttribute('data-index', index);
        
        canvas.width = 100;
        canvas.height = 100;
        
        canvas.style.pointerEvents = 'auto';
        canvas.style.opacity = '0';  
        
        container.appendChild(canvas);
        canvases.push(canvas);
        
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = item.src;
        
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            ctx.drawImage(img, 0, 0, img.width, img.height);
        };
    });

    const hoverCanvases = document.querySelectorAll('.canvas-hover-item');
 
    const fullImage = document.getElementById('map_full');
    const emptyImage = document.getElementById('map_empty');
    
    const mapFaqContainer = document.querySelector('.Sidepanel-Map-hover .Sidepanel-Map-hover-text-group');
    const mapFaqItems = document.querySelectorAll('.Sidepanel-Map-hover .faq-item');
    
    function adjustFaqForDesktop() {
        if (window.innerWidth > 1024) {
            mapFaqItems.forEach(item => {
                item.classList.remove('Area-Style');
                
                const questionDiv = item.querySelector('.faq-question');
                if (questionDiv) {
                    questionDiv.remove();
                }
                
                const answer = item.querySelector('.faq-answer');
                if (answer) {
                    answer.style.display = 'block';
                }
            });
            
            mapFaqItems.forEach(faq => {
                faq.style.display = 'none';
            });
        }
    }
    
    function adjustFaqForMobile() {
        if (window.innerWidth <= 1024) {
            mapFaqItems.forEach(item => {
                item.classList.add('Area-Style');
                
                const faqAnswer = item.querySelector('.faq-answer');
                const target = item.getAttribute('data-target');
                
                if (faqAnswer) {
                    const faqQuestion = item.querySelector('.faq-question');
                    
                    if (!faqQuestion) {
                        const questionDiv = document.createElement('div');
                        questionDiv.className = 'faq-question';
                        
                        const headline = faqAnswer.querySelector('.Info-Head');
                        questionDiv.textContent = headline ? headline.textContent : target;
                        
                        const chevron = document.createElement('img');
                        chevron.src = '../assets/svg/chevron_down.svg';
                        chevron.alt = 'toggle';
                        chevron.className = 'faq-icon';
                        chevron.style.transition = 'transform 0.3s';
                        chevron.style.transform = 'rotate(0deg)';
                        questionDiv.appendChild(chevron);
                        
                        faqAnswer.parentNode.insertBefore(questionDiv, faqAnswer);
                        
                        faqAnswer.style.display = 'none';
                        
                        questionDiv.addEventListener('click', function(e) {
                            e.stopPropagation();
                            const isVisible = faqAnswer.style.display === 'block';
                            faqAnswer.style.display = isVisible ? 'none' : 'block';
                            chevron.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
                        });
                    } else {
                        faqAnswer.style.display = 'none';
                        const chevron = faqQuestion.querySelector('.faq-icon');
                        if (chevron) {
                            chevron.style.transform = 'rotate(0deg)';
                            chevron.style.transition = 'transform 0.3s';
                        }
                    }
                }
                
                item.style.display = 'flex';
            });
        }
    }
    
    function updateContainerClass() {
        if (!mapFaqContainer) return;
        
        if (window.innerWidth <= 1024) {
            mapFaqContainer.classList.remove('Sidepanel-Map-hover-text-group');
            if (!mapFaqContainer.classList.contains('faq-container')) {
                mapFaqContainer.classList.add('faq-container');
            }
        } else {
            if (!mapFaqContainer.classList.contains('Sidepanel-Map-hover-text-group')) {
                mapFaqContainer.classList.add('Sidepanel-Map-hover-text-group');
            }
        }
    }
    
    function isOpaquePixel(canvas, x, y) {
        try {
            if (!canvas.width || !canvas.height) return false;
            if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return false;
            
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            const pixel = ctx.getImageData(x, y, 1, 1).data;
            return pixel[3] > 10;
        } catch (e) {
            return false;
        }
    }

    function getCanvasCoordinates(canvas, clientX, clientY) {
        const rect = canvas.getBoundingClientRect();
        
        if (rect.width === 0 || rect.height === 0) return null;
        if (canvas.width === 0 || canvas.height === 0) return null;
        
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        let canvasX = Math.floor((clientX - rect.left) * scaleX);
        let canvasY = Math.floor((clientY - rect.top) * scaleY);
        
        if (canvasX < 0 || canvasY < 0 || canvasX >= canvas.width || canvasY >= canvas.height) {
            return null;
        }
        
        return { x: canvasX, y: canvasY };
    }

    function findTopmostOpaqueCanvas(clientX, clientY) {
        const elementsAtPosition = [];
        
        hoverCanvases.forEach(canvas => {
            const rect = canvas.getBoundingClientRect();
            if (clientX >= rect.left && clientX <= rect.right && 
                clientY >= rect.top && clientY <= rect.bottom) {
                elementsAtPosition.push(canvas);
            }
        });
        
        elementsAtPosition.sort((a, b) => {
            const zA = parseInt(window.getComputedStyle(a).zIndex) || 0;
            const zB = parseInt(window.getComputedStyle(b).zIndex) || 0;
            if (zA !== zB) return zB - zA;
            
            const indexA = Array.from(hoverCanvases).indexOf(a);
            const indexB = Array.from(hoverCanvases).indexOf(b);
            return indexB - indexA;
        });
        
        for (let canvas of elementsAtPosition) {
            const coords = getCanvasCoordinates(canvas, clientX, clientY);
            if (coords && isOpaquePixel(canvas, coords.x, coords.y)) {
                return canvas;
            }
        }
        
        return null;
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function getImageId(target) {
        return window.innerWidth > 1024 ? `map_${target}_desktop` : `map_${target}_tablet`;
    }
    
 
    function showTarget(target, isClick = false) {
 
        document.querySelectorAll('.Sidepanel-Map-hover-img').forEach(img => {
            img.style.display = 'none';
        });
     
        const imageId = getImageId(target);
        const targetMap = document.getElementById(imageId);
        
        if (targetMap) {
            targetMap.style.display = 'flex';
        }
        
        if (window.innerWidth > 1024) {
            mapFaqItems.forEach(faq => {
                faq.style.display = 'none';
            });
            
            const targetFaq = document.querySelector(`.faq-item[data-target="${target}"]`);
            if (targetFaq) {
                targetFaq.style.display = 'flex';
            }
        } else {
            mapFaqItems.forEach(faq => {
                faq.classList.remove('active');
                const answer = faq.querySelector('.faq-answer');
                const chevron = faq.querySelector('.faq-icon');
                
                if (answer) {
                    answer.style.display = 'none';
                }
                if (chevron) {
                    chevron.style.transform = 'rotate(0deg)';
                }
            });
            
            const targetFaq = document.querySelector(`.faq-item[data-target="${target}"]`);
            if (targetFaq) {
                targetFaq.classList.add('active');
                const answer = targetFaq.querySelector('.faq-answer');
                const chevron = targetFaq.querySelector('.faq-icon');
                
                if (answer) {
                    answer.style.display = 'block';
                }
                if (chevron) {
                    chevron.style.transform = 'rotate(180deg)';
                }
                
                targetFaq.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    }
   
    function resetToDefault() {
     
        document.querySelectorAll('.Sidepanel-Map-hover-img').forEach(img => {
            img.style.display = 'none';
        });
        
        if (window.innerWidth > 1024) {
        
            if (emptyImage) {
                emptyImage.style.display = 'flex';
            }
            
            mapFaqItems.forEach(faq => {
                faq.style.display = 'none';
            });
        } else {
            if (fullImage) {
                fullImage.style.display = 'flex';
            }
            
            mapFaqItems.forEach(faq => {
                faq.classList.remove('active');
                const answer = faq.querySelector('.faq-answer');
                const chevron = faq.querySelector('.faq-icon');
                
                if (answer) {
                    answer.style.display = 'none';
                }
                if (chevron) {
                    chevron.style.transform = 'rotate(0deg)';
                }
            });
        }
    }
    
    let activeTarget = null;
    let isHovering = false;

    const handleGlobalMousemove = debounce(function(e) {
        if (window.innerWidth <= 1024) return;
        
        const canvas = findTopmostOpaqueCanvas(e.clientX, e.clientY);
        
        if (canvas) {
            const target = canvas.getAttribute('data-target');
            
            hoverCanvases.forEach(c => c.classList.remove('hover-active'));
            
            canvas.classList.add('hover-active');
            
            if (activeTarget !== target) {
                activeTarget = target;
                isHovering = true;
                showTarget(target);
            }
        } else {
            hoverCanvases.forEach(c => c.classList.remove('hover-active'));
            
            if (isHovering) {
                isHovering = false;
                activeTarget = null;
                resetToDefault();
            }
        }
    }, 1);  

    function handleMouseLeave() {
        if (window.innerWidth <= 1024) return;
        
        hoverCanvases.forEach(c => c.classList.remove('hover-active'));
        
        if (isHovering) {
            isHovering = false;
            activeTarget = null;
            resetToDefault();
        }
    }

    function setupCanvasClickHandlers() {
        hoverCanvases.forEach(canvas => {
            canvas.addEventListener('click', function(e) {
                if (!this.width || !this.height) return;
                
                const coords = getCanvasCoordinates(this, e.clientX, e.clientY);
                if (!coords) return;
                
                if (isOpaquePixel(this, coords.x, coords.y)) {
                    const target = this.getAttribute('data-target');
                    showTarget(target, true);
                }
            });
            
            canvas.addEventListener('touchstart', function(e) {
                e.preventDefault();
                if (!this.width || !this.height) return;
                
                const touch = e.touches[0];
                const coords = getCanvasCoordinates(this, touch.clientX, touch.clientY);
                if (!coords) return;
                
                if (isOpaquePixel(this, coords.x, coords.y)) {
                    const target = this.getAttribute('data-target');
                    showTarget(target, true);
                }
            }, { passive: false });
        });
    }

    function setupFaqQuestionListeners() {
        if (window.innerWidth <= 1024) {
            document.querySelectorAll('.Sidepanel-Map-hover .faq-question').forEach(question => {
                const newQuestion = question.cloneNode(true);
                question.parentNode.replaceChild(newQuestion, question);
                
                newQuestion.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const faqItem = this.closest('.faq-item');
                    const target = faqItem.getAttribute('data-target');
                    const answer = faqItem.querySelector('.faq-answer');
                    const chevron = this.querySelector('.faq-icon');
                    
                    const isVisible = answer.style.display === 'block';
                    answer.style.display = isVisible ? 'none' : 'block';
                    if (chevron) {
                        chevron.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
                    }
                    
                    showTarget(target, true);
                });
            });
        }
    }

    function setupScrollToTop() {
        if (window.innerWidth <= 1024) return; 
        
        const sidepanelMap = document.querySelector('.Sidepanel-Map-hover');
        if (!sidepanelMap) return;
        
        let isScrolling = false;
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function smoothScrollToSidepanel() {
            if (isScrolling) return;
            
            isScrolling = true;
            const targetPosition = sidepanelMap.getBoundingClientRect().top + window.pageYOffset + 40;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let startTime = null;
            const duration = 800;  
            
            function animateScroll(currentTime) {
                if (!startTime) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                
                if (timeElapsed < duration) {
                    const progress = timeElapsed / duration;
                    const easeProgress = progress < 0.5 
                        ? 4 * progress * progress * progress 
                        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                    
                    const currentScroll = startPosition + (distance * easeProgress);
                    window.scrollTo(0, currentScroll);
                    
                    if (progress > 0.5) {
                        const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
                        if (elementUnderMouse && elementUnderMouse.classList.contains('Sidepanel-Map-hover-img-item')) {
                            elementUnderMouse.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
                        }
                    }
                    
                    requestAnimationFrame(animateScroll);
                } else {
                    window.scrollTo(0, targetPosition);
                    isScrolling = false;
                }
            }
            
            requestAnimationFrame(animateScroll);
        }
        
        hoverCanvases.forEach(canvas => {
            let hoverTimeout;
            
            canvas.addEventListener('mouseenter', function(e) {
                if (!this.width || !this.height) return;
                const coords = getCanvasCoordinates(this, e.clientX, e.clientY);
                if (!coords) return;
                
                if (isOpaquePixel(this, coords.x, coords.y)) {
                    clearTimeout(hoverTimeout);
                    hoverTimeout = setTimeout(() => {
                        smoothScrollToSidepanel();
                    }, 50);
                }
            });
            
            canvas.addEventListener('mouseleave', function() {
                clearTimeout(hoverTimeout);
            });
            
            canvas.addEventListener('click', function() {
                sidepanelMap.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            
            canvas.addEventListener('touchstart', function() {
                sidepanelMap.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, { passive: true });
        });
    }

    function initialize() {
        document.querySelectorAll('.Sidepanel-Map-hover-img').forEach(img => {
            img.style.display = 'none';
        });
        
        if (window.innerWidth > 1024) {
            adjustFaqForDesktop();
            mapFaqItems.forEach(faq => {
                faq.style.display = 'none';
            });
            
            document.addEventListener('mousemove', handleGlobalMousemove);
            container.addEventListener('mouseleave', handleMouseLeave);
            
            if (emptyImage) emptyImage.style.display = 'flex';
            
        } else {
            adjustFaqForMobile();
            mapFaqItems.forEach(faq => {
                faq.style.display = 'flex';
                const answer = faq.querySelector('.faq-answer');
                const chevron = faq.querySelector('.faq-icon');
                
                if (answer) answer.style.display = 'none';
                if (chevron) chevron.style.transform = 'rotate(0deg)';
            });
            
            if (fullImage) fullImage.style.display = 'flex';
            
            document.removeEventListener('mousemove', handleGlobalMousemove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        }
        
        updateContainerClass();
        setupCanvasClickHandlers();
        setupFaqQuestionListeners();
        setupScrollToTop();
        
        activeTarget = null;
        isHovering = false;
    }
    
    initialize();
    
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            initialize();
        }, 100);
    });
    
    window.addEventListener('beforeunload', function() {
        document.removeEventListener('mousemove', handleGlobalMousemove);
        container.removeEventListener('mouseleave', handleMouseLeave);
    });
});