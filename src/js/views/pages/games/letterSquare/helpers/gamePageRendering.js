export default function gamePageRendering() {
  return `
  <section class="allGames__startScreen letterSquare">
    <h1 class="allGames__heading">Буквенный квадрат</h1>
      <p class="allGames--description">Буквенный квадрат — классическое упражнение для запоминания новых слов.
      Слова могут располагаться слева направо, сверху вниз и наоборот соответственно. 
      Ваша задача — найти все за две минуты!</p>
    <button class="allGames--startBtn  letterSquare--btn__startBtn">Начать</button>
  </section>

    <section class="letterSquare letterSquare__game letterSquare-hidden"">
      <span id="timer">02:00</span>'
      <div class="letterSquare--container">
      <div class="letterSquare--playingField"></div>
      <div id="words" class="letterSquare--wordList">
        <div class="letterSquare--wordList__list">
          <div class="letterSquare--wordList__titleList">
          <div class="letterSquare--wordList__title">Спрятанные слова:</div>
          </div>
        </div>
        <button class="letterSquare--wordList__btnCheck">Найдено слово</button>
        <button class="letterSquare--wordList__btnRemove">Сброс</button>
      </div>
    </div>
    </section>

    <section class="letterSquare letterSquare__statistic letterSquare-hidden">
      <div class="letterSquare--statistic__card">
        <div class="letterSquare--statistic__title">
        <div class="letterSquare--wordList__title">Статистика игры</div>
        </div>
        <div class="letterSquare--statistic__numberWordsFound">Найденные слова: </div>
        <div class="letterSquare--statistic__numberWordsNotFound">Ненайденные слова: </div>
        <button class="letterSquare--statistic__button--next" onclick="document.location.reload()">Играть снова</button>
        <button class="letterSquare--statistic__button--back" onclick="location.href='/'">Перейти на главную страницу</button>
      </div>
    </section>
        `;
}
