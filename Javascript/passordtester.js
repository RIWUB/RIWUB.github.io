const pwd = document.getElementById('pwd');
  const bar = document.getElementById('bar');
  const scoreEl = document.getElementById('score');
  const crackEl = document.getElementById('crack');
  const feedbackEl = document.getElementById('feedback');
  const detailsEl = document.getElementById('details');
  const toggle = document.getElementById('toggle');
  const gen = document.getElementById('gen');

  function humanCrackTimeDisplay(seconds) {
    if(!isFinite(seconds) || seconds === 0) return 'umiddelbart';
    const units = [['år', 60*60*24*365], ['dager', 60*60*24], ['timer', 60*60], ['minutter', 60], ['sekunder', 1]];
    for(const [name, sec] of units){
      if(seconds >= sec){
        const v = Math.floor(seconds / sec);
        if(name === 'år' && v > 200) return 'flere århundrer';
        return `${v} ${name}`;
      }
    }
    return 'under ett sekund';
  }

  function oversettFeedback(tekst) {
    const oversettelser = {
      "Add another word or two. Uncommon words are better.": "Legg til ett eller to ord til. Uvanlige ord er bedre.",
      "Use a few words, avoid common phrases.": "Bruk noen ord, men unngå vanlige uttrykk.",
      "No need for symbols, digits, or uppercase letters.": "Du trenger ikke symboler, tall eller store bokstaver.",
      "A word by itself is easy to guess.": "Et enkelt ord alene er lett å gjette.",
      "Straight rows of keys are easy to guess.": "Rekker av taster på tastaturet er lette å gjette.",
      "Short keyboard patterns are easy to guess.": "Korte tastaturmønstre er lette å gjette.",
      "Repeats like 'aaa' are easy to guess.": "Repetisjoner som «aaa» er lette å gjette.",
      "Avoid repeated words and characters.": "Unngå gjentatte ord og tegn.",
      "Sequences like abc or 6543 are easy to guess.": "Sekvenser som «abc» eller «6543» er lette å gjette.",
      "Recent years are easy to guess.": "Nylige årstall er lette å gjette.",
      "This is a top-10 common password.": "Dette er et av de 10 mest brukte passordene.",
      "This is a top-100 common password.": "Dette er et av de 100 mest brukte passordene.",
      "This is a very common password.": "Dette er et svært vanlig passord.",
      "This is similar to a commonly used password.": "Dette ligner på et vanlig passord.",
      "Names and surnames by themselves are easy to guess.": "Navn alene er lette å gjette.",
      "Common names and surnames are easy to guess.": "Vanlige navn og etternavn er lette å gjette.",
      "Use a longer keyboard pattern with more turns.": "Bruk et lengre tastaturmønster med flere vinkler."
    };
    const trimmed = tekst.trim().replace(/\.$/, '');
    return oversettelser[tekst] || oversettelser[trimmed] || tekst;
  }

  function update(){
    const value = pwd.value || '';
    if(value.length === 0){
      bar.style.width = '0%';
      bar.style.background = '#ccc';
      scoreEl.textContent = '—';
      crackEl.textContent = '—';
      feedbackEl.textContent = 'Skriv inn et passord for å se tilbakemelding.';
      detailsEl.textContent = 'Ingen data';
      return;
    }

    const r = zxcvbn(value);
    const s = r.score;
    scoreEl.textContent = `${s} / 4`;
    const pct = (s / 4) * 100;
    bar.style.width = pct + '%';
    if(s <= 1) bar.style.background = '#ef4444';
    else if(s === 2) bar.style.background = '#f59e0b';
    else bar.style.background = '#007700';

    const t = r.crack_times_seconds.offline_slow_hashing_1e4_per_second || r.crack_times_seconds.offline_fast_hashing_1e10_per_second || 0;
    crackEl.textContent = humanCrackTimeDisplay(t);

    const fb = [];
    if (r.feedback.warning) fb.push(oversettFeedback(r.feedback.warning));
    if (r.feedback.suggestions && r.feedback.suggestions.length)
      fb.push(...r.feedback.suggestions.map(oversettFeedback));
    feedbackEl.innerHTML = fb.length ? fb.map(x=>`• ${x}`).join('<br>') : 'Ingen spesifikke forslag — bra!';

    let guessesText = r.guesses >= 100000000000000 ? 'over 100 billioner' : Number(r.guesses).toLocaleString();
    detailsEl.innerHTML = `Lengde: <strong>${value.length}</strong> · Gjett: <strong>${guessesText}</strong> · Sekvensgjenkjenning: <strong>${r.sequence ? 'ja' : 'nei'}</strong>`;
  }

  pwd.addEventListener('input', update);

  toggle.addEventListener('click', ()=>{
    if(pwd.type === 'password'){ pwd.type = 'text'; toggle.textContent = 'Skjul'; }
    else { pwd.type = 'password'; toggle.textContent = 'Vis'; }
    pwd.focus();
  });

  function generatePassword(length = 16){
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const nums = '0123456789';
    const syms = '!@#$%&*?_-+=';
    const all = upper + lower + nums + syms;
    let out = '';
    out += upper[Math.floor(Math.random()*upper.length)];
    out += lower[Math.floor(Math.random()*lower.length)];
    out += nums[Math.floor(Math.random()*nums.length)];
    out += syms[Math.floor(Math.random()*syms.length)];
    for(let i=4;i<length;i++) out += all[Math.floor(Math.random()*all.length)];
    out = out.split('').sort(()=>Math.random()-0.5).join('');
    return out;
  }

  gen.addEventListener('click', ()=>{
    const p = generatePassword(20);
    pwd.value = p;
    update();
    pwd.select();
  });

  update();