document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    clearErrors();

    const fullName = document.getElementById("full-name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const message = document.getElementById("message");

    let isValid = true;

    if (fullName.value.trim() === "") {
      showError(fullName, "Full name is required");
      isValid = false;
    }

    if (email.value.trim() === "") {
      showError(email, "Email is required");
      isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
      showError(email, "Please enter a valid email");
      isValid = false;
    }

    if (phone.value.trim() === "") {
      showError(phone, "Phone is required");
      isValid = false;
    }

    if (message.value.trim() === "") {
      showError(message, "Message is required");
      isValid = false;
    }

    if (isValid) {
      alert("Form submitted successfully!");
      form.reset();
    }
  });
});

function showError(input, message) {
  input.classList.add("input-error");

  const error = document.createElement("p");
  error.classList.add("error-message");
  error.textContent = message;

  input.parentElement.appendChild(error);
}

function clearErrors() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((error) => error.remove());

  const errorInputs = document.querySelectorAll(".input-error");
  errorInputs.forEach((input) => input.classList.remove("input-error"));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}