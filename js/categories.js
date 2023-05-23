function createProductCard(droneData) {
  const productCard = document.createElement("div");
  productCard.setAttribute("class", "product");

  const droneImage = document.createElement("img");
  droneImage.setAttribute("src", droneData.img);

  const productInfoContainer = document.createElement("div");
  productInfoContainer.setAttribute("class", "product-info");

  const droneTitle = document.createElement("p");
  droneTitle.setAttribute("id", "product-title");
  droneTitle.textContent = droneData.name;

  const dronePrice = document.createElement("p");
  dronePrice.setAttribute("id", "product-price");
  dronePrice.textContent = "$" + droneData.price;

  const viewButton = document.createElement("button");
  viewButton.setAttribute("class", "product-info-view-btn");
  viewButton.textContent = "View";
  viewButton.addEventListener("click", () => {
    location.href = "#";
  });
  productInfoContainer.append(droneImage, droneTitle, dronePrice, viewButton);
  productCard.append(productInfoContainer);
  return productCard;
}

function getCategoryName() {
  const main = document.querySelector("main");
  const title = document.createElement("h1");
  const url = window.location.search;
  const s = url.replace("?category=", "");
  title.textContent = decodeURIComponent(s);
  main?.prepend(title);
}

function displayProductCards() {
  const productsContainer = document.querySelector(".category-products");
  const drone = {
    name: "4-Axis 16L Crop Pesticide Sprayer Drone T416 Agricultural Uav for Farming",
    price: 3500,
    currency: "US",
    quantity: 100,
    bestSeller: true,
    img: `images/drone-1.png`,
  };

  for (let i = 0; i < 20; i++) {
    const productCard = createProductCard(drone);
    productsContainer?.append(productCard);
  }
}

function main() {
  displayProductCards();
  getCategoryName();
}

main();
