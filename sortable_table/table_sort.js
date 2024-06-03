import { Table } from "./table.js";
// mouseover / mouseout
("use strict");
const $table = document.querySelector("table");
const $theader = $table.querySelectorAll("thead tr th");
const $rows = $table.querySelectorAll("tbody tr");

const $root = document.querySelector(".section");
const headerItems = Array.from($theader);

const headerArray = headerItems.map((item) => {
  return item.textContent;
});

function get_table_data($rows, headerArray) {
  let tobj = [];
  $rows.forEach((item) => {
    const data = Array.from(item.querySelectorAll("td span"));
    const cells = data.map((item) => item.innerText);
    let o = {};
    headerArray.forEach((name, index) => {
      o[name] = cells[index];
    });

    tobj = [...tobj, o];
  });
  return tobj;
}

function get_filters(tableData) {
  const columnSort = {};
  tableData.forEach((row) => {
    for (const [key, value] of Object.entries(row)) {
      if (!columnSort[key]) {
        columnSort[key] = new Set();
      }
      columnSort[key].add(value);
    }
  });
  for (const [key, value] of Object.entries(columnSort)) {
    columnSort[key] = Array.from(value).sort((a, b) => {
      if (a > b) return 1;
    });
  }
  return columnSort;
}

const tableData = get_table_data($rows, headerArray);
const filters = get_filters(tableData);

$table.remove();

const t = new Table($root, headerArray, filters, tableData);
console.log(t);
