import '../../../../../css/pages/games/audition/audition.scss';
import Utils from '../../../../services/Utils';
import Game from '../Game';

let isGameActive = true;
let currentWordCounter = 1;
let correctAnswersCounter = 0;
let wrongAnswersCounter = 0;

const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const setWords = (data, correctWord) => {
  const wordsList = document.querySelectorAll('.wordsList__word');
  let startPoint = 0;
  if (wordsList.length === 10) {
    startPoint = 5;
  }
  const correctWordPlace = getRandomInRange(0, 4) + startPoint;
  wordsList[correctWordPlace].innerHTML += correctWord.wordTranslate;
  let wordNum = 0;
  for (let i = startPoint; i < wordsList.length; i += 1) {
    if (i !== correctWordPlace) {
      wordsList[i].innerHTML += data.incorrect[wordNum].wordTranslate;
      wordNum += 1;
    }
  }
};

const setClassesForWrongWords = (correctWord) => {
  document.querySelectorAll('.wordsList__word').forEach((element) => {
    if (!element.innerHTML.includes(correctWord)) {
      element.classList.add('wrong');
    }
  });
};

const setAnswer = (wordData) => {
  const wordAreas = document.querySelectorAll('.audition--wordScreen');
  let wordArea = document.querySelector('.audition--wordScreen');
  if (wordAreas.length !== 1) {
    [, wordArea] = wordAreas;
  }
  const wordImage = Utils.createBlockInside('img', 'wordScreen__image', '', '', { src: wordData.image });
  wordArea.prepend(wordImage);
  const correctWords = document.querySelectorAll('.wordScreen__word');
  if (correctWords.length !== 1) {
    correctWords[1].innerHTML = wordData.word;
  } else {
    correctWords[0].innerHTML = wordData.word;
  }
};

const showAnswer = () => {
  document.querySelector('.wordScreen__image').classList.add('show');
  document.querySelector('.wordScreen__speaker').classList.add('show');
  document.querySelector('.wordScreen__word').classList.add('show');
};

const generateWordSlideHTML = () => {
  const gameArea = document.querySelector('.audition--game');
  const wordSlide = `
  <section class="audition--wordScreen hidden">
    <div class="wordScreen__wordArea">
      <div class="wordScreen__speaker"></div>
      <div class="wordScreen__word"></div>
    </div>
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

const generateStatisticHTML = () => {
  const gameArea = document.querySelector('.audition--game');
  const statistic = `
  <section class="audition--statistic hidden">
    <div class="statistic__title">Статистика игры</div>
    <div class="statistic__correctAnswers">Верных ответов: ${correctAnswersCounter}</div>
    <div class="statistic__wrongAnswers">Неверных ответов: ${wrongAnswersCounter}</div>
    <button class="statistic__button">Начать заново</button>
    <button class="statistic__button">Перейти на главную страницу</button>
  </section>
  `;
  gameArea.innerHTML += statistic;
};

const generateProgressBar = () => {
  const gameArea = document.querySelector('.audition--game');
  const progressBar = Utils.createBlockInside('section', 'audition--progressBar', '', '', { style: 'width: 0vw;' });
  gameArea.prepend(progressBar);
};

const changeProgressBar = () => {
  const progressBar = document.querySelector('.audition--progressBar');
  document.querySelector('.audition--progressBar').style.width = `${Number(progressBar.style.width.slice(0, -2)) + 10}vw`;
};

const generateNextWordSlide = (prevSlide) => {
  generateWordSlideHTML();
  const wordScreens = document.querySelectorAll('.audition--wordScreen');
  if (wordScreens[1] !== undefined) {
    wordScreens[1].classList.remove('hidden');
    wordScreens[0].classList.add('hide');
  } else {
    wordScreens[0].classList.remove('hidden');
  }
  if (prevSlide) setTimeout(() => Utils.removeBlock(prevSlide), 2000);
  Audition.settings.model.getFivePossibleTranslations().then((data) => {
    const correctWord = data.correct;
    setWords(data, correctWord);
    setAnswer(correctWord);
    const wordAudio = new Audio(correctWord.audio);
    setTimeout(() => wordAudio.play(), 1000);
    addGameClickHandler(wordAudio, correctWord);
  });
};

const generateStatistic = (prevSlide) => {
  generateStatisticHTML();
  const wordScreen = document.querySelector('.audition--wordScreen');
  const statisticScreen = document.querySelector('.audition--statistic');
  statisticScreen.classList.remove('hidden');
  wordScreen.classList.add('hide');
  if (prevSlide) setTimeout(() => Utils.removeBlock(prevSlide), 2000);
};

const addGameClickHandler = (wordAudio, correctWord) => {
  const wordScreens = document.querySelectorAll('.audition--wordScreen');
  let gameScreen = document.querySelector('.audition--wordScreen');
  let button = document.querySelector('.wordScreen__button');
  if (wordScreens[1] !== undefined) {
    [, gameScreen] = document.querySelectorAll('.audition--wordScreen');
    [, button] = document.querySelectorAll('.wordScreen__button');
  }
  isGameActive = true;
  document.onkeyup = (event) => {
    if (event.key > 0 && event.key < 6 && isGameActive) {
      const answers = document.querySelectorAll('.wordsList__word');
      const targetWord = answers[event.key - 1];
      setClassesForWrongWords(correctWord.wordTranslate);
      if (targetWord.innerHTML.includes(correctWord.wordTranslate) && isGameActive) {
        targetWord.innerHTML = targetWord.innerHTML.slice(15);
        targetWord.classList.add('correct');
        correctAnswersCounter += 1;
      } else if (!targetWord.innerHTML.includes(correctWord.wordTranslate) && isGameActive) {
        targetWord.classList.add('checked');
        wrongAnswersCounter += 1;
      }
      showAnswer();
      Utils.clearBlock('.wordScreen__button');
      button.classList.add('correct');
      isGameActive = false;
      currentWordCounter += 1;
    }
    if (event.key === 'Enter' && !isGameActive) {
      if (currentWordCounter <= 10) {
        generateNextWordSlide('.audition--wordScreen');
        changeProgressBar();
      } else {
        generateStatistic('.audition--wordScreen');
        Utils.removeBlock('.audition--progressBar');
      }
    }
  };
  gameScreen.addEventListener('click', (event) => {
    if (event.target.closest('.wordScreen__speaker')) {
      wordAudio.play();
    }
    if (event.target.closest('.wordsList__word') && isGameActive) {
      const targetWord = event.target.closest('.wordsList__word');
      setClassesForWrongWords(correctWord.wordTranslate);
      if (targetWord.innerHTML.includes(correctWord.wordTranslate) && isGameActive) {
        targetWord.innerHTML = targetWord.innerHTML.slice(15);
        targetWord.classList.add('correct');
        correctAnswersCounter += 1;
      } else if (!targetWord.innerHTML.includes(correctWord.wordTranslate) && isGameActive) {
        targetWord.classList.add('checked');
        wrongAnswersCounter += 1;
      }
      showAnswer();
      Utils.clearBlock('.wordScreen__button');
      button.classList.add('correct');
      isGameActive = false;
      currentWordCounter += 1;
    }
    if (event.target.closest('.wordScreen__button') && !isGameActive) {
      if (currentWordCounter <= 10) {
        generateNextWordSlide('.audition--wordScreen');
        changeProgressBar();
      } else {
        generateStatistic('.audition--wordScreen');
        Utils.removeBlock('.audition--progressBar');
      }
    } else if (event.target.closest('.wordScreen__button') && isGameActive) {
      setClassesForWrongWords(correctWord.wordTranslate);
      showAnswer();
      Utils.clearBlock('.wordScreen__button');
      button.classList.add('correct');
      isGameActive = false;
      currentWordCounter += 1;
      wrongAnswersCounter += 1;
    }
  });
};

const Audition = {

  settings: {
    model: null,
  },

  beforeRender() {
    this.clearHeaderAndFooter();
  },

  clearHeaderAndFooter: () => {
    Utils.clearBlock('.header');
    Utils.clearBlock('.footer');
  },

  render: (model) => {
    Audition.beforeRender();
    Audition.settings.model = model;
    const view = `
    <div class="allGames__playScreen"></div>
    <div class="audition--game allGames">
      <section class="audition__startScreen  allGames__startScreen">
          <h1 class="allGames__heading">Аудиовызов</h1>
          <p class="allGames__description">В этой игре вы улучшите восприятие английской речи на слух. Чем больше слов ты
              знаешь, тем больше очков опыта получишь.</p>
          <button class="allGames__startBtn  btn">Начать</button>
      </section>

      <section class="audition__timerScreen  allGames__timerScreen  allGames__timerScreen-hidden">
          <div class="allGames__timer">3</div>
          <div class="allGames__tip">Используй клавиши 1, 2, 3, 4 и 5 чтобы дать быстрый ответ</div>
      </section>
    </div>
     `;
    return view;
  },

  afterRender: async () => {
    Game.startGame(generateNextWordSlide);
    generateProgressBar();
  },
};

export default Audition;
