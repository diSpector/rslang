/* import words from '../model/words.js';

export default function findingWord() {
  function checkWord(letter) {
    let word = '';
    word += String(letter);
    console.log(word);
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
} */
