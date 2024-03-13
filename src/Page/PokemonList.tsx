import { Box, Button, Card, CardContent, Tooltip, Typography } from "@mui/material";
import { IPokemonProps } from "../Component/IPokemon";
import { IPokemonDetailsProps } from "../Component/IPokemonDetails";
import { Link } from "react-router-dom";

const PokemonList = ({ pokemonDetails }: { pokemonDetails: IPokemonDetailsProps[] }) => {

    return(
        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
            <Typography variant="h2" gutterBottom>List Pokemon</Typography>
            <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} justifyContent={"center"} alignItems={"center"} gap={"50px"}>
                {pokemonDetails?.map((pokemon, index) => (
                    <Card>
                        <CardContent>
                            <Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"} gap={"10px"}>
                                <Card>
                                    <img src={pokemon.official} alt={pokemon.name} width="250px"/>
                                </Card>
                                <Card sx={{width: '100%'}}>
                                    <Tooltip title="See pokemon details" arrow>
                                        <Link to={`Details/${pokemon.id}`} style={{textDecoration: "none"}}>
                                            <Button variant="outlined" sx={{width: '100%'}}>
                                                <Typography variant="h5" style={{textTransform: 'uppercase'}} textAlign={"center"} gutterBottom>
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
}

export default PokemonList