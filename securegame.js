

    const ssScenarios = [
      {
        img: "Bilder/elkjop.png",
        isSecure: true,
        explanation: "Legit elkjop vare, på den offisielle nettsiden."
      },
      {
        img: "Bilder/jordans.png",
        isSecure: false,
        explanation: "En godt spoofet nettside. Den ser ut som den er ekte, men har ikke riktig URL. ikke bli lurt!"
      },
      {
        img: "Bilder/pay-pail.png",
        isSecure: false,
        explanation: "Klassisk phishing. Se på URL-en. Det står pay-pail istedet for pay-pal."
      },
      {
        img: "Bilder/NTNU.png",
        isSecure: true,
        explanation: "En legit og offisiell ntnu side. Jeg vet ikke hvorfor den består av ren HTML?"
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
        ssFeedback.textContent = `🎉 Game Over! You got ${ssScore} of ${ssScenarios.length} correct.`;
        ssImg.style.display = "none";
        ssNextBtn.style.display = "none";
      } else {
        ssLoad();
      }
    }
  window.addEventListener("DOMContentLoaded", () => {
    ssLoad(); // Initialize first scenario safely
  });
