import {
  Box,
  Button,
  Card,
  CardContent,
  Tooltip,
  Typography,
} from "@mui/material";
import { IPokemonDetailsProps } from "../Repository/Interface/IPokemonDetails";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getPokemonDetails,
  getPokemonList,
} from "../Repository/RemoteRepository";
import { IPokemonProps } from "../Repository/Interface/IPokemon";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState<IPokemonProps[]>([]);
  const [pokemonDetails, setPokemonDetails] = useState<IPokemonDetailsProps[]>(
    []
  );

  useEffect(() => {
    getPokemonList().then((results) => setPokemonList(results));
  }, []);

  useEffect(() => {
    const getAllPokemon = async () => {
      const detailsPromises = pokemonList.map(async (pokemon) => {
        return await getPokemonDetails(pokemon.url);
      });
      const details = (await Promise.all(detailsPromises)).filter(detail => detail !== undefined) as IPokemonDetailsProps[];
      setPokemonDetails(details);
    };
    getAllPokemon();
  }, [pokemonList]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography variant="h2" gutterBottom>
        List Pokemon
      </Typography>
      <Box
        display={"flex"}
        flexDirection={"row"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"50px"}
      >
        {pokemonDetails?.map((pokemon, index) => (
          <Card>
            <CardContent>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
                gap={"10px"}
              >
                <Card>
                  <img
                    src={pokemon.official}
                    alt={pokemon.name}
                    width="250px"
                  />
                </Card>
                <Card sx={{ width: "100%" }}>
                  <Tooltip title="See pokemon details" arrow>
                    <Link
                      to={`Details/${pokemon.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="outlined" sx={{ width: "100%" }}>
                        <Typography
                          variant="h5"
                          style={{ textTransform: "uppercase" }}
                          textAlign={"center"}
                          gutterBottom
                        >
                          {pokemon.name}
                        </Typography>
                      </Button>
                    </Link>
                  </Tooltip>
                </Card>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default PokemonList;
