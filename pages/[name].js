import { useRouter } from 'next/router';
import Breadcrumb from '../components/Breadcrumb';
import { getPokemonDetails } from '../hooks/usePokemon';
import { useLoading } from '../pages/LoadingContext';
import { useEffect,useState } from 'react';
export default function PokemonDetails({ pokemon }) {
  const router = useRouter();
  const { name } = router.query;
  const { loading, setLoading } = useLoading();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  useEffect(() => {
    setLoading(true);
    async function fetchDetails() {
      try {
        const details = await getPokemonDetails(name);
        setPokemonDetails(details);
       
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      } finally {
        setLoading(false);
      }
    }

    if (name) {
      fetchDetails();
    }
  }, [name, setLoading]);
 
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  } 
  return (
    <div className="container mx-auto p-4">
      <Breadcrumb paths={['Home', name]} />
      <div className="bg-blue-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 max-w-lg mx-auto">
        <div className="block">
          <div className="p-4">
            <img  className="mx-auto w-40 h-40" src={pokemon.image} alt={pokemon.name} />
            <h2 className="text-xl font-bold capitalize text-center mt-4">{pokemon.name}</h2>
          </div>
          <div className="bg-gray-100 p-4">
            <p className="text-sm text-gray-600">
              <span className="font-bold">Type:</span> {pokemon.types.join(', ')}<br />
              <span className="font-bold">Height:</span> {pokemon.height}<br />
              <span className="font-bold">Weight:</span> {pokemon.weight}
            </p>
          </div>
        </div>
        <div className="p-4 flex flex-col md:flex-row md:gap-8">
          <div>
            <h2 className="text-xl font-bold">Abilities</h2>
            <ul className="list-disc ml-4">
              {pokemon.abilities?.map((ability, index) => (
                <li key={index}>{ability}</li>
              )) || 'N/A'}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold">Moves</h2>
            <ul className="list-disc ml-4">
              {pokemon.moves.slice(0, 5).map((move, index) => (
                <li key={index}>{move}</li>
              )) || 'N/A'}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold">Stats</h2>
            <ul className="list-disc ml-4">
              {pokemon.stats?.map((stat, index) => (
                <li key={index}>{stat.name}: {stat.value}</li>
              )) || 'N/A'}
            </ul>
          </div>
        </div>
      </div>

     
    </div>
  );
}

export async function getServerSideProps({ params }) { 
  const pokemon = await getPokemonDetails(params.name);
  return { props: { pokemon } };
}
