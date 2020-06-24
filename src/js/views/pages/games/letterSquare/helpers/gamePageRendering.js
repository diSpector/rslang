export default function gamePageRendering() {
  return `

  <section class="allGames__startScreen">
    <h1 class="allGames__heading">Буквенный квадрат</h1>
      <p class="allGames--description">Буквенный квадрат - классическое упражнение для запоминания новых слов.
      Слова могут располагаться слева направо, сверху вниз и наоборот соответственно. 
      Ваша задача - найти все!</p>
    <button class="allGames--startBtn  letterSquare--btn__startBtn">Начать</button>
  </section>

    <section class="letterSquare allGames__timerScreen-hidden">
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
