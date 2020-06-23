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
  mistakesCount: 0,
  maxMistakesCount: 5,
  correctAnswersCount: 0,

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

  removeWords() {
    Utils.removeBlock('.savannah--game__question');
    Utils.removeBlock('.savannah--game__answersList');
  },

  createNewWords(roundIndex) {
    const game = document.querySelector('.savannah--game');
    const words = rounds[roundIndex];

    Utils.createBlockInside('div', ['savannah--game__question', 'savannah--game__question-fall'], game, words[0].word);
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
    const question = document.querySelector('.savannah--game__question');
    const answersList = document.querySelector('.savannah--game__answersList');
    const stars = document.querySelectorAll('.savannah--stars__item');

    console.log(this.mistakesCount);

    // при отсутствии ответа
    // показываем правильный перевод, когда кончится анимация (5,5 секунд)
    const timerShowCorrectTranslation = setTimeout(() => {
      console.log(stars);
      stars[this.mistakesCount].classList.add('savannah--stars__item-lost');
      this.mistakesCount += 1;

      const correct = document.querySelector('.correct');
      correct.classList.add('savannah--game__answer-correct');

      question.classList.add('savannah--game__question-explode');
    }, 5500);

    // смена раунда или конец игры еще через секунду
    const timerChangeRound = setTimeout(() => {
      if (roundIndex <= 4 && this.mistakesCount < this.maxMistakesCount) {
        this.play(roundIndex + 1);
      } else {
        Utils.clearBlock('.savannah--game__question');
        Utils.clearBlock('.savannah--game__answersList');
        console.log('Game over. Show Statistic');
      }
    }, 6500);


    answersList.addEventListener('click', (e) => {
      // клик по переводу
      if (e.target.classList.contains('savannah--game__answer')) {
        // удаляем таймеры, которые используются при отсутвии ответа
        clearInterval(timerShowCorrectTranslation);
        clearInterval(timerChangeRound);

        if (e.target.classList.contains('correct')) {
          // если правильно
          e.target.classList.add('savannah--game__answer-correct');
          question.classList.remove('savannah--game__question-fall');
          // Utils.clearBlock('.savannah--game__question');
          // question.setAttribute('style', 'animation-name: none');
          // question.setAttribute('style', 'animation-play-state: paused');
        } else {
          // неправильно
          e.target.classList.add('savannah--game__answer-wrong');
          Utils.clearBlock('.savannah--game__question');

          const correct = document.querySelector('.correct');
          correct.classList.add('savannah--game__answer-correct');

          stars[this.mistakesCount].classList.add('savannah--stars__item-lost');
          this.mistakesCount += 1;
        }

        // смена раунда или конец игры
        setTimeout(() => {
          if (roundIndex <= 4 && this.mistakesCount < this.maxMistakesCount) {
            this.play(roundIndex + 1);
          } else {
            Utils.clearBlock('.savannah--game__question');
            Utils.clearBlock('.savannah--game__answersList');
            console.log('Game over. Show Statistic');
          }
        }, 1000);
      }
    });
  },

  play(roundIndex) {
    this.removeWords();
    this.createNewWords(roundIndex);
    this.checkAnswer(roundIndex);
  },

  afterRender: async () => {
    const roundIndex = 0;
    Game.startGame(() => Savannah.play(roundIndex));
  },
};

export default Savannah;
