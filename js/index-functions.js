let whereToBuyButton = document.getElementById("where-to-buy-button");
whereToBuyButton.onclick = whereToBuy;

let supportButton = document.getElementById("support-button");
supportButton.onclick = support;

let flySafeButton = document.getElementById("fly-safe-button");
flySafeButton.onclick = flySafe;

function whereToBuy() {
    window.location = "shop.html";
}

function support() {
    window.location = "contact.html";
}

function flySafe() {
    window.open("https://www.flysafego.com/", "_blank");
}