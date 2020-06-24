import '../../../../../css/pages/games/Sprint/Sprint.scss';
import '../../../../../css/pages/games/allGames.scss';
import Utils from '../../../../services/Utils';
import { game, timerw } from './SprintGame';
import Game from '../game';

const Sprint = {
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
    Sprint.beforeRender();
    Sprint.settings.model = model;
    const view = `
    <div class="sprint allGames">
      <section class="allGames__startScreen">
        <h1 class="allGames__heading">Спринт</h1>
        <p class="allGames__description">Тренировка спринт развивает способности быстрого перевода слов и выражений с английского языка на русский.</p>
        <button class="allGames__startBtn  btn">Начать</button>
      </section>
      <section class="allGames__timerScreen  allGames__timerScreen-hidden">
        <div class="allGames__timer">3</div>
        <div class="allGames__tip">Используй клавиши влево и вправо, чтобы дать ответ.</div>
      </section>
      <section class="sprint--game  allGames__playScreen  allGames__playScreen-hidden">
        <div class="sprint--game__result">0</div>
        <div class="sprint--game__card">
          <div class="sprint--card__title">
            <span class="sprint--card__title_check"></span>
            <span class="sprint--card__title_check"></span>
            <span class="sprint--card__title_check"></span>
          </div>
          <div class="sprint--card__list"></div>          
          <div class="sprint--card__list2 hidden"></div>          
          <div class="sprint--card__word">
            <p class="word">word</p>
            <p class="translate">слово</p>
          </div>
          <div class="sprint--card__button">
            <button class="sprint--button__correct">Верно</button>
            <button class="sprint--button__error">Неверно</button>
          </div>
        </div>
        <div class="sprint--game__time">60</div>
        <div class="sprint--game__arrow">
          <div class="sprint--game__arrow_left"></div>          
          <div class="sprint--game__arrow_right"></div>          
        </div>
        <p class="sprint__arrow_about">Нажимай на стрелки влево/вправо на клавиатуре, чтобы дать ответ.</p> 
      </section>

      <section class="sprint--end hidden">
        <h2 class=sprint--end__title>Результаты тренировки</h2>
        <div class="sprint--end__message">
          <p class="sprint__result">Твой результат <span class="sprint__message__result"></span> очков.</p>
          <p class="sprint__averge">Твой средний результат <span class="sprint__message__average"></span> очков.</p>
          <p class="sprint__record">Твой рекорд <span class="sprint__message__record"></span> очков.</p>
          <div class="sprint--card__list"></div>          
          <div class="sprint--card__list2"></div>          

        </div>
      </section>
    </div>
    `;
    return view;
  },

  afterRender: () => {
    Game.startGame(timerw);
    let data = JSON.parse(localStorage.getItem('data'));
    if (data == null) {
      data = [];
      localStorage.setItem('data', JSON.stringify(data));
      data = JSON.parse(localStorage.getItem('data'));
    }
    game();
  },
};

export default Sprint;