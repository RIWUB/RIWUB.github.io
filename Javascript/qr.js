const isLeftSide = Math.random() < 0.5;

const initialTopPercent = 10 + Math.random() * 60;

const qrContainer = document.getElementById("qr-container");
if (isLeftSide) {
  qrContainer.style.left = "20px";
} else {
  qrContainer.style.right = "20px";
}
qrContainer.style.top = initialTopPercent + "%";

let lastScrollY = window.scrollY;
let randomOffset = 0;
let targetOffset = 0;

window.addEventListener("scroll", () => {
  const scrollDelta = window.scrollY - lastScrollY;
  lastScrollY = window.scrollY;

  if (Math.abs(scrollDelta) > 2) {
    targetOffset = (Math.random() - 0.5) * 30;
  }

  randomOffset += (targetOffset - randomOffset) * 0.1;

  const verticalMove = scrollDelta * 0.3;
  qrContainer.style.transform = `translate(${randomOffset}px, ${verticalMove}px)`;
});

let scrollTimeout;
window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    targetOffset = 0;
  }, 150);
});
