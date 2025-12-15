function adjustZoom() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // First condition: width 1024-1500 AND height 740-1000
  if (width >= 1024 && width <= 1500 && height >= 740 && height <= 1000) {
    document.body.style.zoom = "0.8"; // 90% (as you mentioned)
  } 
  // Second condition: width 750-1670 (no height restriction)
  else if (width >= 750 && width <= 1670) {
    document.body.style.zoom = "0.7"; // 80%
  } 
  // Default
  else {
    document.body.style.zoom = "1";
  }
}

window.addEventListener("resize", adjustZoom);
window.addEventListener("load", adjustZoom);