let info = JSON.parse(localStorage.slug);
let slug = info.slug;
let url = `https://api.open5e.com/spells/?slug__in=${slug}`;

function fetchSpells() {
  let spellName = document.querySelector(".spell-name");
  let spellLevel = document.querySelector(".spell-level");
  let spellCastingTime = document.querySelector(".spell-casting-time");
  let spellRange = document.querySelector(".spell-range");
  let spellComponents = document.querySelector(".spell-components");
  let spellDuration = document.querySelector(".spell-duration");
  let spellSchool = document.querySelector(".spell-school");
  let spellConcentration = document.querySelector(".spell-concentration");
  let spellRitual = document.querySelector(".spell-ritual");
  let spellDescription = document.querySelector(".spell-description");
  let spellHigherLevel = document.querySelector(".spell-higher-level");

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".spinner").classList.add("d-none");
      spellName.textContent = data.results[0].name;
      spellLevel.textContent = data.results[0].level;
      spellCastingTime.textContent = data.results[0].casting_time;
      spellRange.textContent = data.results[0].range;
      spellComponents.textContent = data.results[0].components;
      spellDuration.textContent = data.results[0].duration;
      spellSchool.textContent = data.results[0].school;
      spellConcentration.textContent = data.results[0].concentration;
      spellRitual.textContent = data.results[0].ritual;
      spellDescription.textContent = data.results[0].desc;
      spellHigherLevel.textContent = data.results[0].higher_level;
    });
}

fetchSpells();
