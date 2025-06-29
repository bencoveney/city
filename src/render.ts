import * as Array2d from "./array2d";
import { Domain, Terrain } from "./domain";
import { isOnBoundary } from "./rect";
import classes from "./render.module.css";

export type RenderCell = {
  className: string;
  content: string;
};

export type Render = Array2d.Array2d<RenderCell>;

export function render(domain: Domain): Render {
  const render = Array2d.init<RenderCell>(
    domain.bounds.width,
    domain.bounds.height,
    null
  );
  for (let x = 0; x < domain.bounds.width; x++) {
    for (let y = 0; y < domain.bounds.height; y++) {
      const index = Array2d.getIndex(render, x, y);
      const terrain = Array2d.atIndex(domain.terrain, index);
      const cell: RenderCell = { className: "", content: `(${x},${y})` };
      switch (terrain) {
        case Terrain.Grass:
          cell.className = classes.grass;
          break;
      }
      render.data[index] = cell;
    }
  }
  for (
    let buildingIndex = 0;
    buildingIndex < domain.buildings.length;
    buildingIndex++
  ) {
    const building = domain.buildings[buildingIndex];
    for (let x = building.x; x < building.x + building.width; x++) {
      for (let y = building.y; y < building.y + building.height; y++) {
        const index = Array2d.getIndex(render, x, y);
        const cell = render.data[index];
        cell.className = isOnBoundary(building, x, y)
          ? classes.wall
          : classes.floor;
        cell.content += `\n${buildingIndex} ${building.width}X${building.height}`;
      }
    }
  }
  return render;
}
