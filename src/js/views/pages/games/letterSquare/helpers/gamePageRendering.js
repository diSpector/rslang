export default function gamePageRendering() {
  return `
    <section class="letterSquare">
      <div class="letterSquare--container">
      <div class="letterSquare--playingField"></div>
      <div id="words" class="letterSquare--wordList">
        <div class="letterSquare--wordList__list">
          <div class="letterSquare--wordList__titleList">
          <div class="letterSquare--wordList__title">Спрятанные слова:</div>
          </div>
        </div>
        <button class="letterSquare---wordList__btnCheck">Найдено слово</button>
      </div>
    </div>
    <div class="letterSquare--container letterSquare--score">
      <span> </span>
      <span> </span>
    </div>
    <!--<button class="letterSquare--btn__nextLevel">Следующий уровень</button>-->
    </section>
        `;
}
