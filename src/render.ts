import Array2d from "./array2d";
import Domain from "./domain";
import Rect from "./rect";
import classes from "./render.module.css";
import Zone from "./zone";

interface Render extends Array2d<Render.RenderCell> {}

namespace Render {
  export type RenderCell = {
    className: string;
    content: string;
    metadata: string;
  };

  export function render(domain: Domain): Render {
    const render = Array2d.init<RenderCell>(
      domain.bounds.width,
      domain.bounds.height,
      null
    );
    renderTerrain(domain, render);
    renderZones(domain, render);
    return render;
  }

  function renderTerrain(domain: Domain, render: Render) {
    for (let x = 0; x < domain.bounds.width; x++) {
      for (let y = 0; y < domain.bounds.height; y++) {
        const index = Array2d.getIndex(render, x, y);
        const terrain = Array2d.atIndex(domain.terrain, index);
        const cell: RenderCell = {
          className: "",
          content: `${x},${y}`,
          metadata: "",
        };
        switch (terrain) {
          case Domain.Terrain.Grass:
            cell.className = classes.terrainGrass;
            break;
        }
        render.data[index] = cell;
      }
    }
  }

  function renderZones(domain: Domain, render: Render) {
    for (let zoneIndex = 0; zoneIndex < domain.zones.length; zoneIndex++) {
      const zone = domain.zones[zoneIndex];
      for (let x = zone.x; x < zone.x + zone.width; x++) {
        for (let y = zone.y; y < zone.y + zone.height; y++) {
          const index = Array2d.getIndex(render, x, y);
          const cell = render.data[index];
          cell.className = zoneClass(zone, x, y);
          cell.metadata += `${zoneIndex} ${zone.width}X${zone.height}`;
        }
      }
    }
  }

  function zoneClass(zone: Zone, x: number, y: number): string {
    switch (zone.type) {
      case Zone.Type.Building:
        return Rect.isOnBoundary(zone, x, y)
          ? classes.zoneWall
          : classes.zoneFloor;
      case Zone.Type.Square:
        return classes.zoneSquare;
      default:
        throw new Error("Unknown zone");
    }
  }
}

export default Render;
