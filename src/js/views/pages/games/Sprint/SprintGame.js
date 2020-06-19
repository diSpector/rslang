let countCorrect = 0;
const generate = (words) => {
  const word = words[0];
  const translate = words[1];
  const notranslate = words[2];
  let result;
  document.querySelector('.sprint--card__word > .word').innerHTML = word;
  if (Math.round(Math.random())) {
    document.querySelector('.sprint--card__word > .translate').innerHTML = translate;
    result = 1;
  } else {
    document.querySelector('.sprint--card__word > .translate').innerHTML = notranslate;
    result = 0;
  }
  return result;
};

const check = (count) => {
  console.log('check', count);
  if (count % 2 === 0) {
    countCorrect += 1;
    const k = Number(document.querySelector('.sprint--game__result').innerText);
    if (countCorrect >= 4) {
      document.querySelector('.sprint--game__result').innerHTML = k + 20;
    } else {
      document.querySelector('.sprint--game__result').innerHTML = k + 10;
      document.querySelector('.sprint--card__title').children[countCorrect - 1].classList.add('active');
    }
    return 1;
  }
  document.querySelector('.sprint--card__title').children[0].classList.remove('active');
  document.querySelector('.sprint--card__title').children[1].classList.remove('active');
  document.querySelector('.sprint--card__title').children[2].classList.remove('active');
  countCorrect = 0;
  return 0;
};

const game = () => {
  let count = generate(['word', 'слово', 'не слово']);
  document.querySelector('.sprint--button__correct').onclick = () => {
    count += 1;
    check(count);
    game();
  };
  document.querySelector('.sprint--button__error').onclick = () => {
    count += 0;
    check(count);
    game();
  };
};

export default game;
