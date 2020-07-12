import words from '../model/words';
import wordFilling from './addingWordsToTable';
import timerw from './timer';

let timer;
let time = 3;

export default function drawPlayField() {

  document.querySelector('.allGames__choice_learn').onclick = () => {
    document.querySelector('.allGames__choice_learn').classList.add('select');
    document.querySelector('.allGames__choice_new').classList.remove('select');
    document.querySelector('.allGames__choice_levels').classList.add('hidden');
  };
  document.querySelector('.allGames__choice_new').onclick = () => {
    document.querySelector('.allGames__choice_new').classList.add('select');
    document.querySelector('.allGames__choice_learn').classList.remove('select');
    document.querySelector('.allGames__choice_levels').classList.remove('hidden');
  };

  const startBtn = document.querySelector('.letterSquare--btn__startBtn');

  startBtn.addEventListener('click', ({ target }) => {
    document.querySelector('.allGames__startScreen').classList.add('letterSquare-hidden');
    document.querySelector('.allGames__timerScreen').classList.remove('allGames__timerScreen-hidden');
    const timerStart = () => {
      document.querySelector('.allGames__timer').innerHTML = time;
      time -= 1;
      if (time < 0) {
        clearTimeout(timer);
        document.querySelector('.letterSquare__game').classList.remove('letterSquare-hidden');
        document.querySelector('.allGames__timerScreen').classList.add('letterSquare-hidden');
        timerw();
      } else {
        timer = setTimeout(timerStart, 1000);
      }
    };
    timerStart();
  });

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

  function addingWords(selector, words) {
    const list = document.querySelector(`${selector}`);
    for (let i = 0; i < words.length; i += 1) {
      const listItem = document.createElement('div');
      listItem.setAttribute('class', 'letterSquare--wordList__itemList');
      listItem.innerHTML = words[i];
      list.appendChild(listItem);
    }
  }

  for (let r = 0; r < playField.rows.length; r += 1) {
    for (let c = 0; c < playField.rows[r].cells.length; c += 1) {
      if (playField.rows[r].cells[c].innerHTML === '') {
        let cellValue = '';
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        while (cellValue.length < 1) { cellValue += alphabet[Math.random() * alphabet.length | 0]; }
        playField.rows[r].cells[c].innerHTML = cellValue;
      }
    }
  }
  addingWords('.letterSquare--wordList__list', words);
}