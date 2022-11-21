let info = JSON.parse(localStorage.slug);
let slug = info.slug;
let url = `https://api.open5e.com/spells/?slug__in=${slug}`;

function fetchSpells() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".spinner").classList.add("d-none");
      console.log(data.results[0]);
    });
}

fetchSpells();
