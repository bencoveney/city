(() => {
  // src/array2d.ts
  var Array2d;
  ((Array2d2) => {
    function init(width, height, fill = void 0) {
      return {
        width,
        height,
        data: new Array(width * height).fill(fill)
      };
    }
    Array2d2.init = init;
    function atIndex(arr, index) {
      return arr.data[index];
    }
    Array2d2.atIndex = atIndex;
    function atXY(arr, x, y) {
      return atIndex(arr, getIndex(arr, x, y));
    }
    Array2d2.atXY = atXY;
    function getIndex(arr, x, y) {
      return y * arr.width + x;
    }
    Array2d2.getIndex = getIndex;
    function getX(arr, index) {
      return index * arr.width;
    }
    Array2d2.getX = getX;
    function getY(arr, index) {
      return (index - getX(arr, index)) % arr.width;
    }
    Array2d2.getY = getY;
  })(Array2d || (Array2d = {}));
  var array2d_default = Array2d;

  // src/rect.ts
  var Rect;
  ((Rect2) => {
    function leftX(rect) {
      return rect.x;
    }
    function rightX(rect) {
      return rect.x + rect.width - 1;
    }
    function topY(rect) {
      return rect.y + rect.height - 1;
    }
    function bottomY(rect) {
      return rect.y;
    }
    function isWithinBounds(outer, inner) {
      return leftX(inner) >= leftX(outer) && bottomY(inner) >= bottomY(outer) && rightX(inner) <= rightX(outer) && topY(inner) <= topY(outer);
    }
    Rect2.isWithinBounds = isWithinBounds;
    function isOverlap(a, b) {
      return leftX(a) <= rightX(b) && bottomY(a) <= topY(b) && rightX(a) >= leftX(b) && topY(a) >= bottomY(b);
    }
    Rect2.isOverlap = isOverlap;
    function isOnBoundary(rect, x, y) {
      return x === leftX(rect) || x === rightX(rect) || y === bottomY(rect) || y === topY(rect);
    }
    Rect2.isOnBoundary = isOnBoundary;
  })(Rect || (Rect = {}));
  var rect_default = Rect;

  // src/domain.ts
  var Domain;
  ((Domain2) => {
    let Terrain;
    ((Terrain2) => {
      Terrain2[Terrain2["Grass"] = 0] = "Grass";
    })(Terrain = Domain2.Terrain || (Domain2.Terrain = {}));
    const numBuildings = 3;
    const width = 45;
    const height = 22;
    function init() {
      const bounds = { x: 0, y: 0, width, height };
      const result = {
        bounds,
        terrain: array2d_default.init(width, height, 0 /* Grass */),
        buildings: []
      };
      for (let i = 0; i < numBuildings; i++) {
        placeBuilding(result);
      }
      console.log(result);
      return result;
    }
    Domain2.init = init;
    const maxAttempts = 25;
    const buildingSize = 3;
    const buildingVariance = 3;
    function placeBuilding(domain) {
      for (let i = 0; i < maxAttempts; i++) {
        const width2 = Math.floor(Math.random() * buildingVariance + buildingSize);
        const height2 = Math.floor(
          Math.random() * buildingVariance + buildingSize
        );
        const possibleX = domain.bounds.width - width2 + 1;
        const possibleY = domain.bounds.height - height2 + 1;
        const x = Math.floor(Math.random() * possibleX);
        const y = Math.floor(Math.random() * possibleY);
        const rect = { x, y, width: width2, height: height2 };
        const canPlace = domain.buildings.every(
          (other) => !rect_default.isOverlap(other, rect)
        );
        if (!canPlace) {
          continue;
        }
        domain.buildings.push(rect);
        return;
      }
      throw new Error(`Failed to place building after ${maxAttempts} attempts`);
    }
    Domain2.placeBuilding = placeBuilding;
  })(Domain || (Domain = {}));
  var domain_default = Domain;

  // src/render.module.css
  var render_default = {
    grass: "render_grass",
    wall: "render_wall",
    floor: "render_floor"
  };

  // src/render.ts
  var Render;
  ((Render2) => {
    function render(domain) {
      const render2 = array2d_default.init(
        domain.bounds.width,
        domain.bounds.height,
        null
      );
      for (let x = 0; x < domain.bounds.width; x++) {
        for (let y = 0; y < domain.bounds.height; y++) {
          const index = array2d_default.getIndex(render2, x, y);
          const terrain = array2d_default.atIndex(domain.terrain, index);
          const cell = {
            className: "",
            content: `${x},${y}`,
            metadata: ""
          };
          switch (terrain) {
            case domain_default.Terrain.Grass:
              cell.className = render_default.grass;
              break;
          }
          render2.data[index] = cell;
        }
      }
      for (let buildingIndex = 0; buildingIndex < domain.buildings.length; buildingIndex++) {
        const building = domain.buildings[buildingIndex];
        for (let x = building.x; x < building.x + building.width; x++) {
          for (let y = building.y; y < building.y + building.height; y++) {
            const index = array2d_default.getIndex(render2, x, y);
            const cell = render2.data[index];
            cell.className = rect_default.isOnBoundary(building, x, y) ? render_default.wall : render_default.floor;
            cell.metadata += `${buildingIndex} ${building.width}X${building.height}`;
          }
        }
      }
      return render2;
    }
    Render2.render = render;
  })(Render || (Render = {}));
  var render_default2 = Render;

  // src/table.module.css
  var table_default = {
    table: "table_table",
    cell: "table_cell"
  };

  // src/table.ts
  var Table;
  ((Table2) => {
    function drawTable(render) {
      const table = document.createElement("table");
      table.classList.add(table_default.table);
      for (let rowIndex = render.height - 1; rowIndex >= 0; rowIndex--) {
        const row = document.createElement("tr");
        for (let colIndex = 0; colIndex < render.width; colIndex++) {
          const cell = document.createElement("td");
          cell.classList.add(table_default.cell);
          const cellContent = array2d_default.atXY(render, colIndex, rowIndex);
          cell.classList.add(cellContent.className);
          cell.innerHTML = cellContent.content.replaceAll("\n", "<br />");
          cell.title = cellContent.metadata;
          row.appendChild(cell);
        }
        table.appendChild(row);
      }
      document.body.appendChild(table);
    }
    Table2.drawTable = drawTable;
  })(Table || (Table = {}));
  var table_default2 = Table;

  // src/index.ts
  window.addEventListener("load", () => {
    const domain = domain_default.init();
    const rendered = render_default2.render(domain);
    table_default2.drawTable(rendered);
  });
})();
