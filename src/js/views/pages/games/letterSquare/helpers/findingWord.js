import words from '../model/words.js';

let word = '';
let counterWord = 1;

export default function findingWord() {
  /*function soundClick() {
    const audio = new Audio(); 
    audio.src = `src/audio/correct.mp3'`; 
    audio.autoplay = true; 
  }*/

  function checkWord(letter) {
    word += String(letter);
    const btnCheck = document.querySelector('.letterSquare---wordList__btnCheck');
    btnCheck.onclick = () => {
      for (let i = 0; i < words.length; i += 1) {
        if (words[i] === word) {
          //soundClick();
          counterWord -= 1;
          if (counterWord === 0) {
            document.querySelector('.letterSquare__game').classList.add('letterSquare-hidden');
            document.querySelector('.letterSquare__statistic').classList.remove('letterSquare-hidden');
          }
        }
      }
      word = '';
    };
  }

  function catchLetters(idLetters) {
    if (idLetters === 'myTable') {
      return;
    }
    if (document.getElementById(`${idLetters}`).classList.contains('td_active')) {
      document.getElementById(`${idLetters}`).classList.remove('td_active');
    } else {
      document.getElementById(`${idLetters}`).classList.add('td_active');
    }
    const letter = document.getElementById(idLetters).innerHTML;
    checkWord(letter);
  }
  document.querySelector('#myTable').addEventListener('click',
    (element) => {
      const { id } = element.target;
      catchLetters(id);
    });
}
