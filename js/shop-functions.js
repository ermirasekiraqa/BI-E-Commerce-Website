// Create products cards
function outputProduct(item) {
    let productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.dataset.productId = item.product.id;
    productDiv.appendChild(createProductImg(item));
    productDiv.appendChild(createProductDescription(item));
    return productDiv;
}

function createProductImg(item) {
    let productAnchor = document.createElement("a");
    productAnchor.href = "product.html";
    productAnchor.onclick = setProductToLoadInSessionStorage;
    let productImg = document.createElement("img");
    productImg.src = item.product.filename;
    productAnchor.appendChild(productImg);
    return productAnchor;
}

function createProductDescription(item) {
    let productDescription = document.createElement("div");
    productDescription.className = "product-description";
    productDescription.appendChild(createProductBrand(item));
    productDescription.appendChild(createProductName(item));
    productDescription.appendChild(createProductRatings(item));
    productDescription.appendChild(createProductPrice(item));
    productDescription.appendChild(createShoppingCartIcon(item));
    return productDescription;
}

function createProductBrand(item) {
    let brand = document.createElement("span");
    brand.innerText = item.product.brand;
    return brand;
}

function createProductName(item) {
    let productName = document.createElement("h5");
    productName.innerText = item.product.productname;
    return productName;
}

function createProductRatings(item) {
    let productRatings = document.createElement("div");
    productRatings.className = "ratings";
    for (let i = 0; i < item.product.rates; i++) {
        let star = document.createElement("i");
        star.className = "fa fa-star";
        productRatings.appendChild(star);
    }
    return productRatings;
}

function createProductPrice(item) {
    let productPrice = document.createElement("h4");
    productPrice.innerText = "$" + item.product.price;
    return productPrice;
}

function createShoppingCartIcon(item) {
    let cartAnchor = document.createElement("a");
    cartAnchor.href = "product.html";
    cartAnchor.onclick = setProductToLoadInSessionStorageFromIcon;
    let cartIcon = document.createElement("i");
    cartIcon.className = "fa fa-shopping-cart cart";
    cartAnchor.appendChild(cartIcon);
    return cartAnchor;
}

// Load single product page
function setProductToLoadInSessionStorage(clickEvent) {
    let productId = parseInt(clickEvent.currentTarget.parentElement.dataset.productId);
    sessionStorage.setItem("loadedProductPage", productId);
}

// Load single product page from shopping cart icon
function setProductToLoadInSessionStorageFromIcon(clickEvent) {
    let productId = parseInt(clickEvent.currentTarget.parentElement.parentElement.dataset.productId);
    sessionStorage.setItem("loadedProductPage", productId);
}

let productSection = document.getElementById("product-container");

// Pagination
let rows = 3;
let currentPage = 1;  // Current page
let pageSize = Math.ceil(products.length / (rows * 3));

function displayProducts(products) {
    productSection.innerHTML = "";
    for (let i = (currentPage - 1) * (rows * 3); i < currentPage * rows * 3 && i < products.length; i++) {
        productSection.appendChild(outputProduct(products[i]));
    }
}

function displayPaginationButtons(num) {
    let paginationSection = document.getElementsByClassName("pages").item(0);
    if (num > 1) {
        let prevButton = document.createElement("button");
        prevButton.onclick = prevPage;
        let leftArrowIcon = document.createElement("i");
        leftArrowIcon.className = "fa fa-long-arrow-left";
        prevButton.appendChild(leftArrowIcon);
        paginationSection.appendChild(prevButton);
    }

    for (let i = 0; i < num; i++) {
        let numButton = document.createElement("button");
        numButton.onclick = loadPage;
        numButton.innerText = i + 1;
        paginationSection.appendChild(numButton);
    }

    if (num > 1) {
        let nextButton = document.createElement("button");
        nextButton.onclick = nextPage;
        let rightArrowIcon = document.createElement("i");
        rightArrowIcon.className = "fa fa-long-arrow-right";
        nextButton.appendChild(rightArrowIcon);
        paginationSection.appendChild(nextButton);
    }
}

function nextPage() {
    if (currentPage === pageSize)
        return;
    currentPage += 1;
    displayProducts(products);
}

function prevPage() {
    if (currentPage === 1)
        return;
    currentPage -= 1;
    displayProducts(products);
}

function loadPage(clickEvent) {
    let pageNumber = parseInt(clickEvent.target.innerText);
    currentPage = pageNumber;
    displayProducts(products);
}

displayProducts(products);
displayPaginationButtons(pageSize);
