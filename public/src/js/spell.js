const container = document.querySelector(".spells");
const spinner = document.querySelector(".spinner");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

const filtro = document.querySelector(".filtro");

let page = 1;

// Botón para retroceder el listado
previous.addEventListener("click", () => {
  if (page !== 1) {
    spinner.classList.remove("d-none");
    removeChildNodes(container);
    page--;
    fetchSpell(page);
  }
});

// Botón para avanzar el listado
next.addEventListener("click", () => {
  spinner.classList.remove("d-none");
  removeChildNodes(container);
  page++;
  fetchSpell(page);
});

// Botón para aplicar los filtros
filtro.addEventListener("click", () => {
  spinner.classList.remove("d-none");
  removeChildNodes(container);
  fetchSpell(page);
});

function fetchSpell(pageNumber) {
  let spellName = document.querySelector("#name-spell").value;
  let spellLevel = document.querySelector("#spell-level").value;
  let spellSchool = document.querySelector("#spell-school").value;
  let spellClass = document.querySelector("#spell-class").value;

  let enlace = `https://api.open5e.com/spells/?limit=9&page=${pageNumber}`;

  if (spellName !== "") {
    enlaceFinal = enlace + `&search=${spellName}`;
  } else {
    enlaceFinal =
      enlace +
      `&level_int__iexact=${spellLevel}&school__iexact=${spellSchool}&dnd_class__icontains=${spellClass}`;
  }

  fetch(enlaceFinal)
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.results.length; i++) {
        crearSpell(data.results[i]);
        spinner.classList.add("d-none");
      }
    });
}

// Función para crear las tarjetas con los nombres del conjuro
function crearSpell(data) {
  const row = document.querySelector(".spells");

  // Columnas
  const col = document.createElement("div");
  col.classList.add("col-12","col-md-6","col-lg-4","mt-2");

  // Link hacía la info de cada conjuro
  const a = document.createElement("a");
  a.classList.add("text-decoration-none", "link-dark", "spell");
  a.setAttribute("href", "spell-info.html");

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
  spellInfo = document.querySelectorAll(".spell");
  spellInfo.forEach((boton) => {
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

fetchSpell(page);
