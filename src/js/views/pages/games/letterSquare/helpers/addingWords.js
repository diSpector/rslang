export default function addingWords(selector, words) {
  const list = document.querySelector(`${selector}`);
  for (let i = 0; i < words.length; i += 1) {
    const listItem = document.createElement('div');
    listItem.setAttribute('class', 'letterSquare--wordList__itemList');
    listItem.innerHTML = words[i];
    list.appendChild(listItem);
  }
}
