document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab-link');
    const underline = document.querySelector('.underline');
    
    if (!underline) return;

    function setUnderlinePosition(tab) {
        const tabLeft = tab.offsetLeft;
        const tabWidth = tab.offsetWidth;
        
        underline.style.width = tabWidth + 'px';
        underline.style.left = tabLeft + 'px';
    }

    function updateUnderline() {
        const activeTab = document.querySelector('.tab-link.active');
        if (activeTab) {
            setUnderlinePosition(activeTab);
        }
    }

    function handleTabClick(e) {
        const clickedTab = this;
        const currentUrl = window.location.pathname;
        const targetUrl = clickedTab.getAttribute('href');
        
        
        if (currentUrl.includes(targetUrl.replace('./', ''))) {
            e.preventDefault();
        }
        
      
        tabs.forEach(tab => tab.classList.remove('active'));
        clickedTab.classList.add('active');
        setUnderlinePosition(clickedTab);
    }

    function initTabs() {
  
        const currentUrl = window.location.pathname;
        
        tabs.forEach(tab => {
            const tabHref = tab.getAttribute('href');
            if (currentUrl.includes(tabHref.replace('./', ''))) {
                tab.classList.add('active');
            }
        });
        
        
        const activeTab = document.querySelector('.tab-link.active');
        if (activeTab) {
            setUnderlinePosition(activeTab);
        }
        
       
        tabs.forEach(tab => {
            tab.addEventListener('click', handleTabClick);
        });
        
        window.addEventListener('resize', updateUnderline);
    }

    initTabs();
    window.addEventListener('load', updateUnderline);
});