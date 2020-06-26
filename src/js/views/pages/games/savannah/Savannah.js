import '../../../../../css/pages/games/allGames.scss';
import '../../../../../css/pages/games/savannah/savannah.scss';

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
];

// function shuffle(array) {
//   // const shuffledArray = array;
//   const shuffledArray = array.slice();
//   let currentIndex = shuffledArray.length;
//   let temporaryValue;
//   let randomIndex;

//   // While there remain elements to shuffle...
//   while (currentIndex !== 0) {
//     // Pick a remaining element...
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;

//     // And swap it with the current element.
//     temporaryValue = shuffledArray[currentIndex];
//     shuffledArray[currentIndex] = array[randomIndex];
//     shuffledArray[randomIndex] = temporaryValue;
//   }

//   return shuffledArray;
// }

function shuffle(array) {
  const shuffledArray = array.slice();
  shuffledArray.sort(() => Math.random() - 0.5);

  return shuffledArray;
}

const Savannah = {
  roundsCount: 10,
  // currentRoundWords: null,
  // shuffledWords: null,
  mistakesCount: 0,
  maxMistakesCount: 5,
  correctAnswersCount: 0,
  isAnswerSelected: false,

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
            <p class="allGames__description">Тренировка Саванна развивает словарный запас.</p>
            <button class="allGames__startBtn  savannah--btn">Начать</button>
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

            <div class="savannah--stat  savannah--stat-hidden">
                <h2 class="savannah--stat__heading">Статистика тренировки</h2>
                <div class="savannah--stat__answers">
                    <div class="savannah--stat__errors">
                        <h3 class="savannah--stat__errorsHeading">Ошибок: <span>1</span></h3>
                        <ul class="savannah--stat__list">
                            <li class="savannah--stat__listItem">
                                <div></div>
                                <span><b>слово</b> - перевод<span>
                            </li>
                            <li class="savannah--stat__listItem">
                                <div></div>
                                <span><b>слово</b> - перевод<span>
                            </li>
                        </ul>
                    </div>
                    <div class="savannah--stat__correct">
                        <h3 class="savannah--stat__correctHeading">Знаю: <span>1</span></h3>
                        <ul class="savannah--stat__list">
                            <li class="savannah--stat__listItem">
                                <div></div>
                                <span><b>слово</b> - перевод<span>
                            </li>
                        </ul>
                    </div>
                </div>
                <button class="savannah--btn  savannah--btn-continue" onclick="document.location.reload()">Продолжить тренировку</button>
                <a class="savannah--link" href="/#/statistic">Смотреть статистику по всем играм</a>
                <a class="savannah--link" href="/">На главную</a>
            </div>

        </section>

        <audio id="savannah-audio"></audio>
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
    // console.log('words', words);
    // console.log('currentRoundWords', this.currentRoundWords);

    Utils.createBlockInside('div', ['savannah--game__question', 'savannah--game__question-fall'], game, words[0].word);
    const answersList = Utils.createBlockInside('div', 'savannah--game__answersList', game);

    const shuffledWords = shuffle(words);
    // console.log('shuffledWords', shuffledWords);

    shuffledWords.forEach((item, index) => {
      const dataObj = {
        key: `${index + 1}`,
      };
      if (Object.keys(item).length > 1) {
        Utils.createBlockInside('div', ['savannah--game__answer', 'correct'], answersList, `${index + 1} ${item.translation}`, {}, dataObj);
      } else {
        Utils.createBlockInside('div', 'savannah--game__answer', answersList, `${index + 1} ${item.translation}`, {}, dataObj);
      }
    });
  },

  isSoundOn() {
    const soundBtn = document.querySelector('.savannah--sound');
    return !(soundBtn.classList.contains('savannah--sound-off'));
  },

  playAudio(file) {
    const audio = document.querySelector('#savannah-audio');

    if (this.isSoundOn()) {
      audio.setAttribute('src', `src/audio/${file}.mp3`);
      audio.play();
    }
  },

  toggleSound() {
    const soundBtn = document.querySelector('.savannah--sound');

    soundBtn.addEventListener('click', () => {
      soundBtn.classList.toggle('savannah--sound-off');
    });
  },

  goToNextRound(roundIndex, delay) {
    return setTimeout(() => {
      if (roundIndex < (this.roundsCount - 1) && this.mistakesCount < this.maxMistakesCount) {
        this.play(roundIndex + 1);
      } else {
        Utils.clearBlock('.savannah--game__question');
        Utils.clearBlock('.savannah--game__answersList');
        this.showStatistics();
      }
    }, delay);
  },

  showStatistics() {
    // console.log('Game over. Show Statistic');
    const stat = document.querySelector('.savannah--stat');
    stat.classList.remove('savannah--stat-hidden');

    const mistakesCount = document.querySelector('.savannah--stat__errorsHeading span');
    mistakesCount.textContent = this.mistakesCount;

    const correctAnswersCount = document.querySelector('.savannah--stat__correctHeading span');
    correctAnswersCount.textContent = this.correctAnswersCount;
  },

  checkAnswer(roundIndex) {
    const question = document.querySelector('.savannah--game__question');
    const answersList = document.querySelector('.savannah--game__answersList');
    const stars = document.querySelectorAll('.savannah--stars__item');

    console.log(this.mistakesCount);

    this.isAnswerSelected = false;

    // при отсутствии ответа
    // показываем правильный перевод, когда кончится анимация (5,5 секунд)
    const timerShowCorrectTranslation = setTimeout(() => {
      stars[this.mistakesCount].classList.add('savannah--stars__item-lost');
      this.mistakesCount += 1;

      this.playAudio('error');

      const correct = document.querySelector('.correct');
      correct.classList.add('savannah--game__answer-correct');

      question.classList.add('savannah--game__question-explode');

      this.isAnswerSelected = true;
    }, 5500);

    // смена раунда или конец игры еще через секунду
    const timerChangeRound = this.goToNextRound(roundIndex, 6500);

    answersList.addEventListener('click', (e) => {
      // клик по переводу
      if (e.target.classList.contains('savannah--game__answer') && !this.isAnswerSelected) {
        // удаляем таймеры, которые используются при отсутвии ответа
        clearTimeout(timerShowCorrectTranslation);
        clearTimeout(timerChangeRound);

        if (e.target.classList.contains('correct')) {
          // если правильно
          e.target.classList.add('savannah--game__answer-correct');
          question.classList.remove('savannah--game__question-fall');

          this.correctAnswersCount += 1;

          this.playAudio('correct');

          this.isAnswerSelected = true;
        } else {
          // неправильно
          e.target.classList.add('savannah--game__answer-wrong');
          Utils.clearBlock('.savannah--game__question');

          const correct = document.querySelector('.correct');
          correct.classList.add('savannah--game__answer-correct');

          stars[this.mistakesCount].classList.add('savannah--stars__item-lost');
          this.mistakesCount += 1;

          this.playAudio('error');

          this.isAnswerSelected = true;
        }

        // смена раунда или конец игры через секунду
        this.goToNextRound(roundIndex, 1000);
      }
    });

    document.onkeyup = ({ key }) => {
      // только нужные клавиши с 1-4 слушаем
      if ((key === '1' || key === '2' || key === '3' || key === '4') && !this.isAnswerSelected) {
        // удаляем таймеры, которые используются при отсутвии ответа
        clearTimeout(timerShowCorrectTranslation);
        clearTimeout(timerChangeRound);

        const answers = document.querySelectorAll('.savannah--game__answer');
        const correct = document.querySelector('.correct');
        const translationNumber = correct.getAttribute('data-key');

        if (key === translationNumber) {
          // правильно
          correct.classList.add('savannah--game__answer-correct');
          question.classList.remove('savannah--game__question-fall');

          this.correctAnswersCount += 1;

          this.playAudio('correct');

          this.isAnswerSelected = true;
        } else {
          // неправильно
          answers[key - 1].classList.add('savannah--game__answer-wrong');
          Utils.clearBlock('.savannah--game__question');

          correct.classList.add('savannah--game__answer-correct');

          stars[this.mistakesCount].classList.add('savannah--stars__item-lost');
          this.mistakesCount += 1;

          this.playAudio('error');

          this.isAnswerSelected = true;
        }

        // смена раунда или конец игры
        this.goToNextRound(roundIndex, 1000);
      }
    };
  },

  play(roundIndex) {
    this.removeWords();
    this.createNewWords(roundIndex);
    this.checkAnswer(roundIndex);
  },

  afterRender: async () => {
    const roundIndex = 0;
    Savannah.toggleSound();
    Game.startGame(() => Savannah.play(roundIndex));
  },
};

export default Savannah;
