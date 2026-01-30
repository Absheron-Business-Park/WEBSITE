const owner = 'Absheron-Business-Park';
const repo = 'WEBSITE';
const path = 'style.css';
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
// https://github.com/Absheron-Business-Park/WEBSITE/blob/main/style.css

fetch(apiUrl, {
    headers: {
        'Accept': 'application/vnd.github.v3.raw'
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`GitHub API error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(css => {
        const existingStyle = document.querySelector('style[data-source="github-api"]');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        const style = document.createElement('style');
        style.setAttribute('data-source', 'github-api');
        style.textContent = css;
        document.head.appendChild(style);
        console.log('CSS loaded from GitHub API (always fresh)');
    })
    .catch(error => {
        console.error('Failed to load CSS from GitHub API:', error);
        loadFallbackCSS();
    });

function loadFallbackCSS() {
    if (!document.querySelector('link[href="style.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'style.css';
        document.head.appendChild(link);
        console.log('Using fallback CSS');
    }
}