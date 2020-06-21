import '../../../../../css/pages/games/savannah/savannah.scss';
import '../../../../../css/pages/games/allGames.scss';

import Utils from '../../../../services/Utils';
import Game from '../Game';

const rounds = [
  [
    {
      word: 'elegant',
      translation: 'элегантный',
    },
    {
      translation: 'слякотный',
    },
    {
      translation: 'внезапный',
    },
    {
      translation: 'собранный',
    },
  ],
  [
    {
      word: 'composition',
      translation: 'композиция',
    },
    {
      translation: 'аннотация',
    },
    {
      translation: 'репетиция',
    },
    {
      translation: 'рукопожатие',
    },
  ],
  [
    {
      word: 'devastating',
      translation: 'разрушительный',
    },
    {
      translation: 'законодательный',
    },
    {
      translation: 'замечательный',
    },
    {
      translation: 'незначительный',
    },
  ],
];

function shuffle(array) {
  const shuffledArray = array;
  let currentIndex = shuffledArray.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = shuffledArray[currentIndex];
    shuffledArray[currentIndex] = array[randomIndex];
    shuffledArray[randomIndex] = temporaryValue;
  }

  return shuffledArray;
}

const Savannah = {

  beforeRender() {
    this.clearHeaderAndFooter();
  },

  clearHeaderAndFooter: () => {
    Utils.clearBlock('.header');
    Utils.clearBlock('.footer');
  },

  render: async () => {
    Savannah.beforeRender();

    const view = `
    <div class="savannah  allGames">
        <section class="allGames__startScreen">
            <h1 class="allGames__heading">Саванна</h1>
            <p class="allGames__description">Тренировка Саванна развивает словарный запас. Чем больше слов ты
                знаешь, тем больше очков опыта получишь.</p>
            <button class="allGames__startBtn  btn">Начать</button>
        </section>

        <section class="allGames__timerScreen  allGames__timerScreen-hidden">
            <div class="allGames__timer">3</div>
            <div class="allGames__tip">Используй клавиши 1, 2, 3 и 4, чтобы дать быстрый ответ</div>
        </section>

        <section class="savannah--playScreen  allGames__playScreen  allGames__playScreen-hidden">
            <div class="savannah--controls">
                <div class="savannah--sound"></div>
                <div class="savannah--stars">
                    <div class="savannah--stars__item"></div>
                    <div class="savannah--stars__item"></div>
                    <div class="savannah--stars__item"></div>
                    <div class="savannah--stars__item"></div>
                    <div class="savannah--stars__item"></div>
                </div>
            </div>
            <div class="savannah--game">
                <div class="savannah--game__question">word</div>
                <div class="savannah--game__answersList">
                    <div class="savannah--game__answer">неправильно</div>
                    <div class="savannah--game__answer">правильно</div>
                    <div class="savannah--game__answer">неправильно</div>
                    <div class="savannah--game__answer">неправильно</div>
                </div>
            </div>
        </section>
    </div>
    `;

    return view;
  },

  clearWords() {
    Utils.removeBlock('.savannah--game__question');
    Utils.removeBlock('.savannah--game__answersList');
  },

  showNewWords(roundIndex) {
    const game = document.querySelector('.savannah--game');
    const words = rounds[roundIndex];

    Utils.createBlockInside('div', 'savannah--game__question', game, words[0].word);
    const answersList = Utils.createBlockInside('div', 'savannah--game__answersList', game);

    const shuffledWords = shuffle(words);
    shuffledWords.forEach((item, index) => {
      if (Object.keys(item).length > 1) {
        Utils.createBlockInside('div', ['savannah--game__answer', 'correct'], answersList, `${index + 1} ${item.translation}`);
      } else {
        Utils.createBlockInside('div', 'savannah--game__answer', answersList, `${index + 1} ${item.translation}`);
      }
    });
  },

  checkAnswer(roundIndex) {
    const answersList = document.querySelector('.savannah--game__answersList');
    answersList.addEventListener('click', (e) => {
      // клик по переводу
      if (e.target.classList.contains('savannah--game__answer')) {
        if (e.target.classList.contains('correct')) {
          // если правильно
          e.target.classList.add('savannah--game__answer-correct');
        } else {
          // неправильно
          e.target.classList.add('savannah--game__answer-wrong');

          const correct = document.querySelector('.correct');
          correct.classList.add('savannah--game__answer-correct');
        }

        setTimeout(() => {
          if (roundIndex <= 1) {
            this.play(roundIndex + 1);
          } else {
            this.clearWords();
            console.log('Game over. Show Statistic');
          }
        }, 1000);
      }
    });
  },

  play(roundIndex) {
    this.clearWords();
    this.showNewWords(roundIndex);
    this.checkAnswer(roundIndex);
  },

  afterRender: async () => {
    Game.startGame();

    const roundIndex = 0;
    Savannah.play(roundIndex);
  },
};

export default Savannah;
