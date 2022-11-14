let info = JSON.parse(localStorage.id)
let id = info.id
let container = document.querySelector("container")
let imagenes

function traerDatos() {

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', '../public/src/js/json/imagenes.json', true);

    xhttp.send();

    xhttp.onreadystatechange = function() {
        
        if(this.readyState == 4 && this.status == 200){
            imagenes = JSON.parse(this.responseText)
        }
    }

}


traerDatos()

function fetchClases () {
    fetch(`https://api.open5e.com/classes`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data.results[id])
        console.log(imagenes.result[id])
        document.querySelector(".spinner").classList.add("d-none")
        rellenar(data.results[localStorage.id.id],imagenes.result[id])
    })
}

function rellenar (data, imagen) {
    const row = document.querySelector("row")

    const img = document.querySelector(".float-start")

    img.src = imagen.url
}


fetchClases()