    const links = [
  // Safe (ekte/domene-eiende)
  { text: "https://paypal.com/login", isSafe: true },
  { text: "https://www.google.com/security", isSafe: true },
  { text: "https://login.microsoftonline.com", isSafe: true },
  { text: "https://apple.com/id", isSafe: true },
  { text: "https://www.amazon.com/ap/signin", isSafe: true },
  { text: "https://www.facebook.com/login", isSafe: true },
  { text: "https://www.netflix.com/login", isSafe: true },
  { text: "https://www.linkedin.com/login", isSafe: true },
  { text: "https://github.com/login", isSafe: true },
  { text: "https://bank.example.com/secure", isSafe: true }, // eksempel-domene
  { text: "https://accounts.google.com/ServiceLogin", isSafe: true },
  { text: "https://www.tiktok.com/login", isSafe: true },
  { text: "https://www.spotify.com/account", isSafe: true },
  { text: "https://inbox.mail.yahoo.com", isSafe: true },
  { text: "https://chase.com/login", isSafe: true },
  { text: "https://www.dropbox.com/login", isSafe: true },
  { text: "https://support.microsoft.com", isSafe: true },
  { text: "https://secure.bankofexample.com", isSafe: true }, // eksempel-domene
  { text: "https://www.gov.no/minside", isSafe: true }, // norsk offentlig eksempel
  { text: "https://security.google.com/settings", isSafe: true },

  // Unsafe / spoof-aktige (typo, ulik TLD, ekstra subdomener, mistenkelig)
  { text: "https://paypa1.com/login", isSafe: false },
  { text: "http://secure-your-bank-login.ru", isSafe: false },
  { text: "https://micr0soft-support.xyz", isSafe: false },
  { text: "https://appl3id-reset.info", isSafe: false },
  { text: "https://amazon-security-notice.com", isSafe: false },
  { text: "https://accounts-google.com/signin", isSafe: false },
  { text: "https://facebook.verify-account.net", isSafe: false },
  { text: "https://netf1ix-login.com", isSafe: false },
  { text: "https://linkedin-alerts.info", isSafe: false },
  { text: "https://github-security-update.org", isSafe: false },
  { text: "https://paypal.verify-user-secure.com", isSafe: false },
  { text: "https://www.paypal.login.verify.example.com", isSafe: false }, // subdomain spoof
  { text: "http://mail-google.com/signin", isSafe: false },
  { text: "https://support-microsoft-account.biz", isSafe: false },
  { text: "https://appleid.verify-reset.cc", isSafe: false },
  { text: "https://bankofexample-login.com", isSafe: false },
  { text: "https://secure-chase-online.xyz", isSafe: false },
  { text: "https://verify-spotify-account.info", isSafe: false },
  { text: "https://xn--ppal-9qa.com/login", isSafe: false }, // punycode-like (visuelt lurt)
  { text: "https://update-your-password-now.net", isSafe: false }
    ];

    let currentLink;
    let score = 0;

    function loadNewLink() {
        const randomIndex = Math.floor(Math.random() * links.length);
        currentLink = links[randomIndex];

        const container = document.getElementById("link-container");
        container.innerHTML = `<a href="#">${currentLink.text}</a>`;

        document.getElementById("feedback").textContent = "";
    }

    function choose(userThinksSafe) {
        if (userThinksSafe === currentLink.isSafe) {
            document.getElementById("feedback").textContent = "✅ Correct!";
            score++;
        } else {
            document.getElementById("feedback").textContent = "❌ Oops, that was wrong!";
            score--;
        }

        document.getElementById("score").textContent = score;
        loadNewLink();
    }

    // Load the first link when the page loads
    window.onload = loadNewLink;

