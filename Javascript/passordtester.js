const pwd = document.getElementById("pwd");
const bar = document.getElementById("bar");
const scoreEl = document.getElementById("score");
const crackEl = document.getElementById("crack");
const feedbackEl = document.getElementById("feedback");
const detailsEl = document.getElementById("details");
const toggle = document.getElementById("toggle");
const gen = document.getElementById("gen");

function humanCrackTimeDisplay(seconds) {
  if (!isFinite(seconds) || seconds === 0) return "umiddelbart";
  const units = [
    ["år", 60 * 60 * 24 * 365],
    ["dager", 60 * 60 * 24],
    ["timer", 60 * 60],
    ["minutter", 60],
    ["sekunder", 1],
  ];
  for (const [name, sec] of units) {
    if (seconds >= sec) {
      const v = Math.floor(seconds / sec);
      if (name === "år" && v > 200) return "flere århundrer";
      return `${v} ${name}`;
    }
  }
  return "under ett sekund";
}

function update() {
  const value = pwd.value || "";
  if (value.length === 0) {
    bar.style.width = "0%";
    bar.style.background = "#ccc";
    scoreEl.textContent = "—";
    crackEl.textContent = "—";
    feedbackEl.textContent = "Skriv inn et passord.";
    detailsEl.textContent = "Ingen data";
    return;
  }

  const r = zxcvbn(value);
  const s = r.score;
  scoreEl.textContent = `${s} / 4`;
  const pct = (s / 4) * 100;
  bar.style.width = pct + "%";
  bar.style.background = s <= 1 ? "#ef4444" : s === 2 ? "#f59e0b" : "#007700";
  const t = r.crack_times_seconds.offline_slow_hashing_1e4_per_second || 0;
  crackEl.textContent = humanCrackTimeDisplay(t);

  const fb = [];
  if (r.feedback.warning) fb.push(r.feedback.warning);
  if (r.feedback.suggestions && r.feedback.suggestions.length)
    fb.push(...r.feedback.suggestions);
  feedbackEl.innerHTML = fb.length
    ? fb.map((x) => `• ${x}`).join("<br>")
    : "Ingen spesifikke forslag — bra!";

  let guessesText =
    r.guesses >= 100000000000000
      ? "over 100 billioner"
      : Number(r.guesses).toLocaleString();
  detailsEl.innerHTML = `Lengde: <strong>${value.length}</strong> · Gjett: <strong>${guessesText}</strong>`;
}

pwd.addEventListener("input", update);
toggle.addEventListener("click", () => {
  if (pwd.type === "password") {
    pwd.type = "text";
    toggle.textContent = "Skjul";
  } else {
    pwd.type = "password";
    toggle.textContent = "Vis";
  }
  pwd.focus();
});

gen.addEventListener("click", () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*?_-+=";
  let pass = "";
  for (let i = 0; i < 20; i++)
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  pwd.value = pass;
  update();
  pwd.select();
});

update();
