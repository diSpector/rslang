import '../../../../../css/pages/games/letterSquare/letterSquare.scss';
// import '../../../../../css/pages/games/allGames.scss';
import Utils from '../../../../services/Utils';

const letterSquare = {

  beforeRender() {
    this.clearHeaderAndFooter();
  },

  clearHeaderAndFooter: () => {
    Utils.clearBlock('.header');
    Utils.clearBlock('.footer');
  },

  render: () => {
    letterSquare.beforeRender();

    const view = `
    <div class="letterSquare  allGames">
    <section class="letterSquare--startScreen">
        <h1 class="allGames--heading">Буквенный квадрат</h1>
        <p class="allGames--description">Буквенный квадрат - классическое упражнение для запоминания новых слов.
        Слова могут располагаться слева направо, сверху вниз и наоборот соответственно. 
        Ваша задача - найти все!</p>
        <button class="allGames--startBtn  letterSquare--btn__startBtn">Начать</button>
    </section>

    <section class="letterSquare--playScreen">
    <div class="letterSquare--container">
      <div class="letterSquare--playingField"></div>
      <div class="letterSquare--wordList">
        <ul class="letterSquare--wordList__list"></ul>
        <button class="letterSquare---wordList__btnCheck">Найдено слово</button>
      </div>
    </div>
    <div class="letterSquare--container letterSquare--score">
      <span>Найдено слов: </span>
      <span>Осталось: </span>
    </div>
    <button class="letterSquare--btn__nextLevel">Следующий уровень</button>
    </section>
      `;
    return view;
  },

  afterRender: () => {
    const game = document.querySelector('.game__buttons');

    game.addEventListener('click', () => {
      console.log('clicked!');
    });

    console.log('Im afterRender!');
  },
};

export default letterSquare;
