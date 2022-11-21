const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const filterName = document.querySelector('#filter-name')
const filterType = document.querySelector('#filter-type')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <img src="${pokemon.photo}"
                alt="${pokemon.name}"> 

                <ol class="statsList">
                    ${pokemon.stats.map((stat) => `<li class="stats ${stat}">${stat}</li>`).join('')}
                </ol>

                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml

        let pokemonTypes = [];
        pokemonTypes = getTypeFilter(pokemons);
        loadTypeFilter(pokemonTypes, filterType);
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

document.addEventListener('keyup', key => {
    if (key.key === 'Escape') {
        filterType.options[0].selected = 'selected'
        filterName.value = ''
        filterName.blur()
        loadFilters(pokemonList)
    }
})

filterName.addEventListener('keyup', key => {
    loadFilters(pokemonList)
})

filterType.addEventListener('change', key => {
    key.preventDefault()
    loadFilters(pokemonList)
    filterType.blur()
})