import Domain from "./domain";
import "./index.css";
import Render from "./render";
import Table from "./table";

window.addEventListener("load", () => {
  const domain = Domain.init();
  const rendered = Render.render(domain);
  Table.drawTable(rendered);
});
