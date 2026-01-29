document.addEventListener("DOMContentLoaded", () => {
    fetch("/navbar.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Navbar failed to load");
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
        })
        .catch(error => {
            console.error(error);
        });
});