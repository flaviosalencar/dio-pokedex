function getTypeFilter(pokemons) {
    let typeList = [];
    for (let i = 0; i < pokemons.length; i++) {
        const pokemonTypes = pokemons[i].types;

        for (let i = 0; i < pokemonTypes.length; i++) {
            const pokemonType = pokemonTypes[i];
            typeList = typeList.concat(pokemonType)                                     //Adiciona os tipos
        }
    }

    typeList = typeList.filter((value, index, self) => self.indexOf(value) === index);  //Remove valores duplicados
    return typeList;
}

function loadTypeFilter(types, filterType) {                                            //Transfere os valores da tabela para o filtro
    types.map(type => filterType.insertAdjacentHTML('beforeend', `<option>${type}</option>`))

    var selectOption = {};                                                              //Remove valores duplicados
    $("select[id='filter-type'] > option").each(function () {
        if (selectOption[this.text]) {
            $(this).remove();
        } else {
            selectOption[this.text] = this.value;
        }
    });
}

function loadFilters(pokemonList) {
    const name = filterName.value
    const type = filterType.value

    for (let i = 0; i < pokemonList.children.length; i++) {
        const pokemon = pokemonList.children[i];
        if (validPokemon(pokemon, name, type)) {                                        //Se o filtro for válido, mantém o card
            pokemon.style.display = 'block'
        } else {                                                                        //Senão, oculta o card
            pokemon.style.display = 'none'
        }
    }
}

function validPokemon(pokemon, name, type) {
    let checkType = false;
    for (let i = 0; i < pokemon.getElementsByClassName('type').length; i++) {           //pokemonList.children[i]
        const classType = pokemon.getElementsByClassName('type')[i].innerText;
        if (type === classType || type === '') {
            checkType = true;
        }
    }

    const className = pokemon.getElementsByClassName('name')[0].innerText               //pokemonList.children[i]
    const search = new RegExp(name, 'i')
    const checkName = search.test(className)
    return checkName && checkType
}