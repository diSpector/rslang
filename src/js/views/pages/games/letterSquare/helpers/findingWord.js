import words from '../model/words';
import addingWords from './addingWords';

let word = '';
let counterWord = 2;
const guessedWords = [];

export default function findingWord() {
  function checkWord(letter) {
    word += String(letter);
    const btnCheck = document.querySelector('.letterSquare---wordList__btnCheck');
    const btnRemove = document.querySelector('.letterSquare---wordList__btnRemove');
    btnRemove.onclick = () => {
      word = '';
    };
    btnCheck.onclick = () => {
      for (let i = 0; i < words.length; i += 1) {
        if (words[i] === word) {
          const tdGuessedItem = document.querySelectorAll('.td_active');
          console.log(tdGuessedItem);
          tdGuessedItem.forEach(function(item, i, tdGuessedItem) {
            item.classList.add('td_guessed');
          });
          guessedWords.push(word);
          counterWord -= 1;
          if (counterWord === 0) {
            document.querySelector('.letterSquare__game').classList.add('letterSquare-hidden');
            document.querySelector('.letterSquare__statistic').classList.remove('letterSquare-hidden');
            addingWords('.statistic__numberWordsFound', guessedWords);
            words = words.filter(function(x) { 
              return guessedWords.indexOf(x) < 0;
            });
            addingWords('.statistic__numberWordsNotFound', words);
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
