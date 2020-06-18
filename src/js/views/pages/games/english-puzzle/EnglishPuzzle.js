import '../../../../../css/pages/games/english-puzzle/english-puzzle.scss';

const EnglishPuzzle = {
  render: () => `
  <div class="game">
  <div class="game__background"></div>
  <div class="logout"><div class="logout__button"></div></div>
  <div class="field">
    <div class="menu">
      <div class="controls">
        <div class="menu__level">
          <div class="level__title">Level:</div>
          <div class="level__list">
            <div class="level__current">1</div>
            <div class="level__menu dropdown__menu hidden">
              <div class="menu__item active" data-level="1">1</div>
            </div>
          </div>
        </div>

        <div class="menu__page">
          <div class="page__title">Page:</div>
          <div class="page__list">
            <div class="page__current">1</div>
            <div class="page__menu dropdown__menu hidden">
              <div class="menu__item active" data-page="1">1</div>
            </div>
          </div>
        </div>
      </div>
      <div class="tips">
        <div class="tip__button autosound pushed" data-tip="autosound" title="Autoplay phrase"></div>
        <div class="tip__button translate  pushed" data-tip="translate" title="Translation for phrase"></div>
        <div class="tip__button audio  pushed" data-tip="audio" title="Listen pronunciation"></div>
        <div class="tip__button picture  pushed" data-tip="picture" title="Picture tip"></div>
      </div>
    </div>
    <div class="sound__block">
      <div class="sound__icon disabled"></div>
    </div>
    <div class="translation__block">word translate</div>
    <div class="phrases">
      <div class="phrase">
        <div class="number" data-round="1">1</div>
        <div class="phrase__words">
          <div class="phrase__word">test</div>
        </div>
      </div>
      <div class="phrase">
        <div class="number number__current">1</div>
        <div class="phrase__words empty round__done">
          <div class="phrase__word"
            style="width:100px;"
            data-order-task="1"
            data-order-round="1"
          >test</div>
        </div>
      </div>
    </div>
    <div class="task">
      <div class="task__words">
        <div class="task__word" data-order-task="1">test</div>
      </div>
    </div>
    <div class="game__buttons">
      <div class="game__button idk" data-button="idk">I don't know</div>
      <div class="game__button check" data-button="check">Check</div>
      <div class="game__button cont" data-button="cont">Continue</div>
      <div class="game__button res" data-button="res">Results</div>
    </div>
  </div>
</div>
    `,

  afterRender: () => {
    const game = document.querySelector('.game__buttons'); //

    game.addEventListener('click', () => {
      console.log('clicked!');
    });
    console.log('Im afterRender!');
  },
};

export default EnglishPuzzle;

{/* <div class="game">
  <div class="game__background"></div>
  <div class="logout"><div class="logout__button"></div></div>
  <div class="field">
    <div class="menu">
      <div class="controls">
        <div class="menu__level">
          <div class="level__title">Level:</div>
          <div class="level__list">
            <div class="level__current">1</div>
            <div class="level__menu dropdown__menu hidden">
              <div class="menu__item active" data-level="1">1</div>
            </div>
          </div>
        </div>

        <div class="menu__page">
          <div class="page__title">Page:</div>
          <div class="page__list">
            <div class="page__current">1</div>
            <div class="page__menu dropdown__menu hidden">
              <div class="menu__item active" data-page="1">1</div>
            </div>
          </div>
        </div>
      </div>
      <div class="tips">
        <div class="tip__button autosound pushed" data-tip="autosound" title="Autoplay phrase"></div>
        <div class="tip__button translate  pushed" data-tip="translate" title="Translation for phrase"></div>
        <div class="tip__button audio  pushed" data-tip="audio" title="Listen pronunciation"></div>
        <div class="tip__button picture  pushed" data-tip="picture" title="Picture tip"></div>
      </div>
    </div>
    <div class="sound__block">
      <div class="sound__icon disabled"></div>
    </div>
    <div class="translation__block">word translate</div>
    <div class="phrases">
      <div class="phrase">
        <div class="number" data-round="1">1</div>
        <div class="phrase__words">
          <div class="phrase__word">test</div>
        </div>
      </div>
      <div class="phrase">
        <div class="number number__current">1</div>
        <div class="phrase__words empty round__done">
          <div class="phrase__word"
            style="width:100px;"
            data-order-task="1"
            data-order-round="1"
          >test</div>
        </div>
      </div>
    </div>
    <div class="task">
      <div class="task__words">
        <div class="task__word" data-order-task="1">test</div>
      </div>
    </div>
    <div class="game__buttons">
      <div class="game__button idk" data-button="idk">I don't know</div>
      <div class="game__button check" data-button="check">Check</div>
      <div class="game__button cont" data-button="cont">Continue</div>
      <div class="game__button res" data-button="res">Results</div>
    </div>
  </div>
</div> */}