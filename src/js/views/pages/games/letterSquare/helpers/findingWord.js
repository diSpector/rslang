import words from '../model/words';
import generateStatistic from './generateStatistic';

let word = '';
let cellNumbers = '';
let column = '';
let line = '';
let counterWord = 8;
let lineSort;
let columnSort;
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
      lineSort = '';
      columnSort = '';
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
      lineSort = line.split('').sort().join('');
      columnSort = column.split('').sort().join('');

      let resultColumn = [];
      let resultLine = [];
        for (let str of columnSort) {
          if (!resultColumn.includes(str)) {
            resultColumn.push(str);
          }
        }
        for (let str of lineSort) {
          if (!resultLine.includes(str)) {
            resultLine.push(str);
          }
        }

      if (resultColumn.length !== 1) {
        for (let i = 1; i < lineSort.length; i += 1) {
          console.log(i);
          console.log(lineSort[i - 1]);
          console.log(lineSort[i]);
          if (lineSort[i] - lineSort[i - 1] !== 0) {
            errorAudio.play();
            return;
          }
        }
      }

      if (resultLine.length !== 1) {
        for (let i = 1; i < resultColumn.length; i += 1) {
          console.log(i);
          console.log(resultColumn[i - 1]);
          console.log(resultColumn[i]);
          if (resultColumn[i] - resultColumn[i - 1] !== 0) {
            errorAudio.play();
            return;
          }
        }
      }
      check();
    }
  };

  function check() {
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
        lineSort = '';
        columnSort = '';
        counterWord -= 1;
        if (counterWord === 0) {
          generateStatistic();
        }
        break;
      } else if (words[i] !== word && i === words.length - 1) {
        errorAudio.play();
      }
    }
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
