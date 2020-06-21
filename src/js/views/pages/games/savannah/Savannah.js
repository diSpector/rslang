import '../../../../../css/pages/games/savannah/savannah.scss';
import '../../../../../css/pages/games/allGames.scss';

import Utils from '../../../../services/Utils';
import Game from '../Game';

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
                <div class="savannah--game__answers-list">
                    <div class="savannah--game__answer"><span>1</span>неправильно</div>
                    <div class="savannah--game__answer"><span>2</span>правильно</div>
                    <div class="savannah--game__answer"><span>3</span>неправильно</div>
                    <div class="savannah--game__answer"><span>4</span>неправильно</div>
                </div>
            </div>
        </section>
    </div>
    `;

    return view;
  },

  afterRender: async () => {
    Game.startGame();
  },
};

export default Savannah;
