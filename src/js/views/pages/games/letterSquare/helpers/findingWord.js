import words from '../model/words.js';
let word = '';
let counterWord = 2;

export default function findingWord() {
  function checkWord(letter) {
    word += String(letter);
    console.log(word);

    const btnCheck = document.querySelector('.letterSquare---wordList__btnCheck');
    btnCheck.onclick = function() {
      console.log(word + '1');
      for(let i = 0; i < words.length; i++){
        if(words[i] === word) {
          counterWord -= 1;
          if(counterWord === 0) {
            console.log("finish");
          }
          console.log('+');
        }
      }
      word = '';
      return false;
    }
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
    console.log(letter);
  }
  document.querySelector('#myTable').addEventListener('click',
    (element) => {
      const { id } = element.target;
      catchLetters(id);
    });
} 