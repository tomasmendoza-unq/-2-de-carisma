let limite = 8;
let distancia = 0;
let spellCasting = document.getElementById("spellcasting");
const form = document.getElementById("form");

function fetchfor(distancia, limite) {
  for (let i = distancia; i <= distancia + limite; i++) {
    fetchRaces(i);
  }
}

function fetchRaces(id) {
  fetch(`https://api.open5e.com/races/`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".spinner").classList.add("d-none");
      dibujarCard(data.results[id], id);
    });
}

function dibujarCard(data, id) {
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
  cardBody.setAttribute("data-slug", data.name);

  const name = document.createElement("h5");
  name.classList.add("card-title");
  name.textContent = `${data.name}`;
  name.setAttribute("data-slug", data.name);

  const a = document.createElement("a");
  a.classList.add("text-decoration-none", "link-light", "races");
  a.setAttribute("href", "races-info.html");

  row.appendChild(col);
  col.appendChild(a);
  a.appendChild(card);
  card.appendChild(cardBody);
  cardBody.appendChild(name);

  info();
}

function info() {
  racesInfo = document.querySelectorAll(".races");
  racesInfo.forEach((boton) => {
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

fetchfor(distancia, limite);
