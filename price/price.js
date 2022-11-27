let table = document.getElementById('table');
let tbody = document.getElementById('table-body');

let tableData = [
  new Row('Маникюр', 2200, 1),
  new Row('Педикюр', 2500, 1),
  new Row('Наращивание', 1500, 1),
  new Row('Укрепление', 300, 1),
  new Row('Дизайн (френч, фольга, слайдеры, градиент, стемпинг)', 200, 10),
  new Row('Ремонт', 100, 10),
];

function get_button(text, foo) {
  let button = document.createElement('button');
  button.innerHTML = text;
  button.classList.add('btn');
  button.onclick = foo;
  return button;
}

function Row(name, price, maxCount)
{
  this.name = name;
  this.price = price;
  this.count = 0;
  this.max = maxCount;
  this.get_total = function () {
    return this.price * this.count;
  }
  this.inc = function () {
    console.log('inc!');
    this.count++;
    fillTable();
  }
  this.dec = function () {
    console.log('dec!');
    this.count--;
    fillTable();
  }
  this.addToTable = function (ind, tbody) {
    let newRow = tbody.insertRow();

    newRow.insertCell().appendChild(document.createTextNode(this.name));

    newRow.insertCell().appendChild(document.createTextNode(this.price + '₽'));

    let countNode = newRow.insertCell();
    let buttonDec = get_button('-', () => tableData[ind].dec());
    buttonDec.classList.add('me-1');
    if (this.count == 0)
    {
      buttonDec.disabled = true;
    }
    countNode.appendChild(buttonDec);

    let output = document.createElement('output');
    output.innerHTML = this.count;
    countNode.appendChild(output);

    let buttonInc = get_button('+', () => tableData[ind].inc());
    buttonInc.classList.add('ms-1');
    if (this.count >= this.max)
    {
      buttonInc.disabled = true;
    }
    countNode.appendChild(buttonInc);

    newRow.insertCell().appendChild(document.createTextNode(this.get_total() + '₽'));
  }
}

console.log(tbody);

function clearTable() {
  let rowsCount = table.rows.length;
  for (let i = rowsCount - 1; i > 0; i--) {
    let row = table.rows[i];
    console.log(row);
    tbody.removeChild(row);
  }
}

function fillTable() {
  clearTable();
  let resultPrice = 0;
  for (let i = 0; i < tableData.length; i++)
  {
    let row = tableData[i];
    row.addToTable(i, tbody);
    resultPrice += row.get_total();
  }
  let newRow = tbody.insertRow();
  newRow.insertCell().appendChild(document.createTextNode('Итоговая стоимость:'));
  newRow.insertCell();
  newRow.insertCell();
  newRow.insertCell().appendChild(document.createTextNode(resultPrice + '₽'));
}

fillTable();
