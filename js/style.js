// style.js - Updated version
const cssUrl = 'https://cdn.jsdelivr.net/gh/Absheron-Business-Park/WEBSITE@main/style.css';

fetch(cssUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(css => {
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
        console.log('CSS loaded from GitHub via CDN');
    })
    .catch(error => {
        console.error('Failed to load CSS from CDN:', error);
       
        // Fallback to local file
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'style.css';
        document.head.appendChild(link);
        console.log('Using fallback CSS');
    });