function signUp() {
  const signupForm = document.getElementById("signup-form");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const termsCheckbox = document.getElementById("terms&cond");

  signupForm?.addEventListener("submit", (e) => {
    try {
      e.preventDefault();
      //@ts-ignore
      const email = emailInput.value;
      //@ts-ignore
      const password = passwordInput.value;
      //@ts-ignore
      const confirmPassword = confirmPasswordInput.value;
      const passwordsAreEqual = comparePasswords(password, confirmPassword);
      if (!passwordsAreEqual) {
        throw new Error("Passwords do not match!");
      }
      const userObj = {
        email: email,
        bag: [],
      };
      const user = JSON.stringify(userObj);
      localStorage.setItem("user", user);
      location.href = "index.html";
    } catch (err) {
      alert(err);
    }
  });
}

function comparePasswords(pass1, pass2) {
  if (pass1 === pass2) {
    return true;
  }

  return false;
}

function main() {
  signUp();
}

main();
