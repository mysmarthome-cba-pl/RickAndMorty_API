const characterContainer = document.querySelector(".character-container");
const noResult = document.querySelector(".no-results-message");
const filterRadios = document.querySelectorAll('input[name="status"]');
const count = document.getElementById("countCharacter");
const searchInput = document.getElementById("search-input");
const prevButton = document.getElementById("btnPrev");
const nextButton = document.getElementById("btnNext");
let searchName;
let statusSelected;
let currentPage = 1;

const updateCharacters = () => {
  if (!dataResults) {
    characterContainer.innerHTML = "";
    noResult.style.display = "block";
    countCharacter.innerHTML = "";
    return;
  } else {
    noResult.style.display = "none";
    characterContainer.innerHTML = "";
    dataResults.forEach((character) => {
      const characterTile = document.createElement("div");
      characterTile.classList.add("character-tile");
      characterTile.innerHTML = `
          <img src="${character.image}" class="character-photo" alt="${character.name}">
          <div class="character-details">
            <h2>${character.name}</h2>
            <p>Species: ${character.species}</p>
            <p>Status: ${character.status}</p>
          </div>
        `;
      characterContainer.appendChild(characterTile);
    });
  }

  const totalPages = dataInfo.pages;
  if (currentPage === 1) {
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
  }

  if (currentPage >= totalPages) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }

  let count = currentPage * 20;
  if (count > dataInfo.count) {
    count = dataInfo.count;
  }
  countCharacter.innerHTML = `${count}/${dataInfo.count}`;
};

async function fetchDataAndDisplayCharacters(page, search, status) {
  try {
    let apiUrl = "https://rickandmortyapi.com/api/character/";
    const params = new URLSearchParams();
    if (page) params.set("page", page);
    if (search) params.set("name", search);
    if (status) params.set("status", status);
    apiUrl += "?" + params.toString();
    const response = await fetch(apiUrl);
    const data = await response.json();
    dataInfo = data.info;
    dataResults = data.results;
    updateCharacters();
  } catch (error) {
    console.log("Error fetching data from API:", error);
  }
}

filterRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    currentPage = 1;
    searchName = searchInput.value.toLowerCase();
    statusSelected = radio.value.toLowerCase();
    fetchDataAndDisplayCharacters(1, searchName, statusSelected);
  });
});

searchInput.addEventListener("input", () => {
  currentPage = 1;
  searchName = searchInput.value.toLowerCase();
  statusSelected = document
    .querySelector('input[name="status"]:checked')
    .value.toLowerCase();
  fetchDataAndDisplayCharacters(1, searchName, statusSelected);
});

nextButton.addEventListener("click", () => {
  currentPage++;
  searchName = searchInput.value.toLowerCase();
  statusSelected = document
    .querySelector('input[name="status"]:checked')
    .value.toLowerCase();
  fetchDataAndDisplayCharacters(currentPage, searchName, statusSelected);
});

prevButton.addEventListener("click", () => {
  currentPage--;
  searchName = searchInput.value.toLowerCase();
  statusSelected = document
    .querySelector('input[name="status"]:checked')
    .value.toLowerCase();
  fetchDataAndDisplayCharacters(currentPage, searchName, statusSelected);
});

fetchDataAndDisplayCharacters(1, "", "alive");
