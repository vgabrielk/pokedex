import { pokemonTypeData } from "./pokemon-type-data.js";

export const getPokemonTypeImage = (typeName: string) => {
    const type = pokemonTypeData.find(t => t.id === typeName);
    return type ? type.image : '';
};
