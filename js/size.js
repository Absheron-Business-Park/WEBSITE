
// (function () {

//   function adjustZoom() {
//     const width = window.innerWidth;
//     const height = window.innerHeight;
//     const headerGroup = document.querySelector(".Header-Group");
//     let appliedZoom = "1";

 
//     if (width > 1100 && width <= 1295) {
//       appliedZoom = "0.8";
//     }
//     else if (width >= 1024 && width <= 1500) {
//       if (height >= 720 && height <= 1000) {
//         appliedZoom = "0.85";
//       }
//       else if (height >= 620 && height < 720) {
//         appliedZoom = "0.8";
//       }
//       else {
//         appliedZoom = "1";
//       }
//     }
//     else if (width > 1500 && width <= 1670) {
//       appliedZoom = "0.85";
//     }


//     document.body.style.zoom = appliedZoom;

//     if (headerGroup) {
//       if (width >= 1024 && height < 730) {
//         headerGroup.style.height = "85dvh";
//       } else {
//         headerGroup.style.height = "";
//       }
//     }

//    }


//   document.addEventListener("DOMContentLoaded", adjustZoom);

//   window.addEventListener("resize", adjustZoom);

// })();




(function () {

  function adjustZoom() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const headerGroup = document.querySelector(".Header-Group");
    let appliedZoom = "1";

    if (width > 1100 && width <= 1295) {
      appliedZoom = "0.8";
    }
    else if (width >= 1024 && width <= 1500) {
      if (height >= 720 && height <= 1000) {
        appliedZoom = "0.85";
      }
      else if (height >= 620 && height < 720) {
        appliedZoom = "0.8";
      }
    }
    else if (width > 1500 && width <= 1670) {
      appliedZoom = "0.85";
    }

    document.body.style.zoom = appliedZoom;

    document.body.classList.toggle("zoom-08", appliedZoom === "0.8");
    document.body.classList.toggle("zoom-085", appliedZoom === "0.85");

    if (headerGroup) {
      if (width >= 1024 && height < 730) {
        headerGroup.style.height = "85dvh";
      } else {
        headerGroup.style.height = "";
      }
    }
  }

  document.addEventListener("DOMContentLoaded", adjustZoom);
  window.addEventListener("resize", adjustZoom);

})();
