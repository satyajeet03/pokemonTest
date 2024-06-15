import Link from 'next/link'; 
export default function PokemonCard({ pokemon }) {
  return (
    <div className="w-full p-4" >
    <Link href={`/${pokemon.name}`}>
      <div className="block bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
        <div className="p-4">
          <img className="mx-auto w-32 h-32" src={pokemon.image} alt={pokemon.name} />
          <h2 className="text-xl font-bold capitalize text-center mt-4">{pokemon.name}</h2>
        </div>
        <div className="bg-gray-100 p-4">
        <span className="font-bold">Type:</span> {pokemon.types.join(', ')}
        </div>
      </div>
    </Link>
  </div>
  );
}
