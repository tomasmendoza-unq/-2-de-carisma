const container = document.querySelector(".spells");
const spinner = document.querySelector(".spinner");
const pagination = document.querySelector(".pagination");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const filtro = document.querySelector("#filtro");

let limit = 8;
let offset = 0;

filtro.addEventListener("click", () => {
  removeChildNodes(container);
  fetchSpells(offset, limit);
});

previous.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 9;
    removeChildNodes(container);
    fetchSpells(offset, limit);
  }
});

next.addEventListener("click", () => {
  offset += 9;
  removeChildNodes(container);
  fetchSpells(offset, limit);
});


function fetchSpell(id) {
  let spellName = document.getElementById("name-spell").value;
  let spellLevel = document.getElementById("spell-level").value;
  let spellSchool = document.getElementById("spell-school").value;
  let spellClass = document.getElementById("spell-class").value;

  
  if (spellName !== "") {
    fetch(`https://api.open5e.com/spells/?search=${spellName}`)
    .then((res) => res.json())
    .then((data) => {
      
      console.log(data.results[id])
      crearSpell(data.results[id]);
      spinner.classList.add("d-none");
    });
  }
  else {
    fetch(`https://api.open5e.com/spells/?name__iexact=${spellName}&level_int__iexact=${spellLevel}&school__iexact=${spellSchool}&dnd_class__icontains=${spellClass}`)
    .then((res) => res.json())
    .then((data) => {

      crearSpell(data.results[id]);
      
      spinner.classList.add("d-none");
    });
  }
}

function fetchSpells(offset, limit) {
  spinner.classList.remove("d-none");
  for (let i = offset; i <= offset + limit; i++) {
    fetchSpell(i);
  }
}

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
  card.classList.add("card-body");

  const name = document.createElement("h1");
  name.classList.add("card-text");
  name.classList.add("fs-6");
  name.textContent = `${data.name}`;

  row.appendChild(col)
  col.appendChild(card);
  card.appendChild(cardBody);
  cardBody.appendChild(name);
}

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

fetchSpells(offset, limit);
