

    const ssScenarios = [
      {
        img: "Bilder/elkjop.png",
        isSecure: true,
        explanation: "Legit Elkjøp-vare, på den offisielle nettsiden."
      },
      {
        img: "Bilder/jordans.png",
        isSecure: false,
        explanation: "Her claimer de å selge Jordans fra Nike Factory Store, men URL-en forteller oss at dette ikke er ekte. Prisen er også for god til å være sann. ikke bli lurt!"
      },
      {
        img: "Bilder/pay-pail.png",
        isSecure: false,
        explanation: "Klassisk phishing. Se på URL-en. Det står pay-pail istedet for PayPal."
      },
      {
        img: "Bilder/NTNU.png",
        isSecure: true,
        explanation: "En legit og offisiell NTNU side. Legg merke til den sikre tilkoblingen (https) og den korrekte domenenavnet (ntnu.no). Manglene CSS har ingenting å si."
      }
    ];

    let ssIndex = 0;
    let ssScore = 0;

    const ssImg = document.getElementById("ss-image");
    const ssFeedback = document.getElementById("ss-feedback");
    const ssScoreEl = document.getElementById("ss-score");
    const ssTotalEl = document.getElementById("ss-total");
    const ssNextBtn = document.getElementById("ss-next");

    function ssLoad() {
      const scenario = ssScenarios[ssIndex];
      ssImg.src = scenario.img;
      ssFeedback.textContent = "";
      ssNextBtn.style.display = "none";
      ssTotalEl.textContent = ssScenarios.length;
    }

    function ssChoose(answer) {
      const scenario = ssScenarios[ssIndex];
      if (answer === scenario.isSecure) {
        ssScore++;
        ssFeedback.textContent = "✅ Correct! " + scenario.explanation;
      } else {
        ssFeedback.textContent = "❌ Incorrect. " + scenario.explanation;
      }
      ssScoreEl.textContent = ssScore;
      ssNextBtn.style.display = "inline-block";
    }

    function ssNext() {
      ssIndex++;
      if (ssIndex >= ssScenarios.length) {
        ssFeedback.textContent = `🎉 Du fikk ${ssScore} av ${ssScenarios.length} riktig :)`;
        ssImg.style.display = "none";
        ssNextBtn.style.display = "none";
      } else {
        ssLoad();
      }
    }
  window.addEventListener("DOMContentLoaded", () => {
    ssLoad(); // Initialize first scenario safely
  });
