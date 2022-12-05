let info = JSON.parse(localStorage.name);
let name = info.name;

let url = `https://api.open5e.com/magicitems/?name=${name}`;

function fetchMagicItem() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".contenedor").classList.add("d-none");
      document.querySelector(".load").classList.add("d-none");
      crearMagicItemInfo(data.results[0]);
      document.querySelector(".magicitem-container").classList.remove("d-none");
    });
}

function crearMagicItemInfo(data) {
  let name = document.querySelector(".magicitem-name");
  name.innerText = data.name;

  let rarity = document.querySelector(".magicitem-rarity");
  rarity.innerText = data.rarity;

  let attunement = document.querySelector(".magicitem-attunement");
  data.requires_attunement !== ""
    ? (attunement.innerText = data.requires_attunement)
    : (attunement.innerText = "No requires attunement");

  let desc = document.querySelector(".magicitem-desc");
  desc.innerHTML = data.desc
    .replace(/\n/g, "<br />")
    .replace(/\_\*\*/g, "</i></b>")
    .replace(/\*\*\_/g, "<b><i>");
}

fetchMagicItem();
