// =========================
// Clock
// =========================
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
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
}

// Bouncing image (cow)
const bouncingItem = document.querySelector(".bouncingImg");

if (bouncingItem) {
  let x = 20;
  let y = 20;

  let xspeed = 1.5;
  let yspeed = 1;

  function bounceAnimation() {
    const w = bouncingItem.offsetWidth;
    const h = bouncingItem.offsetHeight;

    x += xspeed;
    y += yspeed;

    if (x <= 0 || x >= window.innerWidth - w) xspeed *= -1;
    if (y <= 0 || y >= window.innerHeight - h) yspeed *= -1;

    // clamp so it never goes offscreen
    x = Math.min(Math.max(x, 0), window.innerWidth - w);
    y = Math.min(Math.max(y, 0), window.innerHeight - h);

    bouncingItem.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(bounceAnimation);
  }

  setTimeout(() => {
    bouncingItem.classList.add("active");
    bounceAnimation();
  }, 3000);

  const defaultImg = bouncingItem.src;

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
      bouncingItem.src = defaultImg;
      bouncingItem.classList.remove("is-hovering");
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