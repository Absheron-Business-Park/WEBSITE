   (function() {
        // Start loading IMMEDIATELY
        const cssUrl = 'https://raw.githack.com/Absheron-Business-Park/WEBSITE/refs/heads/main/style.css';
        
        // Create link element NOW (not after fetch)
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssUrl;
        
        // Add to head immediately
        document.head.appendChild(link);
        
        // Fallback if githack fails
        link.onerror = function() {
            console.log('Primary CSS failed, trying proxy...');
            const corsProxy = 'https://corsproxy.io/?';
            const rawUrl = 'https://raw.githubusercontent.com/Absheron-Business-Park/WEBSITE/refs/heads/main/style.css';
            
            fetch(corsProxy + encodeURIComponent(rawUrl))
                .then(response => response.text())
                .then(css => {
                    const style = document.createElement('style');
                    style.textContent = css;
                    document.head.appendChild(style);
                });
        };
    })
    ();