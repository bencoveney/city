import Array2d from "./array2d";
import Rect from "./rect";
import Zone from "./zone";

interface Domain {
  bounds: Rect;
  terrain: Array2d<Domain.Terrain>;
  zones: Zone[];
}

namespace Domain {
  export enum Terrain {
    Grass = 0,
  }

  export type Building = Rect;

  const numBuildings = 3;
  const width = 45;
  const height = 22;
  export function init(): Domain {
    const bounds: Rect = { x: 0, y: 0, width, height };
    const domain: Domain = {
      bounds,
      terrain: Array2d.init(width, height, Terrain.Grass),
      zones: [],
    };
    domain.zones.push({
      x: 0,
      y: 0,
      width: 5,
      height: 5,
      type: Zone.Type.Square,
    });
    for (let i = 0; i < numBuildings; i++) {
      Zone.createRandomZone(domain, 3, 6, Zone.Type.Building);
    }
    console.log(domain);
    return domain;
  }
}

export default Domain;
