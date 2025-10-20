    const links = [
        { text: "https://paypal.com/login", isSafe: true },
        { text: "https://paypa1.com/login", isSafe: false },
        { text: "https://google.com/security", isSafe: true },
        { text: "http://secure-your-bank-login.ru", isSafe: false },
        { text: "https://microsoft.com/account", isSafe: true },
        { text: "https://micr0soft-support.xyz", isSafe: false },
        { text: "https://apple.com/id", isSafe: true },
        { text: "https://appl3id-reset.info", isSafe: false },
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

