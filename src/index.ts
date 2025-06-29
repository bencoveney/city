import * as Domain from "./domain";
import "./index.css";

import { drawTable } from "./table";

window.addEventListener("load", () => {
  const domain = Domain.init();
  drawTable(domain);
});
