let generador = document.querySelector(".btn-generar");

let claseI = document.querySelector(".clase-i");
let claseN = document.querySelector(".clase-n");

let razaI = document.querySelector(".raza-i");
let razaN = document.querySelector(".raza-n");

let armaD = document.querySelector(".arma-d");
let armaN = document.querySelector(".arma-n");

let hechizoD = document.querySelector(".hechizo-d");
let hechizoN = document.querySelector(".hechizo-n");

let imagenes;

var random = (desde, hasta) => {
  return Math.trunc(Math.random() * (hasta - desde) + desde);
};

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

generador.addEventListener("click", () => {
  document.querySelector(".contenedor").classList.remove("d-none");
  document.querySelectorAll(".pj").forEach((element) => {
    element.classList.add("d-none");
  });

  function personaje() {
    let numero = random(0, 8);
    fetch(`https://api.open5e.com/classes`)
      .then((res) => res.json())
      .then((data) => {
        let clase = data.results[numero];
        document.querySelector(".contenedor").classList.add("d-none");
        claseN.innerText = clase.name;
        claseI.src = imagenes.result[numero].url;
      });
    fetch(`https://api.open5e.com/races`)
      .then((res) => res.json())
      .then((data) => {
        let n = random(12, 20);
        let raza = data.results[numero];
        razaN.innerText = raza.name;
        razaI.src = imagenes.result[n].url;
      });
    fetch(`https://api.open5e.com/weapons`)
      .then((res) => res.json())
      .then((data) => {
        let arma = data.results[numero];
        armaN.innerText = arma.name;
        armaD.innerText = arma.category;
      });
    fetch(`https://api.open5e.com/spells`)
      .then((res) => res.json())
      .then((data) => {
        let numero = random(0, 40);
        let hechizo = data.results[numero];
        hechizoN.innerText = hechizo.name;
        hechizoD.innerText = hechizo.casting_time;
        document.querySelectorAll(".pj").forEach((element) => {
          element.classList.remove("d-none");
        });
      });
  }

  personaje();
});

traerDatos();
