export type fighterType = {
    _id: string;
    name: string;
    health: number;
    attack: number;
    defense: number;
    source: string;
  }

export type twoFighters = [fighterType, fighterType];