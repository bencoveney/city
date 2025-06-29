(() => {
  // src/table.module.css
  var table_default = {
    table: "table_table",
    cell: "table_cell"
  };

  // src/table.ts
  function drawTable(rows, cols) {
    const table = document.createElement("table");
    table.classList.add(table_default.table);
    for (let row = 0; row < rows; row++) {
      const row2 = document.createElement("tr");
      for (let col = 0; col < cols; col++) {
        const cell = document.createElement("td");
        cell.classList.add(table_default.cell);
        cell.innerText = "hello";
        row2.appendChild(cell);
      }
      table.appendChild(row2);
    }
    document.body.appendChild(table);
  }

  // src/index.ts
  window.addEventListener("load", () => {
    drawTable(10, 10);
  });
})();
