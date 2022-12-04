const container = document.querySelector(".magic-items");
const spinner = document.querySelector(".spinner");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

const search = document.querySelector(".search");

const orderName = document.querySelector(".order-name");
const orderRarity = document.querySelector(".order-rarity");
const orderType = document.querySelector(".order-type");

let page = 1;
let finalPage = null;
let str = ``;

// Botón para retroceder el listado
previous.addEventListener("click", () => {
  if (page !== 1) {
    spinner.classList.remove("d-none");
    removeChildNodes(container);
    page--;
    fetchMagicItem(page, str);
  }
});

// Botón para avanzar el listado
next.addEventListener("click", () => {
  spinner.classList.remove("d-none");
  removeChildNodes(container);
  page++;
  fetchMagicItem(page, str);
});

// Botón para realizar las busquedas
search.addEventListener("click", () => {
  spinner.classList.remove("d-none");
  removeChildNodes(container);
  fetchMagicItem(page, str);
});

orderName.addEventListener("click", () => {
  spinner.classList.remove("d-none");
  removeChildNodes(container);
  str = "&ordering=name";
  fetchMagicItem(page, str);
});

orderRarity.addEventListener("click", () => {
  spinner.classList.remove("d-none");
  removeChildNodes(container);
  str = "&ordering=rarity";
  fetchMagicItem(page, str);
});

orderType.addEventListener("click", () => {
  spinner.classList.remove("d-none");
  removeChildNodes(container);
  str = "&ordering=type";
  fetchMagicItem(page, str);
});


function fetchMagicItem(pageNumber, str) {
  let magicItemName = document.querySelector("#magicitem-name").value;

  let enlace = `https://api.open5e.com/magicitems/?limit=9&page=${pageNumber}`;
  
  if (magicItemName !== "") {
    enlaceFinal = enlace + `&search=${magicItemName}`;
  } else {
    enlaceFinal = enlace + str;
  }

  fetch(enlaceFinal)
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.results.length; i++) {
        crearItemMagico(data.results[i]);
        spinner.classList.add("d-none");
      }
    });
}

// Función para crear las tarjetas con los nombres del arma
function crearItemMagico(data) {
  const row = document.querySelector(".magic-items");

  // Columnas
  const col = document.createElement("div");
  col.classList.add("col-12", "col-md-6", "col-lg-4", "mt-2");

  // Link hacía la info de cada arma
  const a = document.createElement("a");
  a.classList.add("text-decoration-none", "link-dark", "item-magico");
  a.setAttribute("href", "magicitems-info.html");

  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-name", data.name);

  const cardBody = document.createElement("div");
  card.classList.add("card-body", "btn", "btn-light");

  const name = document.createElement("h1");
  name.classList.add("card-text");
  name.classList.add("fs-6");
  name.textContent = `${data.name}`;
  name.setAttribute("data-name", data.name);

  row.appendChild(col);
  col.appendChild(a);
  a.appendChild(card);
  card.appendChild(cardBody);
  cardBody.appendChild(name);

  info();
}

function info() {
  MagicItemInfo = document.querySelectorAll(".item-magico");
  MagicItemInfo.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (localStorage.name) {
        localStorage.setItem(
          "name",
          JSON.stringify({ name: `${e.target.dataset.name}` })
        );
      } else {
        localStorage.setItem(
          "name",
          JSON.stringify({ name: `${e.target.dataset.name}` })
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

fetchMagicItem(page, str);