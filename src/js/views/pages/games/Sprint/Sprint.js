import '../../../../../css/pages/games/Sprint/Sprint.scss';
import Utils from '../../../../services/Utils';
import game from './SprintGame';

const Sprint = {

  beforeRender() {
    this.clearHeaderAndFooter();
  },

  clearHeaderAndFooter: () => {
    Utils.clearBlock('.header');
    Utils.clearBlock('.footer');
  },

  render: () => {
    Sprint.beforeRender();

    const view = `
    <div class="sprint">
      <div class="sprint--game">
        <div class="sprint--game__result">0</div>
        <div class="sprint--game__card">
          <div class="sprint--card__title">
            <span class="sprint--card__title_check"></span>
            <span class="sprint--card__title_check"></span>
            <span class="sprint--card__title_check"></span>
          </div>
          <div class="sprint--card__word">
            <p class="word">word</p>
            <p class="translate">слово</p>
          </div>
          <div class="sprint--card__button">
            <button class="sprint--button__correct">Верно</button>
            <button class="sprint--button__error">Неверно</button>
          </div>
        </div>
        <div class="sprint--game__arrow"></div>
        <div class="sprint--game__time">60</div>
      </div>
    </div>
    `;
    return view;
  },

  afterRender: () => {
    console.log('Im afterRender!');
    game();
  },
};

export default Sprint;
