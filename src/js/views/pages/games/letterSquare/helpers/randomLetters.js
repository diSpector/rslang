export default function FillCellsRandomLetters(cell) {
  const tableCell = cell;
  let cellValue = '';
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  while (cellValue.length < 1) { cellValue += alphabet[Math.random() * alphabet.length | 0]; }
  tableCell.innerHTML = cellValue;
}
