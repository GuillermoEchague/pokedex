const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeHeight = document.querySelector('[data-poke-height]');
const pokeWeight = document.querySelector('[data-poke-weight]');
const pokeDescription = document.querySelector('[data-poke-description]');
const pokeVarieties = document.querySelector('[poke-varieties]');


const pokeTypes = document.querySelector('[data-poke-types]');
const pokeAbilities = document.querySelector('[data-poke-abilities]');
const pokeStats = document.querySelector('[data-poke-stats]');

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};


const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())

        fetch(`https://pokeapi.co/api/v2/pokemon-species/${value.toLowerCase()}`)
        .then(data1 => data1.json())
        .then(response => renderPokemonSpeciesData(response))
        .catch(err => console.log(err))

}

const renderPokemonData = data => {
    const sprite =  data.sprites.front_default;
    const { types, height, weight, abilities } = data;
    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeHeight.textContent = `Altura ${height}`;
    pokeWeight.textContent = `Peso ${weight}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonAbilities(abilities);
    // renderPokemonStats(stats);
}

const renderPokemonSpeciesData = data1 => {
    const { flavor_text_entries, varieties } = data1;
    console.log(flavor_text_entries[0].flavor_text)
    console.log(varieties)
    // pokeVarieties.textContent =flavor_text_entries[0].flavor_text
    // pokeName.textContent = data.name;
    // // pokeImg.setAttribute('src', sprite);
    // pokeId.textContent = `Nº ${data.id}`;
    pokeDescription.textContent = `Descripcion ${data1.flavor_text_entries[0].flavor_text}`;
    // pokeWeight.textContent = `Peso ${weight}`;
    // setCardColor(types);
    // renderPokemonTypes(types);
    // renderPokemonAbilities(abilities);
    //  renderPokemonVarieties(varieties);
}



const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = ' 5px 5px';
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonAbilities= abilities => {
    pokeAbilities.innerHTML = '';
    abilities.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.ability.name];
        typeTextElement.textContent = type.ability.name;
        pokeAbilities.appendChild(typeTextElement);
    });
}

const renderPokemonVarieties= varieties => {
    pokeVarieties.innerHTML = '';
    varieties.forEach(varieties => {
        const typeTextElement = document.createElement("div");
        // typeTextElement.style.color = typeColors[varieties.pokemon.name];
        typeTextElement.textContent = varieties.pokemon.name;
        pokeVarieties.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const renderNotFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', 'poke-shadow.png');
    pokeImg.style.background =  '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}