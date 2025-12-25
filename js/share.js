document.addEventListener('DOMContentLoaded', function() {
    console.log('Social sharing script loaded');
    
    const socialItems = document.querySelectorAll('.Header-Socials-Item-Share');
    
   
    function getCurrentURL() {
        return window.location.href;
    }
    
    
    function copyToClipboard(text) {
        return new Promise((resolve, reject) => {
          
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text).then(resolve).catch(err => {
                 
                    fallbackCopyText(text) ? resolve() : reject(err);
                });
            } else {
                 
                fallbackCopyText(text) ? resolve() : reject(new Error('Clipboard API not available'));
            }
        });
    }
    
    // Fallback copy method for older browsers
    function fallbackCopyText(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            return successful;
        } catch (err) {
            console.error('Fallback copy failed:', err);
            document.body.removeChild(textArea);
            return false;
        }
    }
    
    
    function copyURLAndShare() {
        const url = getCurrentURL();
        console.log('Sharing URL:', url);
        
        
        copyToClipboard(url).then(() => {
            console.log('URL copied to clipboard successfully');
            
          
            showFeedback('URL copied!');
            
           
            if (navigator.share) {
                console.log('Web Share API available');
                navigator.share({
                    title: document.title,
                    text: 'Check this out!',
                    url: url
                }).then(() => {
                    console.log('Share successful');
                }).catch((error) => {
                    console.log('Share cancelled or error:', error);
        
                    if (error.name !== 'AbortError') {
                        showFeedback('Share cancelled');
                    }
                });
            } else {
                console.log('Web Share API not available');
       
            }
        }).catch(err => {
            console.error('Failed to copy URL: ', err);
            showFeedback('Failed to copy URL', true);
        });
    }
    

    function showFeedback(message, isError = false) {
     
        const existingFeedback = document.querySelector('.copy-feedback');
        if (existingFeedback) {
            document.body.removeChild(existingFeedback);
        }
        
      
        const feedback = document.createElement('div');
        feedback.className = 'copy-feedback';
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${isError ? '#ff4444' : '#4CAF50'};
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            z-index: 9999;
            font-family: Arial, sans-serif;
            font-size: 14px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            animation: fadeInOut 3s forwards;
        `;
        
        
        if (!document.querySelector('#feedback-styles')) {
            const style = document.createElement('style');
            style.id = 'feedback-styles';
            style.textContent = `
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translateY(-10px); }
                    10% { opacity: 1; transform: translateY(0); }
                    90% { opacity: 1; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(-10px); }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(feedback);
        

        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 3000);
    }
    
   
    function shareOnSocial(platform) {
        const url = encodeURIComponent(getCurrentURL());
        const title = encodeURIComponent(document.title || '');
        const text = encodeURIComponent('Check this out!');
        
        const shareURLs = {
            'x': `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
            'fb': `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            'in': `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            'ig': `https://www.instagram.com/` 
        };
        
        console.log(`Sharing on ${platform}:`, shareURLs[platform]);
        
        if (shareURLs[platform]) {
            if (platform === 'ig') {
           
                window.open(shareURLs[platform], '_blank');
                showFeedback('Please share manually on Instagram');
                return;
            }
            
         
            const width = 600;
            const height = 500;
            const left = window.screenLeft + (window.innerWidth - width) / 2;
            const top = window.screenTop + (window.innerHeight - height) / 2;
            
            const popup = window.open(
                shareURLs[platform],
                'social-share',
                `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes,toolbar=no,location=yes,status=no,menubar=no`
            );
            
            if (!popup) {
                showFeedback('Please allow popups to share', true);
            
                window.open(shareURLs[platform], '_blank');
            }
        }
    }
    

    function getPlatformFromImage(imgSrc) {
        if (!imgSrc) return null;
        
        const filename = imgSrc.split('/').pop().toLowerCase();
        console.log('Image filename:', filename);
        
        if (filename.includes('link') || filename.includes('copy')) return 'link';
        if (filename.includes('x') || filename.includes('twitter')) return 'x';
        if (filename.includes('fb') || filename.includes('facebook')) return 'fb';
        if (filename.includes('in') || filename.includes('linkedin')) return 'in';
        if (filename.includes('ig') || filename.includes('instagram')) return 'ig';
        
        return null;
    }
    
  
    socialItems.forEach((item, index) => {
        console.log(`Setting up social item ${index + 1}`);
        
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Social item clicked');
            

            const img = this.querySelector('img');
            if (!img) {
                console.log('No image found in clicked item');
                return;
            }
            
            const platform = getPlatformFromImage(img.src || img.getAttribute('src'));
            console.log('Detected platform:', platform);
            
            if (platform === 'link') {
                copyURLAndShare();
            } else if (platform) {
                shareOnSocial(platform);
            } else {
                console.log('Unknown platform for image:', img.src);
                showFeedback('Sharing not available', true);
            }
        });
        

        item.style.cursor = 'pointer';
        const img = item.querySelector('img');
        if (img) {
            const platform = getPlatformFromImage(img.src || img.getAttribute('src'));
            if (platform === 'link') {
                item.title = 'Copy link & share';
            } else if (platform) {
                item.title = `Share on ${platform.toUpperCase()}`;
            }
        }
    });
    
    console.log('Social sharing setup complete');
});