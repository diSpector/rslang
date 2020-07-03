import words from '../model/words';
import generateStatistic from './generateStatistic';

let word = '';
let counterWord = 8;
const guessedWords = [];
const correctAudio = new Audio('src/audio/correct.mp3');
const errorAudio = new Audio('src/audio/error.mp3');

export default function findingWord() {
  function checkWord(letter) {
    word += String(letter);
    const btnCheck = document.querySelector('.letterSquare--wordList__btnCheck');
    const btnRemove = document.querySelector('.letterSquare--wordList__btnRemove');
    btnRemove.onclick = () => {
      const tdActive = document.querySelectorAll('.td_active');
      tdActive.forEach((item) => {
        item.classList.remove('td_active');
      });
      word = '';
    };

    btnCheck.onclick = () => {
      for (let i = 0; i < words.length; i += 1) {
        let wordsProto = words[i];
        let wordProto = word;
        wordsProto = wordsProto.split('').sort().join('');
        wordProto = wordProto.split('').sort().join('');
        if (wordsProto === wordProto) {
          correctAudio.play();
          const tdGuessedItem = document.querySelectorAll('.td_active');
          tdGuessedItem.forEach((item) => {
            item.classList.add('td_guessed');
          });
          const worList = document.querySelectorAll('.letterSquare--wordList__itemList');
          worList.forEach((item) => {
            if (item.innerHTML.split('').sort().join('') === wordProto) {
              item.classList.remove('letterSquare--wordList__itemList');
              item.classList.add('letterSquare--wordList__foundWord');
            }
          });
          guessedWords.push(word);
          counterWord -= 1;
          if (counterWord === 0) {
            generateStatistic();
          }
          break;
        } else if (words[i] !== word && i === words.length - 1) {
          errorAudio.play();
        }
      }
      word = '';
    };
  }

  function catchLetters(idLetters) {
    if (idLetters === 'myTable') {
      return;
    }
    const letter = document.getElementById(idLetters).innerHTML;
    if (document.getElementById(`${idLetters}`).classList.contains('td_active')) {
      document.getElementById(`${idLetters}`).classList.remove('td_active');
      word = word.replace(`${letter}`, '');
      return;
    }
    document.getElementById(`${idLetters}`).classList.add('td_active');
    checkWord(letter);
  }

  document.querySelector('#myTable').addEventListener('click',
    (element) => {
      const { id } = element.target;
      catchLetters(id);
    });
}
