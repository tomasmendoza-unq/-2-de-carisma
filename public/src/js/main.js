const link = ''
const container= document.querySelector('.container')

let limite = 9;
let distancia = 0;

// fetchweapons

// fetch("https://api.open5e.com/weapons")
//     .then((res) => res.json())
//     .then((data) => {
//         console.log(data)
//     });

function fetchfor(distancia, limite) {
    for (let i = distancia; i <= distancia + limite; i++) {
        fetchClases(i);
    }
}

function fetchClases(id){
    fetch(`https://api.open5e.com/classes`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.results[id])
            document.querySelector(".spinner").classList.add("d-none")
            dibujarCard(data.results[id])
        })
}


function dibujarCard(data){
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

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
    name.classList.add("card-text")
    name.textContent = `${data.name}`
    
    const imagen = document.createElement("div");
    imagen.classList.add("img-container");

    container.appendChild(col);
    col.appendChild(card);
    card.appendChild(imagen);
    card.appendChild(cardBody);
    cardBody.appendChild(name);

}

fetchfor(distancia, limite)