const navbarHTML = `
      <a href='index.html' id='nav-intro'>
        <span class='nav-number'>1</span>
        Intro
      </a>
      <a href='passord.html' id='nav-passord'>
        <span class='nav-number'>2</span>
        Passord
      </a>
      <a href='nettsider.html' id='nav-nettsider'>
        <span class='nav-number'>3</span>
        Usikre nettsider
      </a>
      <a href='phishing.html' id='nav-phishing'>
        <span class='nav-number'>4</span>
        Phishing
      </a>
      <a href='spoofing.html' id='nav-spoofing'>
        <span class='nav-number'>5</span>
        Spoofing
      </a>
      <a href='offentligWifi.html' id='nav-offentligWifi'>
        <span class='nav-number'>6</span>
        Offentlig WiFi
      </a>
      <a href='utpressing.html' id='nav-utpressing'>
        <span class='nav-number'>7</span>
        Utpressing
      </a>
      <a href='avslutning.html' id='nav-avslutning'>
        <span class='nav-number'>8</span>
        Avslutning
      </a>`;

document.getElementById("navbar").innerHTML = navbarHTML;

const urlToNavId = {
  "/index.html": "nav-intro",
  "/passord.html": "nav-passord",
  "/nettsider.html": "nav-nettsider",
  "/phishing.html": "nav-phishing",
  "/spoofing.html": "nav-spoofing",
  "/offentligWifi.html": "nav-offentligWifi",
  "/utpressing.html": "nav-utpressing",
  "/avslutning.html": "nav-avslutning",
};

const segments = window.location.pathname.split("/").filter(Boolean);
const currentPath = segments.length ? `/${segments.pop()}` : "/index.html";

const navIdToActivate = urlToNavId[currentPath];
const element = document.getElementById(navIdToActivate);

if (element) {
  element.classList.add("active");
} else {
  console.log("Element not found:", navIdToActivate);
}

const mobileNavbarHTML = `
    <button class='close-btn' id='closeBtn'>&times;</button>
    <a href='index.html' id='mobile-nav-intro'>Intro</a>
    <a href='passord.html' id='mobile-nav-passord'>Passord</a>
    <a href='nettsider.html' id='mobile-nav-nettsider'>Usikre nettsider</a>
    <a href='phishing.html' id='mobile-nav-phishing'>Phishing</a>
    <a href='spoofing.html' id='mobile-nav-spoofing'>Spoofing</a>
    <a href='offentligWifi.html' id='mobile-nav-wifi'>Offentlig WiFi</a>
    <a href='utpressing.html' id='mobile-nav-utpressing'>Utpressing</a>
    <a href='avslutning.html' id='mobile-nav-avslutning'>Avslutning</a>
  `;

const header = document.querySelector(".header");
if (header) {
  const hamburger = document.createElement("button");
  hamburger.className = "hamburger";
  hamburger.id = "hamburger";
  hamburger.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;
  header.appendChild(hamburger);
}

const overlay = document.createElement("div");
overlay.className = "overlay";
overlay.id = "overlay";
document.body.appendChild(overlay);

document.getElementById("mobileNavbar").innerHTML = mobileNavbarHTML;

const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNavbar");
const overlayElement = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");

if (hamburger) {
  hamburger.addEventListener("click", function () {
    hamburger.style.display = "none";
    mobileNav.classList.add("active");
    overlayElement.classList.add("active");
    document.body.style.overflow = "hidden";
  });
}

function closeMenu() {
  if (hamburger) hamburger.classList.remove("active");
  if (mobileNav) mobileNav.classList.remove("active");
  if (overlayElement) overlayElement.classList.remove("active");
  hamburger.style.display = "";
  document.body.style.overflow = "";
}

if (closeBtn) {
  closeBtn.addEventListener("click", closeMenu);
}

if (overlayElement) {
  overlayElement.addEventListener("click", closeMenu);
}

const mobileLinks = document.querySelectorAll(".mobile-nav-bar a");
mobileLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});