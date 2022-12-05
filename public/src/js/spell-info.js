let info = JSON.parse(localStorage.slug);
let slug = info.slug;
let url = `https://api.open5e.com/spells/?slug__in=${slug}`;

function fetchSpells() {
  let spell_Name = document.querySelector(".spell-name");
  let spell_Level = document.querySelector(".spell-level");
  let spell_Casting_Time = document.querySelector(".spell-casting-time");
  let spell_Range = document.querySelector(".spell-range");
  let spell_Components = document.querySelector(".spell-components");
  let spell_Duration = document.querySelector(".spell-duration");
  let spell_School = document.querySelector(".spell-school");
  let spell_Concentration = document.querySelector(".spell-concentration");
  let spell_Ritual = document.querySelector(".spell-ritual");
  let spell_Classes = document.querySelector(".spell-classes");
  let spell_Archetype = document.querySelector(".spell-arquetype");
  let spell_Description = document.querySelector(".spell-description");
  let spell_Higher_Level = document.querySelector(".spell-higher-level");

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".contenedor").classList.add("d-none");
      document.querySelector(".load").classList.add("d-none");

      spell_Name.textContent = data.results[0].name;
      spell_Level.textContent = data.results[0].level;
      spell_Casting_Time.textContent = data.results[0].casting_time;
      spell_Range.textContent = data.results[0].range;

      if (data.results[0].material !== "") {
        spell_Components.textContent =
          data.results[0].components + " (" + data.results[0].material + ")";
      } else {
        spell_Components.textContent = data.results[0].components;
      }

      spell_Duration.textContent = data.results[0].duration;
      spell_School.textContent = data.results[0].school;
      spell_Concentration.textContent = data.results[0].concentration;
      spell_Ritual.textContent = data.results[0].ritual;

      if (data.results[0].dnd_class !== "") {
        document
          .querySelector(".spells-classes-container")
          .classList.remove("d-none");
        spell_Classes.textContent = data.results[0].dnd_class;
      }

      if (data.results[0].archetype !== "") {
        document
          .querySelector(".spells-archetype-container")
          .classList.remove("d-none");
        spell_Archetype.textContent = data.results[0].archetype;
      }

      spell_Description.innerHTML = data.results[0].desc
        .replace(/\n/g, "<br>")
        .replace(/\.\*\*/g, ".</b>")
        .replace(/\*\*/g, "<b>");

      spell_Higher_Level.textContent = data.results[0].higher_level;

      document.querySelector(".spells-container").classList.remove("d-none");
    });
}

fetchSpells();
