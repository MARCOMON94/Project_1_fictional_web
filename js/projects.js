window.addEventListener("DOMContentLoaded", () => {
  loadProjectDetails();
});

function loadProjectDetails() {
  fetch("https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects")
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se pudieron cargar los datos del proyecto");
      }
      return response.json();
    })
    .then((projects) => {
      const currentProject = projects.find((project) => project.uuid === "1");
      const otherProjects = projects
        .filter((project) => project.uuid !== "1")
        .sort((a, b) => Number(a.uuid) - Number(b.uuid));

      renderMainProject(currentProject);
      renderOtherProjects(otherProjects);
    })
    .catch((error) => {
      console.error("Error al cargar la página del proyecto:", error);
    });
}

function renderMainProject(project) {
  document.getElementById("project-name").textContent = project.name;
  document.getElementById("project-description").textContent = project.description;
  document.getElementById("project-date").textContent = `Completed on ${project.completed_on}`;
  document.getElementById("project-image").src = project.image;
  document.getElementById("project-image").alt = project.name;
  document.getElementById("project-content-text").innerHTML = project.content;
}

function renderOtherProjects(projects) {
  const container = document.getElementById("other-projects-container");

  container.innerHTML = "";

  projects.forEach((project) => {
    container.innerHTML += `
      <article class="project-card">
        <img src="${project.image}" alt="${project.name}">
        <div class="project-card-content">
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          <a href="../projects/1.html">Learn More</a>
        </div>
      </article>
    `;
  });
}