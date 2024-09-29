export const getStatColor = (statName: string) => {
    switch (statName) {
        case 'hp':
            return 'bg-red-500';
        case 'attack':
            return 'bg-blue-500';
        case 'defense':
            return 'bg-purple-500';
        case 'special-attack':
            return 'bg-orange-500';
        case 'special-defense':
            return 'bg-yellow-500';
        case 'speed':
            return 'bg-green-500';
        default:
            return 'bg-gray-500';
    }
};