let imagenes;

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

function fetchClases() {
  fetch(`https://api.open5e.com/classes`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".spinner").classList.add("d-none");
      for(let i = 0; i < data.results.length; i++){
        dibujarCard(data.results[i], imagenes.result[i], i);
      }
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

  const imagen = document.createElement("img");
  imagen.src = imagenes.url;
  imagen.classList.add("card-img-top");

  const a = document.createElement("a");
  a.setAttribute("href", "clases-info.html");
  a.innerText = "Mas informacion";
  a.classList.add("btn", "informacion", "text-light", `${data.name}`);
  a.setAttribute("data-id", id);

  row.appendChild(col);
  col.appendChild(card);
  card.appendChild(imagen);
  card.appendChild(cardBody);
  cardBody.appendChild(name);
  cardBody.appendChild(a);

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

traerDatos();
fetchClases();
