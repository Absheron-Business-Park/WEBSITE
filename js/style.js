
const corsProxy = 'https://corsproxy.io/?';
const cssUrl = 'https://raw.githubusercontent.com/Absheron-Business-Park/WEBSITE/refs/heads/main/style.css';

fetch(corsProxy + encodeURIComponent(cssUrl))
    .then(response => response.text())
    .then(css => {
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
        console.log('CSS loaded from GitHub');
    })
    .catch(error => {
        console.error('Failed to load CSS:', error);
       
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'style.css';
        document.head.appendChild(link);
    });