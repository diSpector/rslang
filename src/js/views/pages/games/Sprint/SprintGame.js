let countCorrect = 0;
const data = JSON.parse(localStorage.getItem('data'));

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
      document.querySelector('.sprint--card__list2').classList.remove('hidden');
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
  document.querySelector('.sprint--card__list2').classList.add('hidden');
  return 0;
};

let timer;
let time = 60;
const timerw = () => {
  document.querySelector('.sprint--game__time').innerHTML = time;
  time -= 1;
  if (time < 0) {
    clearTimeout(timer);
    document.querySelector('.sprint--game').classList.add('hidden');
    document.querySelector('.sprint--end').classList.remove('hidden');
    const result = document.querySelector('.sprint--game__result').innerHTML;
    document.querySelector('.sprint__message__result').innerHTML = result;
    data.push(result);
    localStorage.setItem('data', JSON.stringify(data));
    document.querySelector('.sprint__message__record').innerHTML = Math.max(...data);
    console.log(data);
    const average = data.reduce((accum, item) => Number(accum) + Number(item)) / data.length;
    console.log(Math.round(average));
    document.querySelector('.sprint__message__average').innerHTML = Math.round(average);
  } else {
    timer = setTimeout(timerw, 1000);
  }
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

export { game, timerw };
