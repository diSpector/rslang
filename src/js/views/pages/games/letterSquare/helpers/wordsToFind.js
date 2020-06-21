import words from '../model/words.js';

export default function wordsToFind() {
  const list = document.querySelector('.letterSquare--wordList__list');
  for (let i = 0; i < words.length; i++) {
    const listItem = document.createElement('div');
    listItem.setAttribute('class', 'letterSquare--wordList__itemList');
    listItem.innerHTML = words[i];
    list.appendChild(listItem);
  }
}
