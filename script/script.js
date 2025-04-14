// Function to add the "navbarDark" class to the navbar on scroll
function handleNavbarScroll() {
  const header = document.querySelector(".navbar");
  window.onscroll = function () {
    const top = window.scrollY;
    if (top >= 1000) {
      header.classList.add("navbarDark");
    } else {
      header.classList.remove("navbarDark");
    }
  };
}

// Function to handle navbar collapse on small devices after a click
function handleNavbarCollapse() {
  const navLinks = document.querySelectorAll(".nav-item");
  const menuToggle = document.getElementById("navbarSupportedContent");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      new bootstrap.Collapse(menuToggle).toggle();
    });
  });
}

// Function to dynamically create HTML elements from JSON files
function createCardsFromJSON({ 
  jsonPath, 
  containerSelector, 
  imagePath = "images/", 
  cardContent 
}) {
  const container = document.querySelector(containerSelector);
  let row = document.createElement("div");
  row.classList.add("row");

  fetch(jsonPath)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("col-lg-4", "mt-4");
        card.innerHTML = cardContent(item, imagePath);

        row.appendChild(card);

        if ((index + 1) % 3 === 0 || index === data.length - 1) {
          container.appendChild(row);
          row = document.createElement("div");
          row.classList.add("row");
        }
      });
    });
}

// Typing effect function
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = "";
  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

// Apply effects when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get elements
  const heroTitle = document.querySelector(".hero_title");
  const heroDesc = document.querySelector(".hero_desc");

  // Original texts
  const titleText = "Debugging, code & passion";
  const descText = "Bienvenue dans mon monde";

  // Reset for animation
  heroTitle.textContent = "";
  heroDesc.textContent = "";

  // Start animations with delay
  setTimeout(() => {
    typeWriter(heroTitle, titleText, 100);
  }, 500);

  setTimeout(() => {
    typeWriter(heroDesc, descText, 80);
  }, 1500);
});

// Call the functions to execute the code
handleNavbarScroll();
handleNavbarCollapse();

// Skills
createCardsFromJSON({
  jsonPath: "data/skills.json",
  containerSelector: "#skills .container",
  cardContent: (item, imagePath) => `
    <div class="e-card">
      <div class="wave"></div>
      <div class="skill-content">
        <img src="${imagePath}${item.image}" class="skill-image" alt="${item.title}">
        <div class="infotop">
          <h3 class="card-title">${item.title}</h3>
          <p class="card-text">${item.text}</p>
        </div>
      </div>
    </div>
  `
});

//Portfolio
createCardsFromJSON({
  jsonPath: "data/portfolio.json",
  containerSelector: "#portfolio .container",
  cardContent: (item, imagePath) => {
    let buttonsHTML = "";

    if (item.link) {
      buttonsHTML += `
        <a href="${item.link}" class="btn btn-primary" target="_blank" rel="noopener">
          Voir le projet
        </a>`;
    }

    if (Array.isArray(item.links)) {
      item.links.forEach(link => {
        buttonsHTML += `
          <a href="${link.url}" class="btn btn-primary" target="_blank" rel="noopener">
            ${link.label}
          </a>`;
      });
    }

    return `
      <div class="card portfolioContent">
        <img class="card-img-top" src="${imagePath}${item.image}" alt="Projet ${item.title}" loading="lazy">
        <div class="card-body">
          <h3 class="card-title">${item.title}</h3>
          <p class="card-text">${item.text}</p>
          ${buttonsHTML}
        </div>
      </div>
    `;
  }
});
