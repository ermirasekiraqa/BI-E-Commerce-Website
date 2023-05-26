if (!localStorage.getItem("user")) {
    window.location.replace("login.html");
  }
  
  // Get user from localStorage
  const user = localStorage.getItem("user");
  const parsedUser = JSON.parse(user);
  
  // Get bag from user
  let cart = parsedUser.bag;
  
  let tableHeaders = [
    "",
    "Product Image",
    "Product name",
    "Price per unit",
    "Quantity",
    "Price",
  ];
  let allProductsPrices = [];
  
  function displayProductsInCart() {
    const shoppingCart = document.querySelector(".shopping-cart-and-button");
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    let cart = parsedUser.bag;
    let cartProductsContainer = document.createElement("div");
    cartProductsContainer.setAttribute("id", "shopping-cart");
    if (cart.length === 0) {
      let message = document.createElement("h1");
      message.innerText = "Nothing to display! No items in cart!";
      cartProductsContainer.appendChild(message);
    } else {
      // create a table to display each product in cart
      let cartProductsTable = document.createElement("table");
      cartProductsTable.cellSpacing = 0;
      cartProductsTable.cellPadding = 10;
  
      // create header for table
      let headerRow = createHeaderRow();
      cartProductsTable.appendChild(headerRow);
  
      // display each product's data
      for (let i = 0; i < cart.length; i++) {
        cartProductsTable.appendChild(createProductDataRow(i));
      }
  
      // calculate total price in cart
      cartProductsTable.appendChild(createTotalPriceRow());
  
      cartProductsContainer.appendChild(cartProductsTable);
  
      // checkout button
      let checkoutSection = document.createElement("div");
      checkoutSection.appendChild(createCheckoutButton());
      cartProductsContainer.appendChild(checkoutSection);
    }
    shoppingCart?.appendChild(cartProductsContainer);
  }
  
  function createHeaderRow() {
    let headerRow = document.createElement("tr");
    for (let i = 0; i < tableHeaders.length; i++) {
      let header = document.createElement("th");
      header.innerText = tableHeaders[i];
      headerRow.appendChild(header);
    }
    return headerRow;
  }
  
  function createProductDataRow(j) {
    let tableRow = document.createElement("tr");
  
    // Ordering Number
    let orderingNumber = tableRow.insertCell(0);
    orderingNumber.innerText = j + 1;
  
    // Product image
    let productImage = tableRow.insertCell(1);
    let image = document.createElement("img");
    image.src = cart[j].drone.filename;
    productImage.append(image);
  
    // Product name
    let productName = tableRow.insertCell(2);
    productName.innerText = cart[j].drone.productname;
  
    // Price per unit
    let productPrice = tableRow.insertCell(3);
    productPrice.innerText = "$" + cart[j].drone.price;
  
    // Product quantity
    let quantity = tableRow.insertCell(4);
    quantity.innerText = cart[j].prodQuantity;
  
    // Price for all units
    let price = tableRow.insertCell(5);
    allProductsPrices[j] = calculatePricePerProduct(
      cart[j].drone.price,
      cart[j].prodQuantity
    );
    price.innerText = "$" + allProductsPrices[j];
  
    // Option to remove item from cart
    let trash = tableRow.insertCell(6);
    trash.id = j;
    let trashIcon = document.createElement("i");
    trashIcon.className = "fa fa-trash";
    trashIcon.onclick = removeItemFromCart;
    trash.appendChild(trashIcon);
  
    return tableRow;
  }
  
  function createTotalPriceRow() {
    let totalTableRow = document.createElement("tr");
    totalTableRow.insertCell(0);
    totalTableRow.insertCell(1);
    totalTableRow.insertCell(2);
    totalTableRow.insertCell(3);
    let total = totalTableRow.insertCell(4);
    total.innerText = "Total";
  
    let totalPrice = totalTableRow.insertCell(5);
    // totalPrice.id = "total-price";
    totalPrice.innerText = "$" + calculateTotalPrice(allProductsPrices);
  
    return totalTableRow;
  }
  
  function createCheckoutButton() {
    let checkoutButton = document.createElement("button");
    checkoutButton.innerText = "Checkout";
    checkoutButton.onclick = checkout;
    return checkoutButton;
  }
  
  // Calculate price for each row
  function calculatePricePerProduct(price, quantity) {
    return price * quantity;
  }
  
  // Calculate total price of all items in cart
  function calculateTotalPrice(productsPrices) {
    let total = 0;
    for (let i = 0; i < productsPrices.length; i++) {
      total += productsPrices[i];
    }
    return total;
  }
  
  // remove an item from cart
  function removeItemFromCart(clickEvent) {
    let cartProductsContainer = document.querySelector(
      ".shopping-cart-and-button"
    );
    let rowToBeRemoved = parseInt(clickEvent.currentTarget.parentElement.id);
    cart.splice(rowToBeRemoved, 1);
    allProductsPrices.splice(rowToBeRemoved, 1);
    parsedUser.cart = cart;
    cartProductsContainer.innerHTML = "";
    localStorage.setItem("user", JSON.stringify(parsedUser));
    displayProductsInCart();
  }
  
  function createCheckoutForm() {
    const main = document.querySelector("main");
    const shoppingCart = document.querySelector("#shopping-cart");
    const modalContainer = document.createElement("div");
    modalContainer.setAttribute("class", "modal-container");
  
    const checkoutModal = document.createElement("div");
    checkoutModal.setAttribute("id", "checkout-modal");
  
    const closeBtn = document.createElement("button");
    closeBtn.setAttribute("class", "close-btn");
    closeBtn.textContent = "X";
  
    closeBtn.addEventListener("click", () => {
      main?.removeChild(modalContainer);
    });
  
    const checkoutForm = document.createElement("form");
    checkoutForm.setAttribute("id", "checkout-form");
    checkoutForm.setAttribute("action", "post");
  
    const title = document.createElement("h1");
    title.textContent = "Enter checkout information";
  
    const bankNameInput = document.createElement("input");
    bankNameInput.setAttribute("id", "bank-name");
    bankNameInput.setAttribute("type", "text");
    bankNameInput.setAttribute("required", "true");
    bankNameInput.placeholder = "Bank name";
  
    const creditCardInput = document.createElement("input");
    creditCardInput.setAttribute("id", "credit-card-num");
    creditCardInput.setAttribute("required", "true");
    creditCardInput.setAttribute("type", "text");
    creditCardInput.placeholder = "Credit card";
  
    const phoneNumberInput = document.createElement("input");
    phoneNumberInput.setAttribute("type", "tel");
    phoneNumberInput.placeholder = "Phone number";
    phoneNumberInput.setAttribute("required", "true");
  
    const addressInput = document.createElement("input");
    addressInput.setAttribute("type", "text");
    addressInput.setAttribute("required", "true");
    addressInput.placeholder = "Address";
  
    const confirmButton = document.createElement("button");
    confirmButton.setAttribute("id", "confirm-button");
    confirmButton.textContent = "Confirm";
  
    confirmButton.addEventListener("click", (e) => {
      e.preventDefault();
      const user = localStorage.getItem("user");
      const parsedUser = JSON.parse(user);
      parsedUser.bag = [];
      localStorage.setItem("user", JSON.stringify(parsedUser));
      main?.removeChild(modalContainer);
      let cart = document.querySelector(".shopping-cart-and-button");
      cart?.removeChild(shoppingCart);
      displayProductsInCart();
    });
  
    checkoutForm.append(
      title,
      bankNameInput,
      creditCardInput,
      phoneNumberInput,
      addressInput,
      confirmButton
    );
    checkoutModal.append(closeBtn, checkoutForm);
    modalContainer.append(checkoutModal);
    main?.append(modalContainer);
  }
  
  function checkout() {
    createCheckoutForm();
  }
  
  displayProductsInCart();  