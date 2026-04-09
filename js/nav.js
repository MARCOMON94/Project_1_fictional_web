document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (!toggleButton || !navMenu) return;

  toggleButton.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    toggleButton.classList.toggle("is-open");
    toggleButton.setAttribute("aria-expanded", String(isOpen));
  });

  const navLinks = navMenu.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      toggleButton.classList.remove("is-open");
      toggleButton.setAttribute("aria-expanded", "false");
    });
  });
});