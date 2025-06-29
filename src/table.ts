import classes from "./table.module.css";

export function drawTable(rows: number, cols: number) {
  const table = document.createElement("table");
  table.classList.add(classes.table);
  for (let row = 0; row < rows; row++) {
    const row = document.createElement("tr");
    for (let col = 0; col < cols; col++) {
      const cell = document.createElement("td");
      cell.classList.add(classes.cell);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  document.body.appendChild(table);
}
