const container = document.querySelector(".weapons");
const spinner = document.querySelector(".spinner");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

const filtro = document.querySelector(".filtro");
const filtroName = document.querySelector(".filtro-name");
const filtroCategory = document.querySelector(".filtro-category");
const filtroTypeDamage = document.querySelector(".filtro-type-damage");

let page = 1;

// Botón para retroceder el listado
previous.addEventListener("click", () => {
  if (page !== 1) {
    spinner.classList.remove("d-none");
    removeChildNodes(container);
    page--;
    fetchWeapon(page);
  }
});

// Botón para avanzar el listado
next.addEventListener("click", () => {
  spinner.classList.remove("d-none");
  removeChildNodes(container);
  page++;
  fetchWeapon(page);
});

// Botón para aplicar los filtros
filtro.addEventListener("click", () => {
  let weaponName = document.getElementById("name-weapon").value;
  
  spinner.classList.remove("d-none");
  removeChildNodes(container);
  
  fetchWeapon(page, `search=${weaponName}`);
});

// Botón para ordenar por nombre
filtroName.addEventListener("click", () => {
  spinner.classList.remove("d-none");
  removeChildNodes(container);
  fetchWeapon(page, "ordering=name");
});

// Botón para ordenar por categoria
filtroCategory.addEventListener("click", () => {
  spinner.classList.remove("d-none");
  removeChildNodes(container);
  fetchWeapon(page, "ordering=category");
});

// Botón para ordenar por tipo de daño 
filtroTypeDamage.addEventListener("click", () => {
  spinner.classList.remove("d-none");
  removeChildNodes(container);
  fetchWeapon(page, "ordering=damage_type");
});

function fetchWeapon(pageNumber, strLink) {
  
  let enlace = `https://api.open5e.com/weapons/?limit=9&page=${pageNumber}&${strLink}`;

  fetch(enlace)
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.results.length; i++) {
        crearArma(data.results[i]);
        spinner.classList.add("d-none");
      }
    });
}

// Función para crear las tarjetas con los nombres del arma
function crearArma(data) {
  const row = document.querySelector(".weapons");

  // Columnas
  const col = document.createElement("div");
  col.classList.add("col-12");
  col.classList.add("col-md-6");
  col.classList.add("col-lg-4");
  col.classList.add("mt-2");

  // Link hacía la info de cada arma
  const a = document.createElement("a");
  a.classList.add("text-decoration-none", "link-dark", "weapon");
  a.setAttribute("href", "weapons-info.html");

  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-slug", data.slug);

  const cardBody = document.createElement("div");
  card.classList.add("card-body", "btn", "btn-light");

  const name = document.createElement("h1");
  name.classList.add("card-text");
  name.classList.add("fs-6");
  name.textContent = `${data.name}`;
  name.setAttribute("data-slug", data.slug);

  row.appendChild(col);
  col.appendChild(a);
  a.appendChild(card);
  card.appendChild(cardBody);
  cardBody.appendChild(name);

  info();
}

function info() {
  WeaponInfo = document.querySelectorAll(".weapon");
  WeaponInfo.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (localStorage.slug) {
        localStorage.setItem(
          "slug",
          JSON.stringify({ slug: `${e.target.dataset.slug}` })
        );
      } else {
        localStorage.setItem(
          "slug",
          JSON.stringify({ slug: `${e.target.dataset.slug}` })
        );
      }
    });
  });
}

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

fetchWeapon(page);
