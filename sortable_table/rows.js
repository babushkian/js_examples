export class Row {
  constructor($tbody, row_data, index) {
    this.$tbody = $tbody;
    // создаем атрибуты класса из полей объекта
    this.dataObj = row_data;
    this.index = index;
    this.row = this.create_row();
  }
  create_row() {
    const row = document.createElement("tr");
    row.dataset.id = this.index;

    Object.keys(this.dataObj).forEach((element) => {
      const a = document.createElement("td");
      a.innerText = this.dataObj[element];
      row.appendChild(a);
    });
    return row;
  }
}
