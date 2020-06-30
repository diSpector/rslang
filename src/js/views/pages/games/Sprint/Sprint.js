import '../../../../../css/pages/games/Sprint/Sprint.scss';
import '../../../../../css/pages/games/allGames.scss';
import Utils from '../../../../services/Utils';
import { generateWord, timerw } from './SprintGame';
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
        <p class="allGames__description">Тренировка спринт развивает способности быстрого перевода слов и выражений с английского языка на русский.<br>За более чем три правильных ответа подряд будет начисляться удвоенное количество баллов.</p>
        <div class="allGames__choice">
          <p class="allGames__choice_learn select">Игра с изученными словами</p>
          <p class="allGames__choice_new">Игра с новыми словами</p>
          <div class="allGames__choice_levels hidden">
            <label>Уровень:</label>
            <select name="levels" id="levels">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <label>Раунд:</label>
            <select name="pages" id="pages">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>

        <button class="allGames__startBtn  btn">Начать</button>
      </section>
      <section class="allGames__timerScreen  allGames__timerScreen-hidden">
        <div class="allGames__timer">3</div>
        <div class="allGames__tip">Используй клавиши влево и вправо, чтобы дать ответ.</div>
      </section>
      <section class="sprint--game  allGames__playScreen  allGames__playScreen-hidden">
        <div class="sprint--game__result">
          <div class="sprint--game__result_points">0</div>
          <div class="sprint--game__result_addPoints"></div>
        </div>
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
      </section>

      <section class="sprint--end hidden">
        <div class="sprint--end__message">
          <div class="sprint--card__title">
            <h2 class=sprint--end__title>Результаты тренировки</h2>
          </div>
          <p class="sprint__result">Твой результат <span class="sprint__message__result"></span> очков.</p>
          <p class="sprint__averge">Твой средний результат <span class="sprint__message__average"></span> очков.</p>
          <p class="sprint__record">Твой рекорд <span class="sprint__message__record"></span> очков.</p>
          <button class="sprint--end__button_repeat" onclick="document.location.reload()">Играть еще раз</button>
          <button class="sprint--end__button_continue" onclick="document.location.reload()">Продолжить</button>
          <button class="sprint--end__button_main" onclick="location.href='/'">Главная страница</button>
        </div>
        <div class="sprint--end__statistic hidden">
          <div class="sprint--end__statistic_correct">
            <p class="sprint--end__statistic_correct_text">Правильные ответы</p>
          </div>
          <div class="sprint--end__statistic_error">
            <p class="sprint--end__statistic_error_text">Ответы с ошибками</p>
          </div>
        </div>
        <div class ="sprint--end__slide">
          <span class="sprint--end__slide_main active"></span>
          <span class="sprint--end__slide_statistic"></span>
        </div>
      </section>
    </div>
    `;
    return view;
  },

  afterRender: () => {
    const { model } = Sprint.settings;
    Game.startGame(timerw);
    let data = JSON.parse(localStorage.getItem('data'));
    if (data == null) {
      data = [];
      localStorage.setItem('data', JSON.stringify(data));
      data = JSON.parse(localStorage.getItem('data'));
    }
    
    generateWord(model, 0);
  },
};

export default Sprint;
