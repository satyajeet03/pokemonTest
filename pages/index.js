// import { useState, useEffect } from 'react';
// import PokemonCard from '../components/PokemonCard';
// import { getPokemonTypes, getPokemonList, getPokemonDetails } from '../hooks/usePokemon';

// export default function Home() {
//   const [types, setTypes] = useState([]);
//   const [pokemon, setPokemon] = useState([]);
//   const [filteredPokemon, setFilteredPokemon] = useState([]);
//   const [type, setType] = useState('');
//   const [search, setSearch] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const typesData = await getPokemonTypes();
//         console.log('Types:', typesData);
//         setTypes(typesData);

//         const pokemonData = await getPokemonList();
//         console.log('Pokemon:', pokemonData);
//         setPokemon(pokemonData);
//         setFilteredPokemon(pokemonData); // Initialize filtered list with all Pokémon
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   useEffect(() => {
//     async function fetchFilteredPokemon() {
//       let filtered = pokemon;

//       if (type) {
//         filtered = filtered.filter(p => p.types.includes(type));
//       }

//       if (search) {
//         filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase())); 
//       }

//       console.log('Filtered Pokemon:', filtered); 
//       const detailedPokemon = await Promise.all(filtered.map(async p => {
//         const details = await getPokemonDetails(p.name);  
//         return { ...p, image: details.image }; 
//       }));

//       setFilteredPokemon(detailedPokemon);
//     }

//     fetchFilteredPokemon();
//   }, [type, search, pokemon]);

//   const handleTypeChange = (event) => {
//     setType(event.target.value);
//   };

//   const handleSearchChange = (event) => {
//     setSearch(event.target.value);
//   };

//   if (loading) {
//    return (
//    <div className="loader-container">
//    <div className="loader"></div>
//  </div>
//  )
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className="mb-4 inputBox"  >
//         <select
//           value={type}
//           onChange={handleTypeChange}
//           className="mr-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//         >
//           <option value="">All Types</option>
//           {types.map(t => (
//             <option key={t} value={t}>{t}</option>
//           ))}
//         </select>
//         <input
//           type="text"
//           placeholder="Search your favourite"
//           value={search}
//           onChange={handleSearchChange}
//           className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//         />
//       </div>
//       <div className="container mx-auto p-4">
//       <div className="grid sm:grid-cols-12 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 xs:grid-cols-12 gap-2">
//         {filteredPokemon.length > 0 ? (
//           filteredPokemon.map(p => (
            
//            <div class="flex flex-row">
//             <PokemonCard key={p.name} pokemon={p} />
//          </div>
            
//           ))
//         ) : (
//           <p className="text-center font-bold">No Pokémon found.</p>
//         )}
//       </div>
//       </div>
//     </div>

    
//   );
// }


import { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumb from '../components/Breadcrumb';
import PokemonCard from '../components/PokemonCard';
import { getPokemonTypes, getPokemonList, getPokemonDetails } from '../hooks/usePokemon';

export default function Home() {
  const [types, setTypes] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [type, setType] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const typesData = await getPokemonTypes();
        setTypes(typesData);

        const pokemonData = await getPokemonList();
        setPokemon(pokemonData);
        setFilteredPokemon(pokemonData);  
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchFilteredPokemon() {
      let filtered = pokemon;

      if (type) {
        filtered = filtered.filter(p => p.types.includes(type));  
      }

      if (search) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase())); 
      }
 
      const detailedPokemon = await Promise.all(filtered.map(async p => {
        const details = await getPokemonDetails(p.name);  
        return { ...p, image: details.image };  
      }));

      setFilteredPokemon(detailedPokemon);
    }

    if (pokemon.length > 0) {
      fetchFilteredPokemon();
    }
  }, [type, search, pokemon]);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 inputBox">
        <select
          value={type}
          onChange={handleTypeChange}
          className="mr-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="">All Types</option>
          {types.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search your favourite"
          value={search}
          onChange={handleSearchChange}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
      <div className="container mx-auto p-4">
        <div className="grid sm:grid-cols-12 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 xs:grid-cols-12 gap-2">
          {filteredPokemon.length > 0 ? (
            filteredPokemon.map(p => (
              <div className="flex flex-row">
                <PokemonCard key={p.name} pokemon={p} />
              </div>
            ))
          ) : (
            <p className="text-center font-bold">No Pokémon found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
