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
  const [ API, setAPI ] = useState<string | undefined>(process.env.REACT_APP_BASE_URL);

  useEffect(() => {
      const fetchData = async () => {
        try {
          if(API){
            const response = await axios.get(API);
            const { results } = await response.data;
            setPokemonList(results);
          }
        } catch (error) {
          console.log("Error fetching data: ", error);
        }
      }
      fetchData();
  }, [API]);

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

  const router = createBrowserRouter([
    {
      path:"/",
      element:<PokemonList pokemonDetails={pokemonDetails}/>
    },
    {
      path:"Details/:ID",
      element:<PokemonDetails/>
    }
  ])

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
