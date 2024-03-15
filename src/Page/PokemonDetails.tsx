import { Box, Card, CardContent, Typography } from "@mui/material";
import { IPokemonDetailsProps } from "../Component/IPokemonDetails";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PokemonDetails = () => {
  const [pokemonDetails, setPokemonDetails] = useState<IPokemonDetailsProps>();
  const { ID } = useParams<string>();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}${ID}`
        );
        const { name, id, weight, height, moves, sprites } = response.data;
        const sprite = sprites.front_default;
        const official = sprites.other["official-artwork"]["front_default"];
        setPokemonDetails({
          official,
          name,
          id,
          weight,
          height,
          moves,
          sprite,
        });
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    fetchPokemonDetails();
  }, []);

  const formatID = (num: number) => {
    return num.toString().padStart(4, "0");
  };

  if (!pokemonDetails) {
    return (
      <Card>
        <CardContent>
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Typography variant="h2">Pokemon Not Found!</Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  const formattedID = formatID(pokemonDetails.id);

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Typography variant="h2" textTransform={"uppercase"} gutterBottom>
        {pokemonDetails?.name}
      </Typography>
      <Box display={"flex"} gap={"50px"}>
        <Box display={"flex"} flexDirection={"column"} gap={"50px"}>
          <Card sx={{ width: "100%" }}>
            <img src={pokemonDetails?.official} alt={pokemonDetails?.name} />
          </Card>
          <Card sx={{ width: "100%" }}>
            <img
              src={pokemonDetails?.sprite}
              alt={pokemonDetails?.name}
              width="100%"
            />
          </Card>
        </Box>
        <Card sx={{ width: "300px" }}>
          <CardContent>
            <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
              <Typography>Pokedex ID: #{formattedID}</Typography>
              <Typography>Height: {pokemonDetails.height}</Typography>
              <Typography>Weight: {pokemonDetails.weight}</Typography>
              <Typography>Move:</Typography>
              {pokemonDetails.moves.map((move, index) => (
                <Card>
                  <Typography>{move.move.name}</Typography>
                </Card>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default PokemonDetails;
