let info = JSON.parse(localStorage.slug);
let slug = info.slug;

function slugToName(cadena) {
  let str = "";

  if (
    cadena == "crossbow-light" ||
    cadena == "crossbow-hand" ||
    cadena == "crossbow-heavy"
  ) {
    str = (cadena[0].toUpperCase() + cadena.slice(1, cadena.length)).replace(
      "-",
      ", "
    );
  } else {
    str = (cadena[0].toUpperCase() + cadena.slice(1, cadena.length)).replace(
      "-",
      " "
    );
  }

  return str;
}

let url = `https://api.open5e.com/weapons/?name=${slugToName(slug)}`;

function fetchWeapons() {
  let weaponName = document.querySelector(".weapon-name");
  let weaponCategory = document.querySelector(".weapon-category");
  let weaponTypeDamage = document.querySelector(".weapon-type-damage");
  let weaponDamageDice = document.querySelector(".weapon-damage-dice");
  let weaponProperties = document.querySelector(".weapon-properties");
  let ul = document.querySelector(".list-properties");
  let weaponCost = document.querySelector(".weapon-cost");
  let weaponWeight = document.querySelector(".weapon-weight");

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".contenedor").classList.add("d-none");
      document.querySelector(".load").classList.add("d-none");

      weaponName.textContent = data.results[0].name;
      weaponCategory.textContent = data.results[0].category;
      weaponTypeDamage.textContent = data.results[0].damage_type;
      weaponDamageDice.textContent = data.results[0].damage_dice;
      weaponCost.textContent = data.results[0].cost;
      weaponWeight.textContent = data.results[0].weight;

      if (data.results[0].properties.length !== 0) {
        for (let i = 0; i < data.results[0].properties.length; i++) {
          let li = document.createElement("li");
          li.textContent = data.results[0].properties[i];
          ul.appendChild(li);
        }
      } else {
        weaponProperties.textContent = "No tiene propiedades";
      }

      document.querySelector(".weapon-container").classList.remove("d-none");
    });
}

fetchWeapons();
