const container = document.querySelector(".monsters");
const spinner = document.querySelector(".contenedor");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const load = document.querySelector(".load");

const filtro = document.querySelector(".filtro");

let page = 1;

// Botón para retroceder el listado
previous.addEventListener("click", () => {
  if (page !== 1) {
    spinner.classList.remove("d-none");
    load.classList.remove("d-none");

    removeChildNodes(container);
    page--;
    fetchMonster(page);
  }
});

// Botón para avanzar el listado
next.addEventListener("click", () => {
  spinner.classList.remove("d-none");
  load.classList.remove("d-none");
  removeChildNodes(container);
  page++;
  fetchMonster(page);
});

// Botón para aplicar los filtros
filtro.addEventListener("click", () => {
  spinner.classList.remove("d-none");
  load.classList.remove("d-none");

  removeChildNodes(container);
  fetchMonster(page);
});

function fetchMonster(pageNumber) {
  let monsterName = document.getElementById("name-monster").value;
  let challenge_rating = document.querySelector(
    "#monsters-challenge-rating"
  ).value;
  let type = document.querySelector("#monsters-type").value;

  let enlace = `https://api.open5e.com/monsters/?limit=9&page=${pageNumber}`;

  if (monsterName !== "") {
    enlaceFinal = enlace + `&search=${monsterName}`;
  } else {
    enlaceFinal = enlace + `&challenge_rating=${challenge_rating}&type=${type}`;
  }

  fetch(enlaceFinal)
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.results.length; i++) {
        crearMonstruo(data.results[i]);
        spinner.classList.add("d-none");
        load.classList.add("d-none");
      }
    });
}

// Función para crear las tarjetas con los nombres del arma
function crearMonstruo(data) {
  const row = document.querySelector(".monsters");

  // Columnas
  const col = document.createElement("div");
  col.classList.add("col-12", "col-md-6", "col-lg-4", "mt-2");

  // Link hacía la info de cada arma
  const a = document.createElement("a");
  a.classList.add("text-decoration-none", "link-dark", "monster");
  a.setAttribute("href", "monsters-info.html");

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
  MonsterInfo = document.querySelectorAll(".monster");
  MonsterInfo.forEach((boton) => {
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

fetchMonster(page);
