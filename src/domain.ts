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

  const numBuildings = 3;
  const width = 45;
  const height = 22;
  export function init(): Domain {
    const bounds: Rect = { x: 0, y: 0, width, height };
    const result: Domain = {
      bounds,
      terrain: Array2d.init(width, height, Terrain.Grass),
      buildings: [],
    };
    for (let i = 0; i < numBuildings; i++) {
      placeBuilding(result);
    }
    console.log(result);
    return result;
  }

  const maxAttempts = 25;
  const buildingSize = 3;
  const buildingVariance = 3;
  export function placeBuilding(domain: Domain) {
    for (let i = 0; i < maxAttempts; i++) {
      const width = Math.floor(Math.random() * buildingVariance + buildingSize);
      const height = Math.floor(
        Math.random() * buildingVariance + buildingSize
      );
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
