const categories = [
  "Agricultural Sprayer Drone",
  "Agricultural Sprayer Vehicle",
  "Airframe",
  "Drone Accessory",
  "Motor Set",
  "Payloads",
];

const droneData = [
  {
    name: "4-Axis 16L Crop Pesticide Sprayer Drone T416 Agricultural Uav for Farming",
    price: 3500,
    currency: "US",
    quantity: 100,
    bestSeller: true,
    img: `images/drone-1.png`,
  },
  {
    name: "High Quality 6-Axis 16L Professional Crop Spray Uav Tp616 Agricultural Drone for Farming",
    price: 3800,
    currency: "US",
    quantity: 80,
    bestSeller: true,
    img: "images/drone-2.PNG",
  },
  {
    name: "Hybrid Power 16L Remote Crop Pesticide Sprayer Farm Drone for Agricultural Farming Spraying",
    price: 6000,
    currency: "US",
    quantity: 50,
    bestSeller: true,
    img: "images/drone-3.PNG",
  },

  {
    name: "Excellent 4-Axis 10L Pesticide Sprayer Uav T410 Agricultural Drone for Farming",
    price: 2500,
    currency: "US",
    quantity: 200,
    bestSeller: false,
    img: "images/drone-4.PNG",
  },
  {
    name: "High Quality 10L Remote-Controlled Crop Sprayer Uav Tp610 Agricultural Drone for Farming",
    price: 2800,
    currency: "US",
    quantity: 20,
    bestSeller: false,
    img: `images/drone-5.PNG`,
  },
];

const subscribtionEmails = [];

function createCategoryContainer(text) {
  const productCategory = document.createElement("div");
  productCategory.setAttribute("class", "product-category");
  const categoryName = document.createElement("p");
  categoryName.textContent = text;
  productCategory.append(categoryName);
  productCategory.addEventListener("click", () => {
    location.href = "categories-page.html" + "?category=" + text;
  });
  return productCategory;
}

function fillCategories() {
  const productCategoryContainer = document.querySelector(
    ".product-categories-container"
  );

  categories.map((category) => {
    const categoryContainer = createCategoryContainer(category);
    productCategoryContainer?.append(categoryContainer);
  });
}

function createBestSellerCard(droneData) {
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

function fillBestSellerCards() {
  const bestSellerDronesContainer =
    document.querySelector(".product-container");
  droneData.map((data) => {
    if (data.bestSeller) {
      const bestSellerCard = createBestSellerCard(data);
      bestSellerDronesContainer?.append(bestSellerCard);
    }
  });
}

function onSubmitSubscribeForm() {
  const main = document.querySelector("main");
  const subscribeForm = document.querySelector("#subscribe-form");
  const emailInput = document.getElementById("email");
  subscribeForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    //@ts-ignore
    const email = emailInput.value;
    console.log("email ", email);
    subscribtionEmails.push(email);
    const modal = createSubscribeModal();
    main?.append(modal);
    //@ts-ignore
    emailInput.value = "";
  });
}

function createSubscribeModal() {
  const main = document.querySelector("main");

  const modalContainer = document.createElement("div");
  modalContainer.setAttribute("class", "modal-container");

  const subscribeModal = document.createElement("div");
  subscribeModal.setAttribute("id", "subscribe-modal");

  const closeButton = document.createElement("button");
  closeButton.setAttribute("class", "close-btn");
  closeButton.textContent = "X";

  closeButton.addEventListener("click", () => {
    main?.removeChild(modalContainer);
  });

  const title = document.createElement("h1");
  title.textContent = "Thank you for subscribing!";

  const text = document.createElement("p");
  text.textContent = "You'll receive emails regarding our upcoming offers!";

  subscribeModal.append(closeButton, title, text);
  modalContainer.append(subscribeModal);
  return modalContainer;
}

function main() {
  fillCategories();
  fillBestSellerCards();
  onSubmitSubscribeForm();
}



main();
