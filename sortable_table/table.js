function filter_table_data(e) {
  alert("atata", e);
}
import { Row } from "./rows.js";
import { HeaderFilter } from "./header_filters.js";

export class Table {
  constructor($root, headData, filters, tableData) {
    this.$root = $root;
    this.headData = headData;
    this.tableData = tableData;
    console.log(headData);
    console.log(tableData);

    this.filters = filters;
    this.create_table();
  }

  make_header_cell(columnName, columnFilter) {
    const thd = document.createElement("th");
    const div = document.createElement("div");
    thd.appendChild(div);

    const sel = document.createElement("select");
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.innerText = "---";
    sel.appendChild(defaultOption);
    div.appendChild(sel);
    columnFilter.forEach((element, index) => {
      const opt = document.createElement("option");
      opt.value = index;
      opt.innerText = element;
      sel.appendChild(opt);
    });

    sel.addEventListener("change", filter_table_data);
    const htext = document.createElement("span");
    htext.innerText = columnName;
    div.appendChild(htext);
    return thd;
  }

  create_table() {
    this.$table = document.createElement("table");
    this.$root.appendChild(this.$table);
    // ее заголовок
    this.thead = document.createElement("thead");
    this.$table.appendChild(this.thead);
    const headerRow = document.createElement("tr");
    this.thead.appendChild(headerRow);

    // надписи в заголовке
    this.headData.forEach((el) => {
      const cell = this.make_header_cell(el, this.filters[el]);
      headerRow.appendChild(cell);
    });
    // данные
    this.$tbody = document.createElement("tbody");
    this.$table.appendChild(this.$tbody);

    this.rows = this.tableData.map(
      (element, index) => new Row(this.$tbody, element, index)
    );
    console.log("tbody", this.$tbody);
    this.rows.forEach((row) => {
      this.$tbody.appendChild(row.row);
    });
  }
}
