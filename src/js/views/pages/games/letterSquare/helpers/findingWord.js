import words from '../model/words';
import generateStatistic from './generateStatistic';

let word = '';
let cellNumbers = '';
let column = '';
let line = '';
let counterWord = 8;
const guessedWords = [];
const correctAudio = new Audio('src/audio/correct.mp3');
const errorAudio = new Audio('src/audio/error.mp3');

export default function findingWord() {
  function checkWord(letter, idLetters) {
    word += String(letter);
    cellNumbers += idLetters;
    const btnCheck = document.querySelector('.letterSquare--wordList__btnCheck');
    const btnRemove = document.querySelector('.letterSquare--wordList__btnRemove');
    btnRemove.onclick = () => {
      const tdActive = document.querySelectorAll('.td_active');
      tdActive.forEach((item) => {
        item.classList.remove('td_active');
      });
      word = '';
      column = '';
      line = '';
      cellNumbers = '';
    };

    btnCheck.onclick = () => {
      const arr = cellNumbers.split('');
      for (let i = 0; i < arr.length; i += 1) {
        if (i % 2 === 0) {
          line += arr[i];
        } else {
          column += arr[i];
        }
      }
      const lineSort = line.split('').sort().join('');
      const columnSort = column.split('').sort().join('');

      for (let i = 1; i < column.length; i += 1) {
        /*console.log('column i - 1: ' + column[i-1]);
        console.log('column i: ' + column[i]);
        console.log(column[i - 1] !== column[i]);
        console.log('lineSort: ' + lineSort);
        console.log('line: ' + line);
        console.log(lineSort !== line);*/
          if (column[i - 1] !== column[i] && lineSort !== line) {
            console.log(line[i - 1] !== line[i]);
            console.log(column !== columnSort);
            errorAudio.play();
            return;
          }
      }
      for (let i = 1; i < line.length; i += 1) {
        if (line[i - 1] !== line[i] && column !== columnSort) {
          /*console.log('line i - 1: ' + line[i-1]);
          console.log('line i: '+line[i]);
          console.log('columnSort: ' + columnSort);
          console.log('column: ' + column);
          console.log(column !== columnSort);*/
          errorAudio.play();
          return;
        }
      }

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
          word = '';
          column = '';
          line = '';
          cellNumbers = '';
          counterWord -= 1;
          if (counterWord === 0) {
            generateStatistic();
          }
          break;
        } else if (words[i] !== word && i === words.length - 1) {
          errorAudio.play();
        }
      }
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
      cellNumbers = cellNumbers.replace(`${idLetters}`, '');
      column = '';
      line = '';
      console.log(cellNumbers);
      return;
    }
    document.getElementById(`${idLetters}`).classList.add('td_active');
    checkWord(letter, idLetters);
  }

  document.querySelector('#myTable').addEventListener('click',
    (element) => {
      const { id } = element.target;
      catchLetters(id);
    });
}
