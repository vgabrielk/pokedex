export const getEvolutionImage = (evolution: { name: string; id: number }): string => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.id}.png`;
};