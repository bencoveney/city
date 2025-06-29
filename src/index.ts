import * as Domain from "./domain";
import "./index.css";
import { render } from "./render";

import { drawTable } from "./table";

window.addEventListener("load", () => {
  const domain = Domain.init();
  const rendered = render(domain);
  drawTable(rendered);
});
