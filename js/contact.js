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
  let message = "";

  if (value === "") {
    isValid = false;
    message = "This field is required";
  } else if (field.id === "email" && !isValidEmail(value)) {
    isValid = false;
    message = "Please enter a valid email";
  }

  if (!isValid) {
    field.classList.add("input-error");
    formGroup.classList.remove("is-valid");

    if (showMessage) {
      showError(field, message);
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