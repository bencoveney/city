import * as Array2d from "./array2d";

export enum Terrain {
  Grass = 0,
}

export type Domain = {
  terrain: Array2d.Array2d<Terrain>;
};

export function init(): Domain {
  return {
    terrain: Array2d.init(15, 12, Terrain.Grass),
  };
}
