import words from '../model/words';

export default function wordsToFind() {
  const list = document.querySelector('.letterSquare--wordList__list');
  for (let i = 0; i < words.length; i += 1) {
    const listItem = document.createElement('div');
    listItem.setAttribute('class', 'letterSquare--wordList__itemList');
    listItem.innerHTML = words[i];
    list.appendChild(listItem);
  }
}
