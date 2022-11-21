let info = JSON.parse(localStorage.id);
let id = info.id;
let imagenes;
let clase = document.querySelector(".clase");
let des = document.querySelector(".des");

function traerDatos() {
  const xhttp = new XMLHttpRequest();

  xhttp.open("GET", "../public/src/js/json/imagenes.json", true);

  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      imagenes = JSON.parse(this.responseText);
    }
  };
}

traerDatos();

function fetchClases() {
  fetch(`https://api.open5e.com/classes`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".spinner").classList.add("d-none");
      document.querySelector(".back").classList.remove("d-none");
      col1(data.results[id], imagenes.result[id]);
      col2(data.results[id], imagenes.result[id]);
    });
}

function col1(data, imagen) {
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

  let desc = document.createElement("p");
  desc.innerText = imagen.desc;

  let hit = document.createElement("p");
  hit.innerText = `Puntos de golpe: ${data.hit_dice}`;

  let img = document.createElement("img");
  img.classList.add("img-fluid", "mx-auto", "d-block");
  img.src = imagen.url;
  img.style.width = "100%";

  clase.appendChild(card);
  card.appendChild(header);
  header.appendChild(textHeader);
  card.appendChild(cardBlock);
  cardBlock.appendChild(cardText);
  cardText.appendChild(desc);
  cardBlock.appendChild(hit);
  cardBlock.appendChild(img);
}

function col2(data, imagen) {
  let card = document.createElement("div");
  card.classList.add("card", "bg-dark");
  card.style.padding = "20px";
  card.style.border = "none";

  let header = document.createElement("div");
  header.classList.add("card-header");

  let textHeader = document.createElement("h4");
  textHeader.classList.add("card-title");
  textHeader.innerText = "Rasgos de clase";

  let cardBlock = document.createElement("div");
  cardBlock.classList.add("card-block", "f-block", "pt-1");
  cardBlock.style.padding = "20px";

  let table = document.createElement("a");
  table.setAttribute("data-bs-toggle", "collapse");
  table.setAttribute("href", "#table");
  table.setAttribute("id", "collapse");
  table.innerText = "Tabla de niveles";

  let car = document.createElement("div");
  car.classList.add("collapse");
  car.setAttribute("id", "table");

  let p = document.createElement("p");

  let tabla = document.createElement("div");
  tabla.classList.add("pt-1", "pb-1");

  let tablap = p;
  tablap.innerText = data.table;
  tablap.classList.add("mt-2");
  // descripcion elementos

  let descripcion = document.createElement("a");
  descripcion.setAttribute("data-bs-toggle", "collapse");
  descripcion.setAttribute("href", "#descripcion");
  descripcion.setAttribute("id", "collapse");
  descripcion.innerText = "Descripcion";

  let cardes = document.createElement("div");
  cardes.classList.add("collapse");
  cardes.setAttribute("id", "descripcion");

  let d = document.createElement("div");
  tabla.classList.add("pt-1", "pb-1");

  let de = document.createElement("p");
  de.innerText = data.desc;
  de.classList.add("mt-2");
  de.style.wordSpacing = "0.5em";

  // equipamiento

  let equipamiento = document.createElement("a");
  equipamiento.setAttribute("data-bs-toggle", "collapse");
  equipamiento.setAttribute("href", "#equip");
  equipamiento.setAttribute("id", "collapse");
  equipamiento.innerText = "Equipamiento";

  let cardeq = document.createElement("div");
  cardeq.classList.add("collapse");
  cardeq.setAttribute("id", "equip");

  let equid = document.createElement("div");
  equid.classList.add("pt-1", "pb-1");

  let equip = document.createElement("p");
  equip.innerText = data.equipment;
  equip.classList.add("mt-2");
  equip.style.wordSpacing = "0.5em";

  // row

  let row = document.createElement("div");
  row.classList.add("row", "mt-1");

  let col = document.createElement("div");
  col.classList.add("col-12", "col-md-4");

  let col2 = document.createElement("div");
  col2.classList.add("col-12", "col-md-4");

  let col3 = document.createElement("div");
  col3.classList.add("col-12", "col-md-4");

  des.appendChild(card);
  card.appendChild(header);
  header.appendChild(textHeader);
  card.appendChild(cardBlock);
  // Tabla
  cardBlock.appendChild(row);
  row.appendChild(col);
  col.appendChild(table);

  // Descripcion
  cardBlock.appendChild(row);
  row.appendChild(col2);
  col2.appendChild(descripcion);

  // Equipamiento
  cardBlock.appendChild(row);
  row.appendChild(col3);
  col3.appendChild(equipamiento);

  // Collapse

  //Tabla de niveles

  cardBlock.appendChild(cardes);
  cardes.appendChild(d);
  cardes.appendChild(de);

  // Descripcion

  cardBlock.appendChild(car);
  car.appendChild(tabla);
  car.appendChild(tablap);

  // Equipamiento

  cardBlock.appendChild(cardeq);
  cardeq.appendChild(equip);
  cardeq.appendChild(equid);
}

fetchClases();
