export interface PokemonRequestListResult {
    name: string;
    url: string;
}

export interface PokemonRequestType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string; 
  };
}

export interface PokemonRequestDetail {
    id: number;
    name: string;
    sprites: {
      front_default: string;
      other: {
        showdown: {
          front_default: string;
        };
      };
    };
    types: PokemonRequestType[];
    stats: PokemonStat[];
  }