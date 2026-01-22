function adjustZoom() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const headerGroup = document.querySelector(".Header-Group");

  if (width >= 1024 && width <= 1500 && height >= 720 && height <= 1000) {
    document.body.style.zoom = "0.8";  
  } 
  else if (width >= 1028 && width <= 1670) {
    document.body.style.zoom = "0.7"; 
  } 
  else {
    document.body.style.zoom = "1";
  }

  if (width >= 1024 && height < 730 && headerGroup) {
    headerGroup.style.height = "85dvh";
  } else if (headerGroup) {
    headerGroup.style.height = "";
  }
}

window.addEventListener("resize", adjustZoom);
window.addEventListener("load", adjustZoom);
