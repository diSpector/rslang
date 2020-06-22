import words from '../model/words';
import GetCellValues from './getCellValues';
import wordFilling from './addingWordsToTable';

export default function drawPlayField() {
  const numberСell = 10;
  const playField = document.createElement('table');
  playField.setAttribute('id', 'myTable');
  for (let i = 0; i < numberСell; i += 1) {
    const tr = document.createElement('tr');
    for (let j = 0; j < numberСell; j += 1) {
      const td = document.createElement('td');
      td.setAttribute('id', `${i}${j}`);
      tr.appendChild(td);
    }
    playField.appendChild(tr);
  }
  document.querySelector('.letterSquare--playingField').appendChild(playField);
  for (let i = 0; i < words.length; i += 1) {
    wordFilling(words[i]);
  }
  GetCellValues();
}
