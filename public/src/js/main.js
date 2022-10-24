const link = 'https://api.open5e.com/classes'

console.log("hola")

function fetchClases(){
    fetch(link)
        .then((res) => res.json())
        .then((data) => {
            document.querySelector(".spinner").classList.add("d-none")
        })
}


function dibujarCard(){

}