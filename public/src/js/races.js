let limite = 9;
let distancia = 0;
let imagenes;
let spellCasting = document.getElementById("spellcasting");
const form = document.getElementById("form");

function fetchfor(distancia, limite) {
  for (let i = distancia; i <= distancia + limite; i++) {
    fetchClases(i);
  }
}

function fetchClases(id) {
  fetch(`https://api.open5e.com/races/`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results[id]);
      document.querySelector(".spinner").classList.add("d-none");
      dibujarCard(data.results[id], id);
    });
}

function dibujarCard(data, imagenes, id) {
  const row = document.querySelector(".row");

  const col = document.createElement("div");
  col.classList.add(
    "col-12",
    "col-md-6",
    "col-lg-4",
    "mt-5",
    "d-flex",
    "justify-content-center"
  );

  const card = document.createElement("div");
  card.classList.add("card", "clases", "text-light");
  card.style.width = "300px";

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const name = document.createElement("h5");
  name.classList.add("card-title");
  name.textContent = `${data.name}`;

  const a = document.createElement("a");
  a.setAttribute("href", "clases-info.html");
  a.setAttribute("data-id", id);

  row.appendChild(col);
  col.appendChild(card);
  card.appendChild(cardBody);
  cardBody.appendChild(name);

  info();
}

function info() {
  botonesInfo = document.querySelectorAll(".informacion");
  botonesInfo.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (localStorage.id) {
        localStorage.setItem("id", JSON.stringify({ id: e.target.dataset.id }));
      } else {
        localStorage.setItem("id", JSON.stringify({ id: e.target.dataset.id }));
      }
    });
  });
}

fetchfor(distancia, limite);
