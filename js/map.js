document.addEventListener('DOMContentLoaded', function() {
    // Get all hover image items
    const hoverItems = document.querySelectorAll('.Sidepanel-Map-hover-img-item');
    
    // Get the default map image
    const defaultImage = document.getElementById('map_default');
    
    // Get the FAQ container specifically for this component
    const mapFaqContainer = document.querySelector('.Sidepanel-Map-hover .Sidepanel-Map-hover-text-group');
    
    // Get FAQ items only within this component
    const mapFaqItems = document.querySelectorAll('.Sidepanel-Map-hover .faq-item');
    
    // Function to remove Area-Style class and question div for desktop
    function adjustFaqForDesktop() {
        if (window.innerWidth > 1024) {
            mapFaqItems.forEach(item => {
                // Remove Area-Style class
                item.classList.remove('Area-Style');
                
                // Remove the faq-question div if it exists
                const questionDiv = item.querySelector('.faq-question');
                if (questionDiv) {
                    questionDiv.remove();
                }
                
                // Ensure answer is visible
                const answer = item.querySelector('.faq-answer');
                if (answer) {
                    answer.style.display = 'block';
                }
            });
            
            // Hide all FAQ items initially on desktop
            mapFaqItems.forEach(faq => {
                faq.style.display = 'none';
            });
        }
    }
    
    // Function to restore mobile/tablet styling
    function adjustFaqForMobile() {
        if (window.innerWidth <= 1024) {
            mapFaqItems.forEach(item => {
                // Add back Area-Style class
                item.classList.add('Area-Style');
                
                // Get the faq answer
                const faqAnswer = item.querySelector('.faq-answer');
                const target = item.getAttribute('data-target');
                
                if (faqAnswer) {
                    // Check if faq-question exists, if not, create it
                    const faqQuestion = item.querySelector('.faq-question');
                    
                    if (!faqQuestion) {
                        // Create question div
                        const questionDiv = document.createElement('div');
                        questionDiv.className = 'faq-question';
                        
                        // Get the title from the first Info-Headline or use data-target
                        const headline = faqAnswer.querySelector('.Info-Headline');
                        questionDiv.textContent = headline ? headline.textContent : target;
                        
                        // Add chevron icon
                        const chevron = document.createElement('img');
                        chevron.src = '../assets/svg/chevron_down.svg';
                        chevron.alt = 'toggle';
                        chevron.className = 'faq-icon';
                        chevron.style.transition = 'transform 0.3s';
                        chevron.style.transform = 'rotate(0deg)';
                        questionDiv.appendChild(chevron);
                        
                        // Insert question before answer
                        faqAnswer.parentNode.insertBefore(questionDiv, faqAnswer);
                        
                        // COLLAPSE answer by default on mobile
                        faqAnswer.style.display = 'none';
                        
                        // Add click event to toggle
                        questionDiv.addEventListener('click', function(e) {
                            e.stopPropagation();
                            const isVisible = faqAnswer.style.display === 'block';
                            faqAnswer.style.display = isVisible ? 'none' : 'block';
                            chevron.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
                        });
                    } else {
                        // If question already exists, ensure answer is COLLAPSED
                        faqAnswer.style.display = 'none';
                        const chevron = faqQuestion.querySelector('.faq-icon');
                        if (chevron) {
                            chevron.style.transform = 'rotate(0deg)';
                            chevron.style.transition = 'transform 0.3s';
                        }
                    }
                }
                
                // Show all FAQ items on mobile/tablet but answers collapsed
                item.style.display = 'flex';
            });
        }
    }
    
    // Function to handle container class name
    function updateContainerClass() {
        if (!mapFaqContainer) return;
        
        if (window.innerWidth <= 1024) {
            // Remove Sidepanel-Map-hover-text-group class, keep faq-container
            mapFaqContainer.classList.remove('Sidepanel-Map-hover-text-group');
            if (!mapFaqContainer.classList.contains('faq-container')) {
                mapFaqContainer.classList.add('faq-container');
            }
        } else {
            // Add back Sidepanel-Map-hover-text-group class
            if (!mapFaqContainer.classList.contains('Sidepanel-Map-hover-text-group')) {
                mapFaqContainer.classList.add('Sidepanel-Map-hover-text-group');
            }
        }
    }
    
    // Function to show target content
    function showTarget(target, isClick = false) {
        if (window.innerWidth > 1024 || isClick) {
            // Hide default map
            if (defaultImage) {
                defaultImage.style.display = 'none';
            }
            
            // Hide all maps
            document.querySelectorAll('.Sidepanel-Map-hover-img').forEach(img => {
                img.style.display = 'none';
            });
            
            // Show the target map
            const targetMap = document.getElementById(`map_${target}`);
            if (targetMap) {
                targetMap.style.display = 'flex';
            }
        }
        
        // Handle FAQ display based on screen size
        if (window.innerWidth > 1024) {
            // Desktop: Show only the target FAQ
            mapFaqItems.forEach(faq => {
                faq.style.display = 'none';
            });
            
            const targetFaq = document.querySelector(`.faq-item[data-target="${target}"]`);
            if (targetFaq) {
                targetFaq.style.display = 'flex';
            }
        } else {
            // Mobile/Tablet: Expand the target FAQ answer
            mapFaqItems.forEach(faq => {
                faq.classList.remove('active');
                const answer = faq.querySelector('.faq-answer');
                const chevron = faq.querySelector('.faq-icon');
                
                // Collapse all answers
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
                
                // Expand the target FAQ answer
                if (answer) {
                    answer.style.display = 'block';
                }
                if (chevron) {
                    chevron.style.transform = 'rotate(180deg)';
                }
                
                // Scroll to the FAQ item
                targetFaq.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    }
    
    // Function to reset to default
    function resetToDefault() {
        if (window.innerWidth > 1024) {
            // Hide all maps
            document.querySelectorAll('.Sidepanel-Map-hover-img').forEach(img => {
                img.style.display = 'none';
            });
            
            // Hide all FAQ items
            mapFaqItems.forEach(faq => {
                faq.style.display = 'none';
            });
            
            // Show default map
            if (defaultImage) {
                defaultImage.style.display = 'flex';
            }
        } else {
            // On mobile, reset all FAQ answers to collapsed
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
            
            // Show default map
            if (defaultImage) {
                defaultImage.style.display = 'flex';
            }
            
            // Hide other maps
            document.querySelectorAll('.Sidepanel-Map-hover-img').forEach(img => {
                if (img.id !== 'map_default') {
                    img.style.display = 'none';
                }
            });
        }
    }
    
    // Setup event listeners for hover/click items
    function setupMapItemListeners() {
        hoverItems.forEach(item => {
            const target = item.getAttribute('data-target');
            
            // Remove existing event listeners
            item.removeEventListener('mouseenter', handleMouseEnter);
            item.removeEventListener('mouseleave', handleMouseLeave);
            item.removeEventListener('click', handleClick);
            item.removeEventListener('touchstart', handleTouch);
            
            if (window.innerWidth > 1024) {
                // Desktop: Use hover events
                item.addEventListener('mouseenter', handleMouseEnter);
                item.addEventListener('mouseleave', handleMouseLeave);
            } else {
                // Mobile/Tablet: Use click and touch events
                item.addEventListener('click', handleClick);
                item.addEventListener('touchstart', handleTouch);
            }
            
            function handleMouseEnter() {
                showTarget(target);
            }
            
            function handleMouseLeave() {
                resetToDefault();
            }
            
            function handleClick() {
                showTarget(target, true);
            }
            
            function handleTouch(e) {
                e.preventDefault();
                showTarget(target, true);
            }
        });
    }
    
    // Setup FAQ question click listeners for mobile
    function setupFaqQuestionListeners() {
        if (window.innerWidth <= 1024) {
            document.querySelectorAll('.Sidepanel-Map-hover .faq-question').forEach(question => {
                // Remove existing listeners to prevent duplicates
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
                    
                    // Show corresponding map when FAQ is clicked
                    showTarget(target, true);
                });
            });
        }
    }
    
    // Initial setup
    function initialize() {
        if (window.innerWidth > 1024) {
            adjustFaqForDesktop();
            // On desktop, initially hide all FAQ items
            mapFaqItems.forEach(faq => {
                faq.style.display = 'none';
            });
        } else {
            adjustFaqForMobile();
            // On mobile, show all FAQ items but answers collapsed
            mapFaqItems.forEach(faq => {
                faq.style.display = 'flex';
                const answer = faq.querySelector('.faq-answer');
                if (answer) {
                    answer.style.display = 'none';
                }
                const chevron = faq.querySelector('.faq-icon');
                if (chevron) {
                    chevron.style.transform = 'rotate(0deg)';
                }
            });
        }
        
        updateContainerClass();
        setupMapItemListeners();
        setupFaqQuestionListeners();
        
        // Ensure default map is shown
        if (defaultImage) {
            defaultImage.style.display = 'flex';
        }
    }
    
    // Run initial setup
    initialize();
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            initialize();
        }, 100);
    });
});

// Scroll to top button
(function() {
    if (window.innerWidth <= 1024) return; // Only run on desktop
    
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
    
    document.querySelectorAll('.Sidepanel-Map-hover-img-item').forEach(item => {
        let hoverTimeout;
        
        item.addEventListener('mouseenter', function(e) {
            clearTimeout(hoverTimeout);
            
            hoverTimeout = setTimeout(() => {
                smoothScrollToSidepanel();
            }, 50);
        });
        
        item.addEventListener('mouseleave', function() {
            clearTimeout(hoverTimeout);
        });
        
        item.addEventListener('click', function() {
            sidepanelMap.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        
        item.addEventListener('touchstart', function() {
            sidepanelMap.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, { passive: true });
    });
})();


document.querySelectorAll('.Sidepanel-Map-hover-img-item').forEach(img => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.addEventListener('load', () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
    });

    function isOpaquePixel(event) {
        const rect = img.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) * (img.naturalWidth / rect.width));
        const y = Math.floor((event.clientY - rect.top) * (img.naturalHeight / rect.height));

        if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) {
            return false;
        }

        const alpha = ctx.getImageData(x, y, 1, 1).data[3];
        return alpha > 10; // threshold for transparency
    }

    img.addEventListener('mousemove', e => {
        if (isOpaquePixel(e)) {
            img.classList.add('pixel-hover');
        } else {
            img.classList.remove('pixel-hover');
        }
    });

    img.addEventListener('mouseleave', () => {
        img.classList.remove('pixel-hover');
    });
});

document.querySelectorAll('.Sidepanel-Map-hover-img-item').forEach(img => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const originalZ = getComputedStyle(img).zIndex || 'auto';

    function drawImageToCanvas() {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
    }

    if (img.complete) {
        drawImageToCanvas();
    } else {
        img.addEventListener('load', drawImageToCanvas);
    }

    function isOpaquePixel(event) {
        const rect = img.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) * (img.naturalWidth / rect.width));
        const y = Math.floor((event.clientY - rect.top) * (img.naturalHeight / rect.height));

        if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) {
            return false;
        }

        return ctx.getImageData(x, y, 1, 1).data[3] > 10;
    }

    img.addEventListener('mousemove', e => {
        if (isOpaquePixel(e)) {
            img.classList.add('pixel-hover');
            img.style.zIndex = '2';
        } else {
            img.classList.remove('pixel-hover');
            img.style.zIndex = originalZ;
        }
    });

    img.addEventListener('mouseleave', () => {
        img.classList.remove('pixel-hover');
        img.style.zIndex = originalZ;
    });
});
