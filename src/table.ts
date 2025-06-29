import { Domain, Terrain } from "./domain";
import classes from "./table.module.css";
import * as Array2d from "./array2d";

export function drawTable(domain: Domain) {
  const table = document.createElement("table");
  table.classList.add(classes.table);
  for (let rowIndex = 0; rowIndex < domain.terrain.height; rowIndex++) {
    const row = document.createElement("tr");
    for (let colIndex = 0; colIndex < domain.terrain.width; colIndex++) {
      const cell = document.createElement("td");
      cell.classList.add(classes.cell);
      const terrain = Array2d.atXY(domain.terrain, colIndex, rowIndex);
      switch (terrain) {
        case Terrain.Grass:
          cell.classList.add(classes.terrainGrass);
          break;
      }
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  document.body.appendChild(table);
}
