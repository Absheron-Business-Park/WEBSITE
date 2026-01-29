document.addEventListener("DOMContentLoaded", () => {
    fetch("/footer.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Footer failed to load");
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
        })
        .catch(error => {
            console.error(error);
        });
});