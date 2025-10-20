document.addEventListener('DOMContentLoaded', () => {
  const pairs = [
    { word: "Phishing", meaning: "Svindelforsøk som utnytter spoofing til å forfalske identiteten til svindleren." },
    { word: "Brannmur", meaning: "nettverk sikkerhet system som blokkerer trussler" },
    { word: "Malware", meaning: "Ondartet kode som er designet for å skade maskiner" },
    { word: "VPN", meaning: "Gjør internet tilkoblingen sikker ved å kryptere trafikken" },
    { word: "To-Faktor autentisering", meaning: "Extra login steg for å verifisere identiteten din" },
  ];

  const wordsList = document.getElementById("words-list");
  const meaningsList = document.getElementById("meanings-list");
  const message = document.getElementById("game-message");
  const resetBtn = document.getElementById("reset-btn");

  let selectedWord = null;
  let selectedMeaning = null;
  let matches = 0;

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function clearSelection(type) {
    if (type === "word" && selectedWord) {
      selectedWord.classList.remove("selected");
      selectedWord = null;
    }
    if (type === "meaning" && selectedMeaning) {
      selectedMeaning.classList.remove("selected");
      selectedMeaning = null;
    }
  }

  function clearAllSelections() {
    clearSelection("word");
    clearSelection("meaning");
  }

  function checkMatch() {
    if (selectedWord && selectedMeaning) {
      const wordText = selectedWord.dataset.word;
      const meaningText = selectedMeaning.dataset.meaning;

      const isCorrect = pairs.some(pair => pair.word === wordText && pair.meaning === meaningText);

      if (isCorrect) {
        selectedWord.classList.add("matched");
        selectedMeaning.classList.add("matched");
        message.textContent = "✅ Correct match!";
        matches++;

        clearAllSelections();

        if (matches === pairs.length) {
          message.textContent = "🎉 You matched all correctly! You win!";
          resetBtn.style.display = "inline-block";
        }
      } else {
        message.textContent = "❌ Not a match. Try again!";
        setTimeout(() => {
          clearAllSelections();
          message.textContent = "";
        }, 1000);
      }
    }
  }

  function createListItems() {
    wordsList.innerHTML = "";
    meaningsList.innerHTML = "";

    const shuffledWords = shuffle([...pairs]);
    const shuffledMeanings = shuffle([...pairs]);

    shuffledWords.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item.word;
      li.dataset.word = item.word;

      li.addEventListener("click", () => {
        if (li.classList.contains("matched")) return;

        if (selectedWord === li) {
          // Clicking selected word again: unselect
          clearSelection("word");
        } else {
          clearSelection("word");
          selectedWord = li;
          li.classList.add("selected");
          checkMatch();
        }
      });
      wordsList.appendChild(li);
    });

    shuffledMeanings.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item.meaning;
      li.dataset.meaning = item.meaning;

      li.addEventListener("click", () => {
        if (li.classList.contains("matched")) return;

        if (selectedMeaning === li) {
          // Clicking selected meaning again: unselect
          clearSelection("meaning");
        } else {
          clearSelection("meaning");
          selectedMeaning = li;
          li.classList.add("selected");
          checkMatch();
        }
      });
      meaningsList.appendChild(li);
    });
  }

  resetBtn.addEventListener("click", () => {
    matches = 0;
    message.textContent = "";
    resetBtn.style.display = "none";
    selectedWord = null;
    selectedMeaning = null;
    createListItems();
  });

  // Initialize the game
  createListItems();
});
