export default function gamePageRendering() {
  return `

  <section class="allGames__startScreen letterSquare">
    <h1 class="allGames__heading">Буквенный квадрат</h1>
      <p class="allGames--description">Буквенный квадрат - классическое упражнение для запоминания новых слов.
      Слова могут располагаться слева направо, сверху вниз и наоборот соответственно. 
      Ваша задача - найти все!</p>
      <p>Небольшой иснтруктаж:</p>
      <p>1. Кликаем по буквам в правильном порядке</p>
      <p>2. При собранном слове жмем "Найдено слово"</p>
      <p>3. На поиск всех слов у вас одна минута</p>
    <button class="allGames--startBtn  letterSquare--btn__startBtn">Начать</button>
  </section>

    <section class="letterSquare letterSquare__game letterSquare-hidden"">
      <span id="timer" style="color: #f00; font-size: 150%; font-weight: bold;">00:10</span>
      <div class="letterSquare--container">
      <div class="letterSquare--playingField"></div>
      <div id="words" class="letterSquare--wordList">
        <div class="letterSquare--wordList__list">
          <div class="letterSquare--wordList__titleList">
          <div class="letterSquare--wordList__title">Спрятанные слова:</div>
          </div>
        </div>
        <button class="letterSquare---wordList__btnCheck">Найдено слово</button>
        <button class="letterSquare---wordList__btnRemove">Сброс</button>
      </div>
    </div>
    </section>

    <section class="letterSquare letterSquare__statistic letterSquare-hidden">
      <div class="statistic__card">
        <div class="statistic__title">
        <div class="letterSquare--wordList__title">Статистика игры</div>
        </div>
        <div class="statistic__time">Потраченное время: </div>
        <div class="statistic__numberWordsFound">Найдено слов: </div>
        <button class="statistic__button--next">Играть снова</button>
        <button class="statistic__button--back">Перейти на главную страницу</button>
      </div>
    </section>
        `;
}
