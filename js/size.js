    function adjustZoom() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (width >= 1024 && width <= 1500 && height >= 740 && height <= 1000) {
        document.body.style.zoom = "0.8";
      } else {
        document.body.style.zoom = "1";
      }
    }

    window.addEventListener("resize", adjustZoom);
    window.addEventListener("load", adjustZoom);