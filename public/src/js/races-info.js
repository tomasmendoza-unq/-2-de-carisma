let info = JSON.parse(localStorage.slug);
let slug = info.slug;
let container = document.querySelector(".races");

function fetchRaces() {
  fetch(`https://api.open5e.com/races/?name=${slug}`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".contenedor").classList.add("d-none");
      document.querySelector(".load").classList.add("d-none");
      createRaces(data.results[0]);
      document.querySelector(".race-container").classList.remove("d-none");
    });
}

function createRaces(data) {
  // Nombre de la raza
  let race_name = document.querySelector(".race-name");
  race_name.innerText = data.name;

  // Descripción de la raza
  let race_desc = document.querySelector(".desc");
  race_desc.innerHTML =
    "<b><i>Description.</i></b> " + data.desc.replace("##", "");

  // Alineamiento de la raza
  let race_alignment = document.querySelector(".alignment");
  race_alignment.innerHTML = data.alignment
    .replace(/\*\*\_/g, "<b><i>")
    .replace(/\_\*\*/g, "</i></b>");

  let race_age = document.querySelector(".age");
  race_age.innerHTML = data.age
    .replace(/\*\*\_/g, "<b><i>")
    .replace(/\_\*\*/g, "</i></b>");

  let race_size = document.querySelector(".size");
  race_size.innerHTML = data.size
    .replace(/\*\*\_/g, "<b><i>")
    .replace(/\_\*\*/g, "</i></b>");

  let race_speed = document.querySelector(".speed");
  race_speed.innerHTML = data.speed_desc
    .replace(/\*\*\_/g, "<b><i>")
    .replace(/\_\*\*/g, "</i></b>");

  if (data.vision !== "") {
    let race_vision = document.querySelector(".vision");
    race_vision.innerHTML = data.vision
      .replace(/\*\*\_/g, "<b><i>")
      .replace(/\_\*\*/g, "</i></b>");

    document.querySelector(".vision-container").classList.remove("d-none");
  }

  let race_stat_desc = document.querySelector(".stat-desc");
  race_stat_desc.innerHTML = data.asi_desc
    .replace(/\*\*\_/g, "<b><i>")
    .replace(/\_\*\*/g, "</i></b>");

  let race_languages = document.querySelector(".languages");
  race_languages.innerHTML = data.languages
    .replace(/\*\*\_/g, "<b><i>")
    .replace(/\_\*\*/g, "</i></b>");

  let race_traits = document.querySelector(".traits");
  race_traits.innerHTML =
    "<b><i>Traits.</i></b> <br />" +
    data.traits
      .replace(/\n/g, "<br />")
      .replace(/\*\*\_/g, "<b><i>")
      .replace(/\_\*\*/g, "</i></b>");

  // Información de la subraza, aparece si es que tiene subraza
  if (data.subraces.length > 0) {
    let subrace_name = document.querySelector(".subrace-name");
    subrace_name.innerText = "Subrace: " + data.subraces[0].name;

    let subrace_desc = document.querySelector(".sub-desc");
    subrace_desc.innerHTML =
      "<b><i>Description.</i></b> " +
      data.subraces[0].desc.replace("##", "").replace(/\n/g, "<br />");

    let subrace_stat_desc = document.querySelector(".sub-stat-desc");
    subrace_stat_desc.innerHTML = data.subraces[0].asi_desc
      .replace(/\*\*\_/g, "<b><i>")
      .replace(/\_\*\*/g, "</i></b>");

    let subrace_traits = document.querySelector(".sub-traits");
    subrace_traits.innerHTML = data.subraces[0].traits
      .replace(/\n/g, "<br />")
      .replace(/\*\*\_/g, "<b><i>")
      .replace(/\_\*\*/g, "</i></b>")
      .replace(/\.\_/g, "</i>.")
      .replace(/\*\ \_/g, "* <i>")
      .replace(/\*/g, "•");

    document.querySelector(".subrace-container").classList.remove("d-none");
  }
}

fetchRaces();
