if (!sessionStorage.getItem("loadedProductPage")) {
    window.location.replace("index.html");
}

const productId = parseInt(sessionStorage.getItem("loadedProductPage"));
let mainImg = document.getElementById("main");
let productName = document.getElementById("prod-name");
let productPrice = document.getElementById("prod-price");
let flyingTimeDetails = document.getElementById("flying-time");
let batteriesDetails = document.getElementById("batteries");
let flightRangeDetails = document.getElementById("flight-range");
let camerasDetails = document.getElementById("cameras");
let firstPersonViewDetails = document.getElementById("first-person-view");
let gpsDetails = document.getElementById("gps");
let repairsDetails = document.getElementById("repairs");
let speedDetails = document.getElementById("speed");

let currentProduct;

for (let i = 0; i < products.length; i++) {
    if (products[i].product.id === productId) {
        currentProduct = products[i].product;
    }
}

function setProductDetails() {
    // Set main image
    mainImg.src = currentProduct.filename;

    // Set product name
    productName.innerText = currentProduct.productname;

    // Set product price
    productPrice.innerText = "$" + currentProduct.price;

    // Set flying time details
    flyingTimeDetails.innerText = currentProduct.flyingTime;

    // Set batteries details
    batteriesDetails.innerText = currentProduct.batteries;

    // Set flight range details
    flightRangeDetails.innerText = currentProduct.flightRange;

    // Set cameras details
    camerasDetails.innerText = currentProduct.cameras;

    // Set first person view details
    firstPersonViewDetails.innerText = currentProduct.firstPersonView;

    // Set gps details
    gpsDetails.innerText = currentProduct.GPS;

    // Set repairs details
    repairsDetails.innerText = currentProduct.repairs;

    // Set speed details
    speedDetails.innerText = currentProduct.speed;
}

setProductDetails();

// View products of other color 
let smallImg = document.getElementsByClassName("small");

for (let i = 0; i < smallImg.length; i++) {
    smallImg[i].onclick = function () {
        const temp = mainImg.src;
        mainImg.src = smallImg[i].src;
        smallImg[i].src = temp;

        // Change the main image of the current product
        currentProduct.filename = mainImg.src;
    }
}

// Add functionality to add to cart button
let addToCartButton = document.getElementById("add-to-cart-button");
addToCartButton.onclick = addToCart;

function addToCart() {
    const user = localStorage.getItem("user");
    if (!localStorage.getItem("user")) {
        window.location.replace("login.html");
    }

    const parsedUser = JSON.parse(user);

    let quantity = document.getElementById("product-quantity").value;

    const productToBeAddedToCart = {
        prodQuantity: quantity,
        drone: currentProduct
    };

    parsedUser.bag.push(productToBeAddedToCart);

    localStorage.setItem("user", JSON.stringify(parsedUser));

    // Disable button after adding an item to cart
    addToCartButton.innerText = "Added to cart";
    addToCartButton.onclick = doNothing;
}

function doNothing() {

}