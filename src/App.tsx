import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PokemonList from './Page/PokemonList';
import PokemonDetails from './Page/PokemonDetails';
import { useEffect, useState } from 'react';
import { IPokemonProps } from './Component/IPokemon';
import { IPokemonDetailsProps } from './Component/IPokemonDetails';
import axios from 'axios';


function App() {
  const [pokemonList, setPokemonList] = useState<IPokemonProps[]>([]);
  const [ pokemonDetails, setPokemonDetails ] = useState<IPokemonDetailsProps[]>([]);

  useEffect(() => {
      const fetchData = async () => {
          const response = await axios.get("https://pokeapi.co/api/v2/pokemon/");
          const { results } = await response.data;
          setPokemonList(results);
      }
      fetchData();
  }, []);

  useEffect(() => {
      const fetchPokemonDetails = async () => {
          const details = await Promise.all(pokemonList.map(async (pokemon: { url: string; }) => {
              const response = await axios.get(pokemon.url);
              const { name, id, weight, height, moves, sprites } = response.data;
              const sprite = sprites.front_default;
              const official = sprites.other['official-artwork']['front_default'];
              return { official, name, id, weight, height, moves, sprite };
          }))
          setPokemonDetails(details);
      }
      fetchPokemonDetails();
  }, [pokemonList]);
  
  console.log("pokemon list: ", pokemonList)
  console.log("pokemon details: ", pokemonDetails)

  const router = createBrowserRouter([
    {
      path:"/",
      element:<PokemonList pokemonDetails={pokemonDetails}/>
    },
    {
      path:"Details/:id",
      element:<PokemonDetails pokemonDetails={pokemonDetails}/>
    }
  ])

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
