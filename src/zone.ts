import Domain from "./domain";
import Random from "./random";
import Rect from "./rect";

interface Zone extends Rect {
  type: Zone.Type;
}

namespace Zone {
  export enum Type {
    Building = 0,
    Square = 1,
  }

  const maxAttempts = 25;
  export function createRandomZone(
    domain: Domain,
    sizeFrom: number,
    sizeTo: number,
    type: Zone.Type
  ) {
    for (let i = 0; i < maxAttempts; i++) {
      const width = Random.intBetween(sizeFrom, sizeTo);
      const height = Random.intBetween(sizeFrom, sizeTo);
      const possibleX = domain.bounds.width - width + 1;
      const possibleY = domain.bounds.height - height + 1;
      const x = Random.intBetween(0, possibleX);
      const y = Random.intBetween(0, possibleY);
      const zone: Zone = { x, y, width, height, type };
      const canPlace = domain.zones.every(
        (other) => !Rect.isOverlap(other, zone)
      );
      if (!canPlace) {
        continue;
      }
      domain.zones.push(zone);
      return;
    }
    throw new Error(`Failed to place building after ${maxAttempts} attempts`);
  }
}

export default Zone;
