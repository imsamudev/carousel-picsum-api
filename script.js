document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("carousel");
  let currentImageIndex = 2;
  let images = [];

  const modal = document.createElement("div");
  modal.classList.add("modal");
  const modalImg = document.createElement("img");
  modalImg.classList.add("modal-content");
  const closeBtn = document.createElement("span");
  closeBtn.classList.add("close");
  closeBtn.innerHTML = "×";
  modal.appendChild(modalImg);
  modal.appendChild(closeBtn);
  document.body.appendChild(modal);

  function updateCarousel() {
    carousel.innerHTML = "";
    for (let i = -2; i <= 2; i++) {
      const imgIndex = (currentImageIndex + i + images.length) % images.length;
      const img = document.createElement("img");
      img.src = images[imgIndex].download_url;
      img.alt = images[imgIndex].author;
      if (i === 0) {
        img.classList.add("active");
        animateImage(img);
      }

      img.addEventListener("click", function () {
        modalImg.src = this.src;
        modal.style.opacity = 0;
        modal.style.display = "block";
        fadeIn(modal, 0.1);
      });
      carousel.appendChild(img);
    }
  }

  function animateImage(img) {
    let scale = 1;
    let opacity = 0.7;
    const scaleIncrement = 0.05;
    const opacityIncrement = 0.018;
    function step() {
      scale += scaleIncrement;
      opacity += opacityIncrement;
      img.style.transform = `scale(${scale})`;
      img.style.opacity = opacity;
      if (scale < 2 && opacity < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  function fadeIn(element) {
    let opacity = 0;
    const increment = 0.05;
    function step() {
      opacity += increment;
      element.style.opacity = opacity;
      if (opacity < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  function fetchImages() {
    fetch("https://picsum.photos/v2/list?page=3&limit=30")
      .then((response) => response.json())
      .then((data) => {
        images = data;
        updateCarousel();
      })
      .catch((error) => console.error("Error al obtener imágenes:", error));
  }

  document.getElementById("prevBtn").addEventListener("click", function () {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateCarousel();
  });

  document.getElementById("nextBtn").addEventListener("click", function () {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateCarousel();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      currentImageIndex =
        (currentImageIndex - 1 + images.length) % images.length;
      updateCarousel();
    } else if (event.key === "ArrowRight") {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      updateCarousel();
    }
  });

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  fetchImages();
});
