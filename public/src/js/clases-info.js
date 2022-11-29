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
      clase.classList.remove("d-none");
      des.classList.remove("d-none");
      col1(data.results[id], imagenes.result[id]);
      col2(data.results[id]);
    });
}

function col1(data, imagen) {
  let card = document.createElement("div");
  card.classList.add("card", "bg-dark", "info", "rounded-0");
  card.style.padding = "20px";
  card.style.border = "none";

  let header = document.createElement("div");
  header.classList.add("card-header", "px-0");

  let textHeader = document.createElement("h1");
  textHeader.classList.add("card-title", "fs-3");
  textHeader.innerText = data.name;

  let cardBlock = document.createElement("div");
  cardBlock.classList.add("card-block", "p-1");

  let cardText = document.createElement("card-text");
  cardText.classList.add("card-text");

  let desc = document.createElement("p");
  desc.innerText = imagen.desc;

  let hit = document.createElement("p");
  hit.innerText = `Dado de golpe: ${data.hit_dice}`;

  let img = document.createElement("img");
  img.classList.add("img-fluid", "mx-auto");
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

function col2(data) {
  let tablaTab = document.querySelector("#tabla-tab-pane");
  let descripcionTab = document.querySelector("#descripcion-tab-pane");
  let equipamientoTab = document.querySelector("#equipamiento-tab-pane");
  
  tablaTab.innerText = data.table;
  
  descripcionTab.innerHTML = data.desc
  .replace(/\n/g,"<br>")
  .replace(/###/g, "")
  .replace(/#/g, "")
  .replace(/\*\*\ \=/g, "</b> =")
  .replace(/\*\*/g, "<b>")

  equipamientoTab.innerHTML = data.equipment
  .replace(/\n/g,"<br>")
  .replace(/\(\*/g, '(<b>')
  .replace(/\*\)/g, '</b>)')
  .replace(/\*/g, "•");
}

fetchClases();
