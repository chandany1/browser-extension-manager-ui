const themeIcon = document.querySelector(".theme-icon");
const body = document.body;
const menuItems = document.querySelectorAll("#menu li");
const extensionsGrid = document.querySelector(".extensions-grid");
let extensions = [];
let selectedChoice = "all";
fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    extensions = data;
    createGridItems(extensions);
  })
  .catch((err) => console.log(err));

themeIcon.addEventListener("click", function () {
  if (body.classList.contains("light-theme")) {
    body.classList.replace("light-theme", "dark-theme");
    this.src = "./assets/images/icon-sun.svg";
  } else {
    body.classList.replace("dark-theme", "light-theme");
    this.src = "./assets/images/icon-moon.svg";
  }
});

menuItems.forEach((item) => {
  item.addEventListener("click", function () {
    selectedChoice = this.innerText;
    renderUpdatedGridItems(selectedChoice);
    menuItems.forEach((li) => li.classList.remove("active"));
    this.classList.add("active");
  });
});

extensionsGrid.addEventListener("click", function (e) {
  const clickedItemText = e.target.innerText;
  if (clickedItemText === "Remove") {
    const name = e.target.getAttribute("name");
    extensions = extensions.filter((obj) => obj.name !== name);
    renderUpdatedGridItems(selectedChoice);
  }
});

function renderUpdatedGridItems(choice) {
  const data = extensions.filter((ext) => {
    if (choice === "Active") {
      return ext.isActive == true;
    } else if (choice === "Inactive") {
      return ext.isActive == false;
    } else {
      return ext;
    }
  });
  createGridItems(data);
}

function createGridItems(items) {
  extensionsGrid.innerHTML = "";
  items.forEach((item) => {
    const container = document.createElement("div");
    container.classList.add("grid-item");
    const upperContainer = document.createElement("div");
    upperContainer.classList.add("grid-item-title-container");

    const titleContainer = document.createElement("div");
    const title = document.createElement("span");
    title.classList.add("grid-item-title");
    title.innerHTML = item.name;
    titleContainer.appendChild(title);
    const description = document.createElement("p");
    description.classList.add("grid-item-description");
    description.innerHTML = item.description;
    titleContainer.appendChild(description);

    const iconImg = document.createElement("img");
    iconImg.classList.add("grid-item-icon");
    iconImg.src = item.logo;
    upperContainer.appendChild(iconImg);
    upperContainer.appendChild(titleContainer);

    const bottomContainer = document.createElement("div");
    bottomContainer.classList.add("grid-item-bottom-container");

    const removeBtn = document.createElement("div");
    removeBtn.classList.add("grid-item-remove-btn");
    removeBtn.tabIndex = 0;
    removeBtn.setAttribute("name", item.name);
    removeBtn.innerText = "Remove";

    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.isActive;
    checkbox.setAttribute("name", item.name);

    checkbox.addEventListener("change", function () {
      const name = this.getAttribute("name");
      extensions = extensions.map((ext) =>
        ext.name === name ? { ...ext, isActive: this.checked } : ext
      );
      if (selectedChoice !== "all") {
        setTimeout(() => {
          renderUpdatedGridItems(selectedChoice);
        }, 500);
      }
    });
    const span = document.createElement("span");
    span.tabIndex = 0;
    span.classList.add("slider");
    label.appendChild(checkbox);
    label.appendChild(span);
    label.classList.add("switch");
    bottomContainer.appendChild(removeBtn);
    bottomContainer.appendChild(label);

    container.appendChild(upperContainer);
    container.appendChild(bottomContainer);
    extensionsGrid.appendChild(container);
  });
}
