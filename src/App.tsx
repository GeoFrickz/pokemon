import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PokemonList from "./Page/PokemonList";
import PokemonDetails from "./Page/PokemonDetails";
import { useEffect, useState } from "react";
import { IPokemonProps } from "./Component/IPokemon";
import { IPokemonDetailsProps } from "./Component/IPokemonDetails";
import axios from "axios";

function App() {
  const [pokemonList, setPokemonList] = useState<IPokemonProps[]>([]);
  const [pokemonDetails, setPokemonDetails] = useState<IPokemonDetailsProps[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_BASE_URL!);
        const { results } = await response.data;
        setPokemonList(results);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const details = await Promise.all(
        pokemonList.map(async (pokemon: { url: string }) => {
          const response = await axios.get(pokemon.url);
          const { name, id, weight, height, moves, sprites } = response.data;
          const sprite = sprites.front_default;
          const official = sprites.other["official-artwork"]["front_default"];
          return { official, name, id, weight, height, moves, sprite };
        })
      );
      setPokemonDetails(details);
    };
    fetchPokemonDetails();
  }, [pokemonList]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PokemonList pokemonDetails={pokemonDetails} />,
    },
    {
      path: "Details/:ID",
      element: <PokemonDetails />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
