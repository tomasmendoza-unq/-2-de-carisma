let info = JSON.parse(localStorage.slug);
let slug = info.slug;
let container = document.querySelector(".races");

function fetchRaces() {
  fetch(`https://api.open5e.com/races/?name=${slug}`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".spinner").classList.add("d-none");
      document.querySelector(".back").classList.remove("d-none");
      races(data.results[0]);
    });
}

function races(data) {
  let card = document.createElement("div");
  card.classList.add("card", "bg-dark", "info", "rounded-0");
  card.style.padding = "20px";
  card.style.border = "none";

  let header = document.createElement("div");
  header.classList.add("card-header");

  let textHeader = document.createElement("h4");
  textHeader.classList.add("card-title");
  textHeader.innerText = data.name;

  let cardBlock = document.createElement("div");
  cardBlock.classList.add("card-block", "pt-1");
  cardBlock.style.padding = "20px";

  let cardText = document.createElement("card-text");
  cardText.classList.add("card-text");

  container.appendChild(card);
  card.appendChild(header);
  header.appendChild(textHeader);
  card.appendChild(cardBlock);

  // columnas

  let row = document.createElement("div");
  row.classList.add("row");

  cardBlock.appendChild(row);

  let col = document.createElement("div");
  col.classList.add("col-12", "col-md-6");

  let age = document.createElement("h6");
  age.innerText = "Años";

  let ageP = document.createElement("p");
  ageP.innerText = data.age;

  row.appendChild(col);
  col.appendChild(age);
  col.appendChild(ageP);

  let col2 = document.createElement("div");
  col2.classList.add("col-12", "col-md-6");

  let desc = document.createElement("h6");
  desc.innerText = "Descripcion";

  let descP = document.createElement("p");
  descP.innerText = data.desc;

  row.appendChild(col2);
  col2.appendChild(desc);
  col2.appendChild(descP);

  let col3 = document.createElement("div");
  col3.classList.add("col-12", "col-md-6");

  let lenguaje = document.createElement("h6");
  lenguaje.innerText = "Lenguaje";

  let lenguajeP = document.createElement("p");
  lenguajeP.innerText = data.languages;

  row.appendChild(col3);
  col3.appendChild(lenguaje);
  col3.appendChild(lenguajeP);

  let col4 = document.createElement("div");
  col4.classList.add("col-12", "col-md-6");

  let tamaño = document.createElement("h6");
  tamaño.innerText = "Tamaño";

  let tamañoP = document.createElement("p");
  tamañoP.innerText = data.size;

  row.appendChild(col4);
  col4.appendChild(tamaño);
  col4.appendChild(tamañoP);

  let col5 = document.createElement("div");
  col5.classList.add("col-12", "col-md-6");

  let velocidad = document.createElement("h6");
  velocidad.innerText = "Velocidad";

  let velocidadP = document.createElement("p");
  velocidadP.innerText = data.speed_desc;

  row.appendChild(col5);
  col5.appendChild(velocidad);
  col5.appendChild(velocidadP);

  let col6 = document.createElement("div");
  col6.classList.add("col-12", "col-md-6");

  let habilidad = document.createElement("h6");
  habilidad.innerText = "Atributo";

  let habilidadP = document.createElement("p");
  habilidadP.innerText = data.asi_desc;

  row.appendChild(col6);
  col6.appendChild(habilidad);
  col6.appendChild(habilidadP);
}

fetchRaces();
