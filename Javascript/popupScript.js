const popup = document.getElementById("scrollPopup");
const closeBtn2 = document.getElementById("closePopup");

let popupShown = false; // Sjekker om pop-up'en har blitt vist. Pop-up'en skal altså ikke vises to ganger

window.addEventListener("scroll", () => {
    const triggerHeight = 600; // Antall px (fra toppen) før pop-up'en aktiveres
    // Så lenge pop-up'en ikke har blitt vist tidligere og at brukeren har bladd langt nok ned, vises pop-up'en
    if (!popupShown && window.scrollY > triggerHeight) {
        popup.style.display = "flex";
        document.body.style.overflow = "hidden";
        popupShown = true; // Endrer på variabelen, nå har pop-up'en blitt vist
        // Funksjon fra linje 25 kalles
        startCountdown(300); // Nedtellingen starter sekundet pop-up'en vises. 300sek = 5 minutter
  }
});
// Lukkeknapp til pop-up'en
closeBtn2.addEventListener("click", () => {
    // Vis pop-up'en
    popup.style.display = "none";
    document.body.style.overflow = "auto";
    clearInterval(countdownInterval);
});
// Her starter tiden å renne ut
function startCountdown(seconds) {
    const countdownEl = document.getElementById("countdown");
    let remaining = seconds;

    function updateCountdown() {
        let mins = Math.floor(remaining / 60);
        let secs = remaining % 60;
        countdownEl.textContent = 
        // Tiden igjen på formen MM:SS
        `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        // Her slutter koden med nedtelling hvis tiden har gått ut
        if (remaining <= 0) {
        clearInterval(countdownInterval);
        countdownEl.textContent = "00:00";
        } else {
        remaining--;
        }
    }

    updateCountdown(); // show immediately
    countdownInterval = setInterval(updateCountdown, 1000);
}