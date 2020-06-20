import '../../../../../css/pages/games/audition/audition.scss';
import Utils from '../../../../services/Utils';

const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const anotherWords = ['школа', 'улица', 'человек', 'кошка'];

const setWords = (data, correctWord) => {
  const wordsList = document.querySelectorAll('.wordsList__word');
  const correctWordPlace = getRandomInRange(0, 4);
  wordsList[correctWordPlace].innerHTML += correctWord.wordTranslate;
  let wordNum = 0;
  for (let i = 0; i < wordsList.length; i += 1) {
    if (i !== correctWordPlace) {
      wordsList[i].innerHTML += anotherWords[wordNum];
      wordNum += 1;
    }
  }
};

const getWords = async () => {
  try {
    const urlWords = 'https://afternoon-falls-25894.herokuapp.com/words?page=2&group=0';
    const res = await fetch(urlWords);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error('Error in getWords!');
  }
};

const generateWordSlide = () => {
  const gameArea = document.querySelector('.audition--game');
  const wordSlide = `
  <section class="audition--wordScreen hidden">
    <div class="wordScreen__speaker"></div>
    <div class="wordScreen__wordsList">
      <div class="wordsList__word"><span>1.</span></div>
      <div class="wordsList__word"><span>2.</span></div>
      <div class="wordsList__word"><span>3.</span></div>
      <div class="wordsList__word"><span>4.</span></div>
      <div class="wordsList__word"><span>5.</span></div>
    </div>
    <button class="wordScreen__button">Не знаю</button>
  </section>
  `;
  gameArea.innerHTML += wordSlide;
};

const addGameClickHandler = (wordAudio, correctWord) => {
  const gameScreen = document.querySelector('.audition--wordScreen');
  const button = document.querySelector('.wordScreen__button');
  gameScreen.addEventListener('click', (event) => {
    if (event.target.closest('.wordScreen__speaker')) {
      wordAudio.play();
    }
    if (event.target.closest('.wordsList__word')) {
      const targetWord = event.target.closest('.wordsList__word');
      if (targetWord.innerHTML.includes(correctWord.wordTranslate) && !targetWord.classList.contains('correct')) {
        document.querySelectorAll('.wordsList__word').forEach((element) => {
          if (!element.innerHTML.includes(correctWord.wordTranslate)) {
            element.classList.add('wrong');
          }
        });
        targetWord.innerHTML = targetWord.innerHTML.slice(15);
        targetWord.classList.add('correct');
        Utils.clearBlock('.wordScreen__button');
        button.classList.add('correct');
        gameScreen.append();
      } else {

      }
    }
  });
};

const Audition = {

  beforeRender() {
    this.clearHeaderAndFooter();
  },

  clearHeaderAndFooter: () => {
    Utils.clearBlock('.header');
    Utils.clearBlock('.footer');
  },

  render: () => {
    Audition.beforeRender();

    const view = `
    <div class="audition--game">
      <section class="audition--startScreen">
        <h1 class="game__heading">Аудиовызов</h1>
        <p class="game__description">В этой игре вы улучшите восприятие английской речи на слух.</p>
        <button class="game__startBtn btn">Начать игру</button>
      </section>
    </div>
  `;
    return view;
  },

  afterRender: () => {
    const game = document.querySelector('.game__startBtn');
    game.addEventListener('click', () => {
      const startScreen = document.querySelector('.audition--startScreen');
      startScreen.classList.add('hide');
      generateWordSlide();
      document.querySelector('.audition--wordScreen').classList.remove('hidden');
      setTimeout(() => document.querySelector('.audition--startScreen').remove(), 2000);

      getWords().then((data) => {
        console.log(data);
        const correctWord = data[0];
        setWords(data, correctWord);
        const wordAudio = new Audio(`https://raw.githubusercontent.com/dispector/rslang-data/master/${correctWord.audio}`);
        wordAudio.play();
        addGameClickHandler(wordAudio, correctWord);
      });
    });
  },
};

export default Audition;
