const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const pokemonWeight = document.getElementById('weight');
const pokemonHeight = document.getElementById('height');
const pokemonTypes = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const spritesContainer = document.getElementById('sprites-container');

const fetchData = async () => {
  try {
    const pokemonNameOrId = searchInput.value.toLowerCase();
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`);
    const data = await res.json();

    pokemonName.textContent = `${data.name.toUpperCase()}`
    pokemonId.textContent = `#${data.id}`
    pokemonWeight.textContent = `Weight: ${data.weight}`
    pokemonHeight.textContent = `Height: ${data.height}`

    spritesContainer.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name}" />`

    hp.textContent = `HP: ${data.stats[0].base_stat}`
    attack.textContent = `Attack: ${data.stats[1].base_stat}`
    defense.textContent = `Defense: ${data.stats[2].base_stat}`
    specialAttack.textContent = `Special Attack: ${data.stats[3].base_stat}`
    specialDefense.textContent = `Special Defence: ${data.stats[4].base_stat}`
    speed.textContent = `Speed: ${data.stats[5].base_stat}`

    pokemonTypes.innerHTML = data.types.map(obj => `<span>${obj.type.name.toUpperCase()}</span>`).join('')
  } catch (err) {
    alert('Pokémon not found');
    console.log(`Pokémon not found: ${err}`);
  }
};

searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  fetchData()
})

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    searchButton.click()
  }
})