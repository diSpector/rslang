import '../../../../../css/pages/games/Sprint/Sprint.scss';
import Utils from '../../../../services/Utils';

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
            <span></span>
            <span></span>
            <span></span>
          </div>
          <img class="list" src="./img/list.png" alt="">
          <img class="list2" src="./img/list2.png" alt="">
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
    const game = document.querySelector('.game__buttons'); //

    game.addEventListener('click', () => {
      console.log('clicked!');
    });
    console.log('Im afterRender!');
  },
};

export default Sprint;
