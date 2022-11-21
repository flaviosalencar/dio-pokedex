
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type

    const statBase = pokeDetail.stats.map((statSlot) => statSlot.base_stat)
    const statName = pokeDetail.stats.map((statSlot) => statSlot.stat.name)
    pokemon.stats = getStatsList(statBase, statName)

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

function getStatsList(statBase, statName) {
    let statsList = [];
    for (let i = 0; i < statBase.length; i++) {
        const value = statBase[i];
        const name = statName[i];
        statsList = statsList.concat(name + '= ' + value)                                   //Adiciona os tipos
    }
    return statsList;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
