let countCorrect = 0;
const data = JSON.parse(localStorage.getItem('data'));
const correctAnswer = [];
const errorAnswer = [];
let obj = {};
let timer;
let time = 60;


const generate = (words) => {
  const word = words[0];
  const translate = words[1];
  const notranslate = words[2];
  obj.correctword = word;
  obj.correcttranslate = translate;
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
  if (count % 2 === 0) {
    countCorrect += 1;
    if (obj.correctword !== undefined) {
      correctAnswer.push(obj);
    }
    obj = {};
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
  if (obj.correctword !== undefined) {
    errorAnswer.push(obj);
  }
  obj = {};
  document.querySelector('.sprint--card__title').children[0].classList.remove('active');
  document.querySelector('.sprint--card__title').children[1].classList.remove('active');
  document.querySelector('.sprint--card__title').children[2].classList.remove('active');
  countCorrect = 0;
  document.querySelector('.sprint--card__list2').classList.add('hidden');
  return 0;
};

const generateStatisticWord = (masCorrect, masError) => {
  const correctList = document.querySelector('.sprint--end__statistic_correct');
  masCorrect.forEach((item) => {
    const div = document.createElement('p');
    div.innerHTML = `${item.correctword} - ${item.correcttranslate}`;
    correctList.append(div);
  });
  const errorList = document.querySelector('.sprint--end__statistic_error');
  masError.forEach((item) => {
    const div = document.createElement('p');
    div.innerHTML = `${item.correctword} - ${item.correcttranslate}`;
    errorList.append(div);
  });
};

const generateStatistic = () => {
  document.querySelector('.sprint--game').classList.add('hidden');
  document.querySelector('.sprint--end').classList.remove('hidden');
  const result = document.querySelector('.sprint--game__result').innerHTML;
  document.querySelector('.sprint__message__result').innerHTML = result;
  data.push(result);
  localStorage.setItem('data', JSON.stringify(data));
  document.querySelector('.sprint__message__record').innerHTML = Math.max(...data);
  const average = data.reduce((accum, item) => Number(accum) + Number(item)) / data.length;
  document.querySelector('.sprint__message__average').innerHTML = Math.round(average);

  document.querySelector('.sprint--end__slide_main').onclick = () => {
    document.querySelector('.sprint--end__slide_main').classList.add('active');
    document.querySelector('.sprint--end__slide_statistic').classList.remove('active');
    if (!document.querySelector('.sprint--end__statistic').classList.contains('hidden')) {
      document.querySelector('.sprint--end__statistic').classList.add('hidden');
      document.querySelector('.sprint--end__message').classList.remove('hidden');
    }
  };
  document.querySelector('.sprint--end__slide_statistic').onclick = () => {
    document.querySelector('.sprint--end__slide_statistic').classList.add('active');
    document.querySelector('.sprint--end__slide_main').classList.remove('active');
    if (!document.querySelector('.sprint--end__message').classList.contains('hidden')) {
      document.querySelector('.sprint--end__statistic').classList.remove('hidden');
      document.querySelector('.sprint--end__message').classList.add('hidden');
    }
  };
};


const timerw = () => {
  document.querySelector('.sprint--game__time').innerHTML = time;
  time -= 1;
  if (time < 0) {
    clearTimeout(timer);
    generateStatistic();
    generateStatisticWord(correctAnswer, errorAnswer);
    console.log(errorAnswer);
  } else {
    timer = setTimeout(timerw, 1000);
  }
};

const game = (model) => {
  model.getTwoPossibleTranslations().then((data) => {
    let count = generate([data.correct.word, data.correct.wordTranslate, data.incorrect]);
    document.querySelector('.sprint--button__correct').onclick = () => {
      count += 1;
      check(count);
      game(model);
    };
    document.querySelector('.sprint--button__error').onclick = () => {
      count += 0;
      check(count);
      game(model);
    };
    document.onkeyup = (event) => {
      if (event.code === 'ArrowLeft') {
        count += 1;
        check(count);
        game(model);
      }
      if (event.code === 'ArrowRight') {
        count += 0;
        check(count);
        game(model);
      }
    };
  });
};


export { game, timerw };
