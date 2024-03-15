import axios from "axios";

export const getPokemonList = async () => {
    try {
        const response = await axios.get(process.env.REACT_APP_BASE_URL!);
        const { results } = await response.data;
        return results;
    } catch (error) {
        console.log("Error fetching data: ", error);
    }
};

export const getPokemonDetails = async (url: string) => {
    try {
        const response = await axios.get(url);
        const { name, id, weight, height, moves, sprites } = response.data;
        const sprite = sprites.front_default;
        const official = sprites.other["official-artwork"]["front_default"];
        const results = { official, name, id, weight, height, moves, sprite }
        return results;
    } catch (error) {
        console.log("Error fetching data:", error);
    };
};

export const fetchOnePokemonDetails = async (ID: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}${ID}`
      );
      const { name, id, weight, height, moves, sprites } = response.data;
      const sprite = sprites.front_default;
      const official = sprites.other["official-artwork"]["front_default"];
      const results = { official, name, id, weight, height, moves, sprite };
      return results;
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };