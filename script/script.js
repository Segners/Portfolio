// Function to add the "navbarDark" class to the navbar on scroll
function handleNavbarScroll() {
  const header = document.querySelector(".navbar");
  window.onscroll = function () {
    const top = window.scrollY;
    if (top >= 100) {
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

// Function to dynamically create HTML elements from the JSON file
function createSkillsFromJSON() {
  const container = document.querySelector("#skills .container");
  let row = document.createElement("div");
  row.classList.add("row");

  // Load the JSON file
  fetch("data/skills.json")
    .then((response) => response.json())
    .then((data) => {
      // Iterate through the JSON data and create HTML elements
      data.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("col-lg-4", "mt-4");
        // Dans createSkillsFromJSON()
        card.innerHTML = `
                <div class="e-card">
                    <div class="wave"></div>
                    <div class="skill-content">
                        <img src="./images/${item.image}" class="skill-image" alt="${item.title}">
                        <div class="infotop">
                            <h3 class="card-title">${item.title}</h3>
                            <p class="card-text">${item.text}</p>
                        </div>
                    </div>
                </div>
                `;

        // Append the card to the current row
        row.appendChild(card);

        // If the index is a multiple of 3 or it's the last element, create a new row
        if ((index + 1) % 3 === 0 || index === data.length - 1) {
          container.appendChild(row);
          row = document.createElement("div");
          row.classList.add("row");
        }
      });
    });
}
// Function to dynamically create HTML elements from the JSON file
function createPortfolioFromJSON() {
  const container = document.querySelector("#portfolio .container");
  let row = document.createElement("div");
  row.classList.add("row");

  // Load the JSON file
  fetch("data/portfolio.json")
    .then((response) => response.json())
    .then((data) => {
      // Iterate through the JSON data and create HTML elements
      data.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("col-lg-4", "mt-4");
        card.innerHTML = `
                <div class="card portfolioContent">
                    <img class="card-img-top" src="images/${item.image}" alt="Projet ${item.title}" loading="lazy">
                    <div class="card-body">
                        <h3 class="card-title">${item.title}</h3> <!-- Changé de h4 à h3 -->
                        <p class="card-text">${item.text}</p>
                        <!-- ... -->
                    </div>
                </div>
            `;

        // Append the card to the current row
        row.appendChild(card);

        // If the index is a multiple of 3 or it's the last element, create a new row
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
  const titleText = "Test";
  const descText = "Test";

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
createSkillsFromJSON();
createPortfolioFromJSON();
