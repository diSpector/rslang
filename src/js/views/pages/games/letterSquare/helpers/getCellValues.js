import FillCellsRandomLetters from './randomLetters';

export default function GetCellValues() {
  const table = document.getElementById('myTable');
  for (let r = 0; r < table.rows.length; r += 1) {
    for (let c = 0; c < table.rows[r].cells.length; c += 1) {
      if (table.rows[r].cells[c].innerHTML === '') {
        FillCellsRandomLetters(table.rows[r].cells[c]);
      }
    }
  }
}
