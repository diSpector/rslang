import words from '../model/words';
import FillCellsRandomLetters from './randomLetters';
import wordFilling from './addingWordsToTable';

export default function drawPlayField() {
  const startBtn = document.querySelector('.letterSquare--btn__startBtn');
  startBtn.onclick = function() {
    document.querySelector('.allGames__startScreen').classList.add('allGames__timerScreen-hidden');
    document.querySelector('.letterSquare').classList.remove('allGames__timerScreen-hidden');
    console.log('start');
  }
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
  for (let r = 0; r < playField.rows.length; r += 1) {
    for (let c = 0; c < playField.rows[r].cells.length; c += 1) {
      if (playField.rows[r].cells[c].innerHTML === '') {
        FillCellsRandomLetters(playField.rows[r].cells[c]);
      }
    }
  }
}
