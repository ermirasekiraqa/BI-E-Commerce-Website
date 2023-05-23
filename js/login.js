function login() {
  const loginForm = document.getElementById("login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  console.log("loginForm ", loginForm);

  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    //@ts-ignore
    const email = emailInput.value;
    //@ts-ignore
    const password = passwordInput.value;
    const userObj = {
      email: email,
      bag: [],
    };
    const user = JSON.stringify(userObj);
    localStorage.setItem("user", user);
    //@ts-ignore
    emailInput.value = "";
    //@ts-ignore
    passwordInput.value = "";
    location.href = "index.html";
  });
}

function main() {
  login();
}

main();
