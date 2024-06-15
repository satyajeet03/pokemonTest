export async function getPokemonList() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=51');  
    const data = await response.json(); 
    const detailedPokemon = await Promise.all(data.results.map(async (pokemon, index) => {
      const detailsResponse = await fetch(pokemon.url);
      const details = await detailsResponse.json();
      return {
        id: details.id,
        name: details.name,
        types: details.types.map(t => t.type.name),
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${details.id}.png` 
      };
    }));
  
    return detailedPokemon;
  }
  
  export async function getPokemonTypes() {
    const response = await fetch('https://pokeapi.co/api/v2/type');
    const data = await response.json();
    return data.results.map(type => type.name);
  }
  
  export async function getPokemonDetails(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const details = await response.json();
    return {
      id: details.id,
      name: details.name,
      types: details.types.map(t => t.type.name),
      height: details.height,
      weight: details.weight,
      abilities: details.abilities.map(a => a.ability.name),
      moves: details.moves.map(m => m.move.name),
      stats: details.stats.map(s => ({ name: s.stat.name, value: s.base_stat })),
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${details.id}.png`  
    };
  }
  