const params = new URLSearchParams(window.location.search);

if (params.get('phished') === 'true') {
    alert('Aldri skann ukjente QR-koder! Du kan bli utsatt for et phishing-angrep.');
}