import Domain from "./domain";
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
    size: number,
    variance: number,
    type: Zone.Type
  ) {
    for (let i = 0; i < maxAttempts; i++) {
      const width = Math.floor(Math.random() * variance + size);
      const height = Math.floor(Math.random() * variance + size);
      const possibleX = domain.bounds.width - width + 1;
      const possibleY = domain.bounds.height - height + 1;
      const x = Math.floor(Math.random() * possibleX);
      const y = Math.floor(Math.random() * possibleY);
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
