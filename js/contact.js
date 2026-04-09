document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  const fullName = document.getElementById("full-name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const message = document.getElementById("message");

  const fields = [fullName, email, phone, message];

  prefillEmailFromQuery(email);

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      validateField(field, false);
    });

    field.addEventListener("blur", () => {
      validateField(field, true);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let isFormValid = true;

    fields.forEach((field) => {
      const isFieldValid = validateField(field, true);
      if (!isFieldValid) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      const formData = {
        fullName: fullName.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        message: message.value.trim()
      };

      console.log("Contact form submitted:", formData);
      alert("Form submitted successfully!");
      form.reset();
      clearValidStates(fields);
    }
  });
});

function prefillEmailFromQuery(emailInput) {
  const params = new URLSearchParams(window.location.search);
  const emailFromNewsletter = params.get("email");

  if (emailFromNewsletter) {
    emailInput.value = emailFromNewsletter;
    validateField(emailInput, false);
  }
}

function validateField(field, showMessage) {
  const value = field.value.trim();
  const formGroup = field.closest(".form-group");

  removeError(field);

  let isValid = true;
  let errorMessage = "";

  if (field.id === "full-name" && value === "") {
    isValid = false;
    errorMessage = "Please, complete the field NAME with your name";
  } else if (field.id === "email") {
    if (value === "" || !isValidEmail(value)) {
      isValid = false;
      errorMessage = "Invalid email";
    }
  } else if (field.id === "phone" && value === "") {
    isValid = false;
    errorMessage = "Please enter your phone number";
  } else if (field.id === "message" && value === "") {
    isValid = false;
    errorMessage = "";
  }

  if (!isValid) {
    field.classList.add("input-error");
    formGroup.classList.remove("is-valid");

    if (showMessage && errorMessage !== "") {
      showError(field, errorMessage);
    }
  } else {
    field.classList.remove("input-error");
    formGroup.classList.add("is-valid");
  }

  return isValid;
}

function showError(input, message) {
  const error = document.createElement("p");
  error.classList.add("error-message");
  error.textContent = message;
  input.parentElement.appendChild(error);
}

function removeError(input) {
  const formGroup = input.parentElement;
  const existingError = formGroup.querySelector(".error-message");

  if (existingError) {
    existingError.remove();
  }
}

function clearValidStates(fields) {
  fields.forEach((field) => {
    field.classList.remove("input-error");
    field.closest(".form-group").classList.remove("is-valid");
    removeError(field);
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}