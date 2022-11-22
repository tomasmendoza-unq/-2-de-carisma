function fetchRaces() {
  fetch(`https://api.open5e.com/races/`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".spinner").classList.add("d-none");
      for(let i=0; i < data.results.length; i++){
        dibujarCard(data.results[i], i);
      }
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
  const a = document.createElement("a");
  a.classList.add("text-decoration-none", "link-light", "races");
  a.setAttribute("href", "races-info.html");
  
  const card = document.createElement("div");
  card.classList.add("card", "clases");
  card.style.width = "300px";

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "btn");
  cardBody.setAttribute("data-slug", data.name);

  const name = document.createElement("h5");
  name.classList.add("card-title");
  name.textContent = `${data.name}`;
  name.setAttribute("data-slug", data.name);

  

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

fetchRaces();
