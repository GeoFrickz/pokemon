import { Box, Card, CardContent, Typography } from "@mui/material";
import { IPokemonDetailsProps } from "../Component/IPokemonDetails";
import { useParams } from "react-router-dom";


const PokemonDetails = ({ pokemonDetails }: { pokemonDetails: IPokemonDetailsProps[] }) => {
    
    const { id } = useParams();
    const selectedPokemon = pokemonDetails.find(pokemon => pokemon.id.toString() === id);

    const formatID = (num: number) => {
        return num.toString().padStart(4, '0');
    }

    if (!selectedPokemon) {
        return (
            <Card>
                <CardContent>
                    <Typography variant="h5">Pokemon not found!</Typography>
                </CardContent>
            </Card>
        );
    }

    const formattedID = formatID(selectedPokemon.id);

    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
            <Typography variant="h2" textTransform={"uppercase"} gutterBottom>{selectedPokemon?.name}</Typography>
            <Box display={"flex"} gap={"50px"}>
                <Box display={"flex"} flexDirection={"column"} gap={"50px"}>
                    <Card sx={{width: '100%'}}><img src={selectedPokemon?.official} alt={selectedPokemon?.name}/></Card>
                    <Card sx={{width: '100%'}}><img src={selectedPokemon?.sprite} alt={selectedPokemon?.name} width="100%"/></Card>
                </Box>
                <Card sx={{width: "300px"}}>
                    <CardContent>
                        <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
                            <Typography>Pokedex ID: #{formattedID}</Typography>
                            <Typography>Height: {selectedPokemon.height}</Typography>
                            <Typography>Weight: {selectedPokemon.weight}</Typography>
                            <Typography>Move:</Typography>
                            {selectedPokemon.moves.map((move, index) => (
                                <Card>
                                    <Typography>{move.move.name}</Typography>
                                </Card>
                            ))}
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}

export default PokemonDetails