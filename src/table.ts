import classes from "./table.module.css";
import Array2d from "./array2d";
import Render from "./render";

namespace Table {
  export function drawTable(render: Render) {
    const table = document.createElement("table");
    table.classList.add(classes.table);
    for (let rowIndex = render.height - 1; rowIndex >= 0; rowIndex--) {
      const row = document.createElement("tr");
      for (let colIndex = 0; colIndex < render.width; colIndex++) {
        const cell = document.createElement("td");
        cell.classList.add(classes.cell);
        const cellContent = Array2d.atXY(render, colIndex, rowIndex);
        cell.classList.add(cellContent.className);
        cell.innerHTML = cellContent.content.replaceAll("\n", "<br />");
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
    document.body.appendChild(table);
  }
}

export default Table;
