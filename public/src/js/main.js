const link = 'https://api.open5e.com/classes'

console.log("hola")

// fetchweapons

fetch("https://api.open5e.com/weapons")
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
    });

// function fetchClases(){
    fetch(link)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            document.querySelector(".spinner").classList.add("d-none")
        })
// }


function dibujarCard(){

}