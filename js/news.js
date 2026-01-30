function setNewsGridLayout() {
    const newsGroup = document.querySelector('.News-Group-Section');
    const newsItems = document.querySelectorAll('.Section-Elements-Item-News');
    const itemCount = newsItems.length;
    
    
    const screenWidth = window.innerWidth;
    
   
    if (screenWidth >= 1024) {
         
        newsGroup.style.maxWidth = '';
        newsGroup.style.gridTemplateColumns = '';
        
       
        if (itemCount >= 5) {
        
        } 
        else if (itemCount === 4) {
            newsGroup.style.gridTemplateColumns = 'repeat(4, 1fr)';
            newsGroup.style.maxWidth = '1450px';
        }
        else if (itemCount === 3) {
            newsGroup.style.gridTemplateColumns = 'repeat(3, 1fr)';
            newsGroup.style.maxWidth = '1150px';
        }
        else if (itemCount === 2) {
            newsGroup.style.gridTemplateColumns = 'repeat(2, 1fr)';
            newsGroup.style.maxWidth = '750px';
        }
        else if (itemCount === 1) {
            newsGroup.style.gridTemplateColumns = 'repeat(1, 1fr)';
            newsGroup.style.maxWidth = '100%';
        }
    } else {
        
        newsGroup.style.maxWidth = '';
        newsGroup.style.gridTemplateColumns = '';
    }
}

 
document.addEventListener('DOMContentLoaded', setNewsGridLayout);

window.addEventListener('resize', setNewsGridLayout);

const observer = new MutationObserver(setNewsGridLayout);
const config = { childList: true, subtree: true };

const newsContainer = document.querySelector('.News-Group-Section');
if (newsContainer) {
    observer.observe(newsContainer, config);
}