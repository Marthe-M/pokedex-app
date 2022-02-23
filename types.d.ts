interface PokemonProps {
    pokemon: PokemonType[]
}

interface NewPokemonProps {
    results: NewPokemonType[]
}


type Stats = {
    attack: number;
    hp: number;
    speed: number;
    defense: number;
}

type Sprites = {
    _typename: string;
    front_default: string;
}

type PokemonType = {
    name: string;
    id: number;
    sprites: Sprites;
    types: Type[];
    evolves_from: Type;
    evolves_to: Type[] | null;
    base_stats: Stats;
    abilities: Type[];
    height: number;
    weight: number;
}


type PokemonNameType = {
    name: string;
}

type NewPokemonType = {
    name: string;
    id: number;
    image: string;
    uniqueId: string;
}

type Type = {
    _typename: string;
    name: string;
}

