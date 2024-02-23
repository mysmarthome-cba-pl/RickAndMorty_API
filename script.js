const characterContainer = document.querySelector(".character-container");
const filterRadios = document.querySelectorAll('input[name="status"]');
const searchInput = document.getElementById("search-input");
const noResult = document.querySelector(".no-results-message");
let currentPage = 0;
const pageSize = 10;

const updateCharacters = () => {
  const filteredCharacters = dataResults.filter((character) => {
    const isStatusMatch = character.status.toLowerCase();
    const isNameMatch = character.name
      .toLowerCase()
      .includes(searchInput.value.toLowerCase());
    return isStatusMatch && isNameMatch;
  });

  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const charactersToShow = filteredCharacters.slice(startIndex, endIndex);

  characterContainer.innerHTML = "";

  if (charactersToShow.length === 0) {
    characterContainer.innerHTML = "";
    noResult.style.display = "block";
  } else {
    noResult.style.display = "none";
    charactersToShow.forEach((character) => {
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

  const totalCharacters = filteredCharacters.length;
  const totalPages = Math.ceil(totalCharacters / pageSize);

  if (currentPage === 0) {
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
  }

  if (currentPage >= totalPages - 1) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }
};

filterRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    const status = radio.value.toLowerCase();
    fetchDataAndDisplayCharacters(`${status}`);
  });
});

searchInput.addEventListener("input", () => {
  currentPage = 0;
  updateCharacters();
});

async function fetchDataAndDisplayCharacters(endpoint) {
  try {
    const response = await fetch(
      "https://rickandmortyapi.com/api/character/?status=" + endpoint
    );
    const data = await response.json();
    dataResults = data.results;
    updateCharacters();
  } catch (error) {
    console.log("Error fetching data from API:", error);
  }
}

const nextButton = document.getElementById("btnNext");
nextButton.addEventListener("click", () => {
  currentPage++;
  updateCharacters();
});

const prevButton = document.getElementById("btnPrev");
prevButton.addEventListener("click", () => {
  currentPage--;
  updateCharacters();
});

fetchDataAndDisplayCharacters("alive");
