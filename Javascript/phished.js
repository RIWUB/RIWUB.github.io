const params = new URLSearchParams(window.location.search);

if (params.get('phished') === 'true') {
    alert('Aldri skann ukjente QR-koder! Du har blitt utsatt for et phishing-angrep.');
}