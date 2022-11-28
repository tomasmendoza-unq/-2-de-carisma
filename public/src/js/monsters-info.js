let info = JSON.parse(localStorage.slug);
let slug = info.slug;

function slugToName(cadena) {
  let str = "";

  str = cadena.replace(
    /-/g,
    " "
  );

  const mySentence = str;
  const finalSentence = mySentence.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

  return finalSentence;
}

let url = `https://api.open5e.com/monsters/?name=${slugToName(slug)}`;

function fetchMonster() {
  let monsterName = document.querySelector(".monster-name");
  let alignment_size_type = document.querySelector(".monster-alignment-size-type");

  // valor de desafio, clse de armadura, puntos de golpe, dados de golpe y velocidad
  let challenge_rating = document.querySelector(".monster-challenge-rating");
  let armor_class = document.querySelector(".monster-armor-class");
  let hit_points = document.querySelector(".monster-hit-points");
  let speed = document.querySelector(".monster-speed");
  
  // Estadísiticas
  let str = document.querySelector(".monster-stat-str");
  let des = document.querySelector(".monster-stat-des");
  let con = document.querySelector(".monster-stat-con");
  let int = document.querySelector(".monster-stat-int");
  let wis = document.querySelector(".monster-stat-wis");
  let cha = document.querySelector(".monster-stat-cha");

  // Tiradas de salvación
  let save_str = document.querySelector(".monster-str-save");
  let save_des = document.querySelector(".monster-des-save");
  let save_con = document.querySelector(".monster-con-save");
  let save_int = document.querySelector(".monster-int-save");
  let save_wis = document.querySelector(".monster-wis-save");
  let save_cha = document.querySelector(".monster-cha-save");

  // Habilidades
  let ul = document.querySelector(".monster-skills-list");

  // Sentidos y lenguajes
  let senses = document.querySelector(".monster-sense");
  let languages = document.querySelector(".monster-languages");

  // Resistencia y vulnerabilidades
  let condition_immunities = document.querySelector(".monster-condition-inmunities");
  let damage_resistances = document.querySelector(".monster-damage-resistances");
  let damage_immunities = document.querySelector(".monster-damage-inmunities");
  let damage_vulnerabilities = document.querySelector(".monster-damage-vulnerability");

  let special_abilities = document.querySelector(".monster-special-abilities");
  let actions = document.querySelector(".monster-actions");
  let reactions = document.querySelector(".monster-reactions");
  let legendary_desc = document.querySelector(".monster-legendary-desc");
  let legendary_actions = document.querySelector(".monster-legendary-actions");
  
  fetch(url)
  .then((res) => res.json())
  .then((data) => {
    document.querySelector(".spinner").classList.add("d-none");
    console.log(data.results[0]);

    monsterName.textContent = data.results[0].name;

    alignment_size_type.textContent = data.results[0].type + ' ' + data.results[0].size + ', ' + data.results[0].alignment;

    challenge_rating.textContent = data.results[0].challenge_rating;
    armor_class.textContent = data.results[0].armor_class + " (" + data.results[0].armor_desc + ")";
    hit_points.textContent = data.results[0].hit_points + " (" + data.results[0].hit_dice + ")";

    if (Object.entries(data.results[0].speed).length !== 0) {
      for (let i = 0; i < Object.entries(data.results[0].speed).length; i++) {
        let span = document.createElement("span");
        span.innerText = Object.entries(data.results[0].speed)[i] + ' | ';
        speed.appendChild(span);
      }
    }

    // Estadísticas del monstruo
    str.textContent = data.results[0].strength;
    des.textContent = data.results[0].dexterity;
    con.textContent = data.results[0].constitution;
    int.textContent = data.results[0].intelligence;
    wis.textContent = data.results[0].wisdom;
    cha.textContent = data.results[0].charisma;

    // Tiradas de salvación de los monstruos
    data.results[0].strength_save == null ? save_str.innerText = "-" : save_str.innerText = '+' + data.results[0].strength_save;
    data.results[0].dexterity_save == null ? save_des.innerText = "-" : save_des.innerText = '+' + data.results[0].dexterity_save;
    data.results[0].constitution_save == null ? save_con.innerText = "-" : save_con.innerText = '+' + data.results[0].constitution_save;
    data.results[0].intelligence_save == null ? save_int.innerText = "-" : save_int.innerText = '+' + data.results[0].intelligence_save;
    data.results[0].wisdom_save == null ? save_wis.innerText = "-" : save_wis.innerText = '+' + data.results[0].wisdom_save;
    data.results[0].charisma_save == null ? save_cha.innerText = "-" : save_cha.innerText = '+' + data.results[0].charisma_save;
  
    // Lista de las habilidades del monstruo
    if (Object.entries(data.results[0].skills).length !== 0) {
      for (let i = 0; i < Object.entries(data.results[0].skills).length; i++) {
        let li = document.createElement("li");
        li.innerText = Object.entries(data.results[0].skills)[i];
        ul.appendChild(li);
      }
    } else {
      let skills = document.querySelector(".monster-skill")
      skills.classList.remove("d-none")
      skills.innerText = "No tiene habilidades";
    }

    senses.innerText = data.results[0].senses;
    languages.innerText = data.results[0].languages;

    data.results[0].condition_immunities == "" ? condition_immunities.innerText = "-" : condition_immunities.innerText = data.results[0].condition_immunities;
    data.results[0].damage_resistances == "" ? damage_resistances.innerText = "-" : damage_resistances.innerText = data.results[0].damage_resistances;
    data.results[0].damage_immunities == "" ? damage_immunities.innerText = "-" : damage_immunities.innerText = data.results[0].damage_immunities;
    data.results[0].damage_vulnerabilities == "" ? damage_vulnerabilities.innerText = "-" : damage_vulnerabilities.innerText = data.results[0].damage_vulnerabilities;

    // Rasgos
    if (data.results[0].special_abilities !== "") {
      for (let i = 0; i < data.results[0].special_abilities.length; i++) {
        let h4 = document.createElement("h4");
        h4.classList.add("fw-bold", "fs-6");
        h4.innerText = data.results[0].special_abilities[i].name;

        let p = document.createElement("p");
        p.classList.add("fs-6");
        p.innerText = data.results[0].special_abilities[i].desc;

        special_abilities.appendChild(h4)
        special_abilities.appendChild(p)
      }
    } else {
      // Si no existe algún rasgo, oculta el contenedor
      let specialAbilitiesContainer = document.querySelector(".special-abilities-container");
      specialAbilitiesContainer.classList.add("d-none");
    }
    

    // Acciones
    if (data.results[0].actions !== "") {
      for (let i = 0; i < data.results[0].actions.length; i++) {
        let h4 = document.createElement("h4");
        h4.classList.add("fw-bold", "fs-6");
        h4.innerText = data.results[0].actions[i].name;

        let p = document.createElement("p");
        p.classList.add("fs-6");
        p.innerText = data.results[0].actions[i].desc;

        actions.appendChild(h4)
        actions.appendChild(p)
      }
    }  else {
      // Si no existe alguna acción, oculta el contenedor
      let actionsContainer = document.querySelector(".actions-container");
      actionsContainer.classList.add("d-none");
    }


    // Reacciones
    if (data.results[0].reactions !== "") {
      for (let i = 0; i < data.results[0].reactions.length; i++) {
        let h4 = document.createElement("h4");
        h4.classList.add("fw-bold", "fs-6");
        h4.innerText = data.results[0].reactions[i].name;
  
        let p = document.createElement("p");
        p.classList.add("fs-6");
        p.innerText = data.results[0].reactions[i].desc;
  
        reactions.appendChild(h4)
        reactions.appendChild(p)
      }
    } else {
      // Si no existe alguna reacción, oculta el contenedor
      let reactionsContainer = document.querySelector(".reactions-container");
      reactionsContainer.classList.add("d-none");
    }


    // Acciones legendarias
    if (data.results[0].legendary_actions !== "") {
      legendary_desc.innerText = data.results[0].legendary_desc;
      for (let i = 0; i < data.results[0].legendary_actions.length; i++) {
        let h4 = document.createElement("h4");
        h4.classList.add("fw-bold", "fs-6");
        h4.innerText = data.results[0].legendary_actions[i].name;
  
        let p = document.createElement("p");
        p.classList.add("fs-6");
        p.innerText = data.results[0].legendary_actions[i].desc;
  
        legendary_actions.appendChild(h4)
        legendary_actions.appendChild(p)
      }
    }  else {
      // Si no existe alguna acción legendaria, oculta el contenedor
      let legendaryActionsContainer = document.querySelector(".legendary-actiones-container");
      legendaryActionsContainer.classList.add("d-none");
    }

    monster = document.querySelectorAll(".monster-info");
    monster[0].classList.remove("d-none");
    monster[1].classList.remove("d-none");
  });
}

fetchMonster();

/**
 * Principal problema de esta página es que no puede tomar los datos
 * slug de los monstruos que en su name tengan un "-" o una ","
 */