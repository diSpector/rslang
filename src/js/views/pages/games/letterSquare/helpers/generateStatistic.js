let arr1 = '';
let arr2 = '';
const comma = ',';

export default function generateStatistic() {
  const unfoundword = document.querySelectorAll('.letterSquare--wordList__itemList');
  unfoundword.forEach((item) => {
    arr2 += item.innerHTML + comma;
  });
  const foundWord = document.querySelectorAll('.letterSquare--wordList__foundWord');
  foundWord.forEach((item) => {
    arr1 += item.innerHTML + comma;
  });
  const subStr1 = arr1.split(',');
  subStr1.splice(-1, 1);
  const subStr2 = arr2.split(',');
  subStr2.splice(-1, 1);
  console.log(subStr1);
  console.log(subStr2);

  document.querySelector('.letterSquare__game').classList.add('letterSquare-hidden');
  document.querySelector('.letterSquare__statistic').classList.remove('letterSquare-hidden');

  function addingWords(selector, words) {
    const list = document.querySelector(`${selector}`);
    for (let i = 0; i < words.length; i += 1) {
      const listItem = document.createElement('div');
      listItem.setAttribute('class', 'letterSquare--statistic__wordList__itemList');
      listItem.innerHTML = words[i];
      list.appendChild(listItem);
    }
  }

  addingWords('.letterSquare--statistic__numberWordsFound', subStr1);
  addingWords('.letterSquare--statistic__numberWordsNotFound', subStr2);
}
