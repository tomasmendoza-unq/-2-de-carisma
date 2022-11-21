const container = document.querySelector(".spells");
const spinner = document.querySelector(".spinner");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const filtro = document.querySelector("#filtro");

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
  removeChildNodes(container)
  fetchSpell(page);
});

function fetchSpell(pageNumber) {
  let spellName = document.getElementById("name-spell").value;
  let spellLevel = document.getElementById("spell-level").value;
  let spellSchool = document.getElementById("spell-school").value;
  let spellClass = document.getElementById("spell-class").value;
  
  let enlace = `https://api.open5e.com/spells/?limit=9&page=${pageNumber}`
  
  if (spellName !== "") {
    enlaceFinal = enlace + `&search=${spellName}`;
  }
  else {
    enlaceFinal = enlace + `&level_int__iexact=${spellLevel}&school__iexact=${spellSchool}&dnd_class__icontains=${spellClass}`;
  }

  fetch(enlaceFinal)
    .then((res) => res.json())
    .then((data) => {
      for(let i=0; i < data.results.length; i++) {
        crearSpell(data.results[i])
        spinner.classList.add("d-none");
      }
    });
}

// Función para crear las tarjetas con los nombres del conjuro
function crearSpell(data) {
  const row = document.querySelector(".spells");

  const col = document.createElement("div");
  col.classList.add("col-12");
  col.classList.add("col-md-6");
  col.classList.add("col-lg-4");
  col.classList.add("mt-2");

  const card = document.createElement("div");
  card.classList.add("card");

  const cardBody = document.createElement("div");
  card.classList.add("card-body", "bg");

  const name = document.createElement("h1");
  name.classList.add("card-text");
  name.classList.add("fs-6");
  name.textContent = `${data.name}`;

  row.appendChild(col);
  col.appendChild(card);
  card.appendChild(cardBody);
  cardBody.appendChild(name);
}

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

fetchSpell(page)
