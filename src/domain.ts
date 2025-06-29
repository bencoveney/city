import Array2d from "./array2d";
import Rect from "./rect";

interface Domain {
  bounds: Rect;
  terrain: Array2d<Domain.Terrain>;
  buildings: Domain.Building[];
}

namespace Domain {
  export enum Terrain {
    Grass = 0,
  }

  export type Building = Rect;

  export function init(): Domain {
    const numBuildings = 3;
    const width = 15;
    const height = 12;
    const bounds: Rect = { x: 0, y: 0, width, height };
    const result: Domain = {
      bounds,
      terrain: Array2d.init(15, 12, Terrain.Grass),
      buildings: [],
    };
    for (let i = 0; i < numBuildings; i++) {
      placeBuilding(result);
    }
    console.log(result);
    return result;
  }

  export function placeBuilding(domain: Domain) {
    const maxAttempts = 25;
    for (let i = 0; i < maxAttempts; i++) {
      const width = Math.floor(Math.random() * 3 + 3);
      const height = Math.floor(Math.random() * 3 + 3);
      const possibleX = domain.bounds.width - width + 1;
      const possibleY = domain.bounds.height - height + 1;
      const x = Math.floor(Math.random() * possibleX);
      const y = Math.floor(Math.random() * possibleY);
      const rect: Rect = { x, y, width, height };
      const canPlace = domain.buildings.every(
        (other) => !Rect.isOverlap(other, rect)
      );
      if (!canPlace) {
        continue;
      }
      domain.buildings.push(rect);
      return;
    }
    throw new Error(`Failed to place building after ${maxAttempts} attempts`);
  }
}

export default Domain;
