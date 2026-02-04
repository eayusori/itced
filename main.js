
// clock

function updateTime() {
  const now = new Date();

  let h = now.getHours();
  let ampm = h >= 12 ? "PM" : "AM";
  let m = now.getMinutes();
  let s = now.getSeconds();

  h = h % 12;
  if (h === 0) h = 12;

  h = h < 10 ? "0" + h : "" + h;
  m = m < 10 ? "0" + m : "" + m;
  s = s < 10 ? "0" + s : "" + s;

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const dateStr = `${days[now.getDay()]} ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

  document.querySelectorAll(".hrs").forEach(el => (el.textContent = h));
  document.querySelectorAll(".min").forEach(el => (el.textContent = m));
  document.querySelectorAll(".sec").forEach(el => (el.textContent = s));
  document.querySelectorAll(".ampm").forEach(el => (el.textContent = ampm));
  document.querySelectorAll(".date").forEach(el => (el.textContent = dateStr));
}

setInterval(updateTime, 1000);
updateTime();

//cursor
const cursor = document.querySelector(".cursor");

if (cursor) {
  // move cursor
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  // elements that trigger hover state
  const hoverTargets = document.querySelectorAll(
    "a, button, .workButton, .projectGridImg"
  );

  hoverTargets.forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("is-hovering");
    });

    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("is-hovering");
    });
  });
}

const bouncingItem = document.querySelector(".bouncingImg");

if (bouncingItem) {
  let x = 20;
  let y = 20;

  let xspeed = 1.5;
  let yspeed = 1;

  const bounceImgs = [
    "./images/huhBlue.png",
    "./images/huhGreen.png",
    "./images/huhYellow.png",
    "./images/huhPink.png",
    "./images/huhLBlue.png",
  ];

  bounceImgs.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  let defaultImg = bouncingItem.src;

  function setRandomBounceImage() {
    const current = bouncingItem.getAttribute("src");
    const options = bounceImgs.filter((s) => s !== current);
    const next = options[Math.floor(Math.random() * options.length)];
    bouncingItem.src = next;
    defaultImg = next;
  }

  function bounceAnimation() {
    const w = bouncingItem.offsetWidth;
    const h = bouncingItem.offsetHeight;

    x += xspeed;
    y += yspeed;

    let bounced = false;

    if (x <= 0 || x >= window.innerWidth - w) {
      xspeed *= -1;
      bounced = true;
    }

    if (y <= 0 || y >= window.innerHeight - h) {
      yspeed *= -1;
      bounced = true;
    }

    x = Math.min(Math.max(x, 0), window.innerWidth - w);
    y = Math.min(Math.max(y, 0), window.innerHeight - h);

    if (bounced && !bouncingItem.classList.contains("is-hovering")) {
      setRandomBounceImage();
    }

    bouncingItem.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(bounceAnimation);
  }

  setTimeout(() => {
    bouncingItem.classList.add("active");
    bounceAnimation();
  }, 1000);

  document.querySelectorAll(".workButton").forEach((button) => {
    const hoverImg = button.dataset.img;

    if (hoverImg) {
      const preload = new Image();
      preload.src = hoverImg;
    }

    button.addEventListener("mouseenter", () => {
      if (hoverImg) bouncingItem.src = hoverImg;
      bouncingItem.classList.add("is-hovering");
    });

    button.addEventListener("mouseleave", () => {
      bouncingItem.classList.remove("is-hovering");
      bouncingItem.src = defaultImg; 
    });
  });
}

// carousel 

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".carousel .mySlide");
  const thumbs = document.querySelectorAll(".carousel .thumb");

  if (!slides.length || !thumbs.length) return;

  thumbs.forEach((thumb, i) => {
    thumb.addEventListener("click", () => {
      slides.forEach((s) => s.classList.remove("active"));
      thumbs.forEach((t) => t.classList.remove("active"));

      slides[i].classList.add("active");
      thumbs[i].classList.add("active");
    });
  });
});

function toggleSize(element) {
  element.classList.toggle('expanded');
}

function detectAndShowPopup() {
  const popupOverlay = document.getElementById("popupOverlay");
  const closeButton = document.getElementById("closeButton");

  if (!popupOverlay || !closeButton) return;

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    popupOverlay.style.display = "flex";
  }

  closeButton.addEventListener("click", () => {
    popupOverlay.style.display = "none";
  });

  popupOverlay.addEventListener("click", (event) => {
    if (event.target === popupOverlay) {
      popupOverlay.style.display = "none";
    }
  });
}

window.addEventListener("load", detectAndShowPopup);