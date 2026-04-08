window.addEventListener("DOMContentLoaded", () => {
  loadRecentProjects();
});

function loadRecentProjects() {
  fetch("https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects")
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se pudo obtener la información de los proyectos");
      }
      return response.json();
    })
    .then((projects) => {
  const orderedProjects = projects.sort((a, b) => Number(a.uuid) - Number(b.uuid));
  const recentProjects = orderedProjects.slice(0, 3);
  renderProjects(recentProjects);
})
    .catch((error) => {
      console.error("Error al cargar los proyectos:", error);

      const container = document.getElementById("projects-container");
      container.innerHTML = `<p>No se pudieron cargar los proyectos.</p>`;
    });
}

function renderProjects(projects) {
  const container = document.getElementById("projects-container");

  container.innerHTML = "";

  projects.forEach((project) => {
    container.innerHTML += `
      <article class="project-card">
        <img src="${project.image}" alt="${project.name}">
        <div class="project-card-content">
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          <a href="./projects/1.html">Learn More</a>
        </div>
      </article>
    `;
  });
}

const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.style.opacity = "1";
    backToTopButton.style.pointerEvents = "auto";
  } else {
    backToTopButton.style.opacity = "0";
    backToTopButton.style.pointerEvents = "none";
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});