export default function wordFilling(item) {
  const word = item.split('');
  const random = getRandomInt(2);
  if (random == 1) {
    horizontalFilling(word);
  } else {
    verticalFilling(word);
  }

  function horizontalFilling(word) {
    const line = getRandomIntInclusive();
    const column = getRandomIntInclusive();
    if (word.length <= 9 - column) {
      checkEmptyCellsHorizontal(line, column, word);
    } else {
      verticalFilling(word);
    }
  }

  function verticalFilling(word) {
    const line = getRandomIntInclusive();
    const column = getRandomIntInclusive();
    if (word.length <= 9 - line) {
      checkEmptyCellsVertical(line, column, word);
    } else {
      horizontalFilling(word);
    }
  }

  function checkEmptyCellsHorizontal(line, column, word) {
    let counter = column;
    for (let i = 0; i < word.length; i++) {
      const cell = document.getElementById(`${line}${counter}`);
      counter += 1;
      if (cell.innerHTML != '') {
        verticalFilling(word);
        break;
      }
      if (cell.innerHTML == '' && i == (word.length - 1)) {
        fillingCellsWordHorizontal(line, column, word);
      }
    }
  }

  function checkEmptyCellsVertical(line, column, word) {
    let counter = line;
    for (let i = 0; i < word.length; i++) {
      const cell = document.getElementById(`${counter}${column}`);
      counter += 1;
      if (cell.innerHTML != '') {
        horizontalFilling(word);
        break;
      }
      if (cell.innerHTML == '' && i == (word.length - 1)) {
        fillingCellsWordVertical(line, column, word);
      }
    }
  }

  function fillingCellsWordHorizontal(line, column, word) {
    for (let i = 0; i < word.length; i++) {
      const wordCell = document.getElementById(`${line}${column}`);
      column += 1;
      wordCell.innerHTML = word[i];
    }
  }

  function fillingCellsWordVertical(line, column, word) {
    for (let i = 0; i < word.length; i++) {
      const wordCell = document.getElementById(`${line}${column}`);
      line += 1;
      wordCell.innerHTML = word[i];
    }
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomIntInclusive() {
  const min = Math.ceil(0);
  const max = Math.floor(9);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
