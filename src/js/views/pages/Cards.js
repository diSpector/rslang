import '../../../css/pages/learn.scss';
import '../../../css/pages/settings.scss';
import CardsHandler from './CardsHandler';

const Cards = {
  // settings: {
  //   newWordsPerDay: 10, // Количество новых слов в день
  //   maxWordsPerDay: 30, // Максимальное количество карточек в день
  //   isWordTranslate: false, // Перевод слова
  //   isTextMeaning: false, // Предложение с объяснением значения слова
  //   isTextExample: false, // Предложение с примером использования изучаемого слова
  //   isTextMeaningTranslate: false, // Перевод предложения с объяснением значения слова
  //   isTextExampleTranslate: false, // Перевод предложения с примером использования слова
  //   isTranscription: false, // Транскрипция слова
  //   isImage: false, // Картинка-ассоциация
  //   isAnswerButton: false, // Кнопка "Показать ответ"
  //   isDeleteWordButton: false, // Кнопка "Удалить слово из изучения"
  //   isMoveToDifficultButton: false, // Кнопка - поместить слово в группу «Сложные»
  //   isIntervalButtons: false, // Блок кнопок для интервального повторения
  // },
  settings: null,
  currentWord: null,
  dayWords: null,
  model: null,

  render: async () => {
    const view = `
    <div class="learn  wrapper">
        <section class="learn--progress">
            <div class="learn--progress__done">10</div>
            <div class="learn--progress__background">
                <div class="learn--progress__bar"></div>
            </div>
            <div class="learn--progress__total">30</div>
            </section>
        </section>

        <section class="learn--card">
            <header class="learn--card__header">
                <div class="learn--card__icon  learn--card__icon-book" title="Включить/выключить отбражение перевода предложений"></div>
                <div class="learn--card__icon  learn--card__icon-headphones" title="Включить/выключить автовоспроизведение звука"></div>
                <div class="learn--card__icon  learn--card__icon-brain" title="Поместить слово в группу «Сложные»"></div>
                <div class="learn--card__icon  learn--card__icon-delete" title="Удалить слово из изучения"></div>
                <div class="learn--card__icon  learn--card__icon-settings" title="Настройки"></div>
            </header>
            <main class="learn--card__content">
                <div class="learn--card__wrapper">
                    <img class="learn--card__image">
                    <div class="learn--card__sentences">
                        <p class="learn--card__textMeaning"></p>
                        <p class="learn--card__textMeaningTranslate"></p>
                        <p class="learn--card__textExample"></p>
                        <p class="learn--card__textExampleTranslate"></p>
                    </div>
                </div>

                <div class="learn--card__inputWrapper">
                    <div class="learn--card__input" contenteditable></div>
                    <div class="learn--card__enterAnswer" title="Ввести слово"></div>
                </div>

                <p class="learn--card__transcription  learn--card__transcription-hidden"></p>
                <p class="learn--card__wordTranslate"></p>
            </main>
            <footer class="learn--card__complexity learn--card__complexity-hidden">
                <span class="learn--card__complexity-repeat">Снова</span>
                <span class="learn--card__complexity-hard">Трудно</span>
                <span class="learn--card__complexity-well">Хорошо</span>
                <span class="learn--card__complexity-easy">Легко</span>
            </footer>
        </section>

        <div class="learn--buttons">
            <button class="learn--button  learn--button-show">Показать ответ</button>
            <button class="learn--button  learn--button-next learn--button-hidden">Дальше</button>
        </div>
    </div>

    <div class="settings">
        <div class="settings--closeBtn"></div>
        <h2 class="settings--heading">Настройки</h2>

        <form class="settings--form" action="#" method="POST">
        <fieldset>
            <legend>Слова для изучения</legend>
            <div class="settings__error  settings__error-max">Количество новых слов не может быть больше максимального количества карточек</div>

            <div class="settings__item">
                <input type="number" id="newWordsPerDay" min="10" max="30" value="15" required>
                <label for="newWordsPerDay">Количество новых слов в день</label>
            </div>

            <div class="settings__item">
                <input type="number" id="maxWordsPerDay" min="10" max="50" value="30" required>
                <label for="maxWordsPerDay">Максимальное количество карточек в день</label>
            </div>
        </fieldset>

        <fieldset>
            <legend>Информация на карточке</legend>
            <div class="settings__error  settings__error-info">Необходимо выбрать один из вариантов</div>

            <div class="settings__item">
              <input type="checkbox" id="isWordTranslate" checked>
              <label for="isWordTranslate">Перевод слова</label>
            </div>

            <div class="settings__item">
              <input type="checkbox" id="isTextMeaning" checked>
              <label for="isTextMeaning">Предложение с объяснением значения слова</label>
            </div>

            <div class="settings__item">
              <input type="checkbox" id="isTextExample" checked>
              <label for="isTextExample">Предложение с примером использования изучаемого слова</label>
            </div>
        </fieldset>
        
        <fieldset>
            <legend>Дополнительные элементы</legend>

            <div class="settings__item">
              <input type="checkbox" id="isTranscription">
              <label for="isTranscription">Транскрипция слова (появится после угадывания слова)</label>
            </div>

            <div class="settings__item">
              <input type="checkbox" id="isImage" checked>
              <label for="isImage">Картинка-ассоциация</label>
            </div>
        </fieldset>
        
        <fieldset>
            <legend>Кнопки (дополнительный функционал)</legend>

            <div class="settings__item">
              <input type="checkbox" id="isAnswerButton" checked>
              <label for="isAnswerButton">Показать ответ</label>
            </div>

            <div class="settings__item">
              <input type="checkbox" id="isDeleteWordButton" checked>
              <label for="isDeleteWordButton">Удалить слово из изучения</label>
            </div>

            <div class="settings__item">
              <input type="checkbox" id="isMoveToDifficultButton" checked>
              <label for="isMoveToDifficultButton">Поместить слово в группу «Сложные»</label>
            </div>

            <div class="settings__item">
              <input type="checkbox" id="isIntervalButtons" checked>
              <label for="isIntervalButtons">Блок кнопок для интервального повторения</label>
            </div>
        </fieldset>

        <button class="settings__saveButton" type="submit">Сохранить</button>
        </form>
    </div>
    `;

    return view;
  },

  showSettingsToggle() {
    const settings = document.querySelector('.settings');
    const settingsBtn = document.querySelector('.learn--card__icon-settings');
    settingsBtn.addEventListener('click', () => settings.classList.toggle('settings-open'));
  },

  closeSettings() {
    const settings = document.querySelector('.settings');
    const closeBtn = document.querySelector('.settings--closeBtn');
    closeBtn.addEventListener('click', () => settings.classList.remove('settings-open'));
  },

  isInfoChecked() {
    const isWordTranslate = document.querySelector('#isWordTranslate').checked;
    const isTextMeaning = document.querySelector('#isTextMeaning').checked;
    const isTextExample = document.querySelector('#isTextExample').checked;

    return !!((isWordTranslate || isTextMeaning || isTextExample));
  },

  // is maxWordsPerDay bigger than newWordsPerDay
  isMaxBiggerThanNew() {
    const maxWordsPerDay = document.querySelector('#maxWordsPerDay').value;
    const newWordsPerDay = document.querySelector('#newWordsPerDay').value;

    return (maxWordsPerDay >= newWordsPerDay);
  },

  showError(errorClass) {
    const error = document.querySelector(`.${errorClass}`);
    error.classList.add('settings__error-show');
  },

  hideError(errorClass) {
    const error = document.querySelector(`.${errorClass}`);
    error.classList.remove('settings__error-show');
  },

  changeSettings() {
    document.querySelector('.settings').onchange = (event) => {
      const key = event.target.id;

      if (event.target.type === 'checkbox') {
        if (event.target.checked) {
          this.settings[key] = true;
        } else {
          this.settings[key] = false;
        }
      }

      if (event.target.type === 'number') {
        this.settings[key] = Number(event.target.value);
      }

      console.log('settings', this.settings);
    };
  },

  // валидация настроек
  isValid() {
    this.hideError('settings__error-info');
    this.hideError('settings__error-max');

    if (!this.isMaxBiggerThanNew()) {
      this.showError('settings__error-max');
      return false;
    }

    if (!this.isInfoChecked()) {
      this.showError('settings__error-info');
      return false;
    }

    return true;
  },

  saveSettings(model) {
    const form = document.querySelector('.settings--form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.hideError('settings__error-info');
      this.hideError('settings__error-max');

      if (this.isValid()) {
        model.saveCardsSettings(this.settings);
        console.log('saved settings', this.settings);
        Cards.renderCard();
      }
    });
  },

  renderSettings() {
    document.querySelector('#newWordsPerDay').value = this.settings.newWordsPerDay;
    document.querySelector('#maxWordsPerDay').value = this.settings.maxWordsPerDay;

    document.querySelector('#isWordTranslate').checked = this.settings.isWordTranslate;
    document.querySelector('#isTextMeaning').checked = this.settings.isTextMeaning;
    document.querySelector('#isTextExample').checked = this.settings.isTextExample;

    document.querySelector('#isTranscription').checked = this.settings.isTranscription;
    document.querySelector('#isImage').checked = this.settings.isImage;

    document.querySelector('#isAnswerButton').checked = this.settings.isAnswerButton;
    document.querySelector('#isDeleteWordButton').checked = this.settings.isDeleteWordButton;
    document.querySelector('#isMoveToDifficultButton').checked = this.settings.isMoveToDifficultButton;
    document.querySelector('#isIntervalButtons').checked = this.settings.isIntervalButtons;
  },

  initSettings(model) {
    Cards.showSettingsToggle();
    Cards.closeSettings();

    Cards.renderSettings();
    Cards.changeSettings();
    Cards.saveSettings(model);
  },

  renderElement(flag1, flag2, elementClass, hiddenClass, innerHtml = null, src = null) {
    const element = document.querySelector(`.${elementClass}`);
    if (flag1 || flag2) {
      element.classList.remove(hiddenClass);
      if (innerHtml) element.innerHTML = innerHtml;
      if (src) element.setAttribute('src', src);
    } else {
      element.classList.add(hiddenClass);
    }
  },

  clearTranslation(elementClass) {
    const element = document.querySelector(`.${elementClass}`);
    element.textContent = '';
  },

  renderCard() {
    // информация на карточке
    this.renderElement(Cards.settings.isWordTranslate, null, 'learn--card__wordTranslate', 'learn--card__wordTranslate-hidden', this.currentWord.wordTranslate);
    this.renderElement(Cards.settings.isTextMeaning, null, 'learn--card__textMeaning', 'learn--card__textMeaning-hidden', this.currentWord.textMeaning);
    this.renderElement(Cards.settings.isTextExample, null, 'learn--card__textExample', 'learn--card__textExample-hidden', this.currentWord.textExample);

    // дополнительные элементы
    this.renderElement(Cards.settings.isImage, null, 'learn--card__image', 'learn--card__image-hidden', null, this.currentWord.image);

    // кнопки
    this.renderElement(Cards.settings.isDeleteWordButton, null, 'learn--card__icon-delete', 'learn--card__icon-hidden');
    this.renderElement(Cards.settings.isMoveToDifficultButton, null, 'learn--card__icon-brain', 'learn--card__icon-hidden');
    this.renderElement(Cards.settings.isAnswerButton, null, 'learn--button-show', 'learn--button-hidden');
    // this.renderElement(Cards.settings.isIntervalButtons, null, 'learn--card__complexity', 'learn--card__complexity-hidden');

    // кнопка "вкл/выкл отображение переводов предложения"
    this.renderElement(Cards.settings.isTextMeaning, Cards.settings.isTextExample, 'learn--card__icon-book', 'learn--card__icon-hidden');

    // очистить и скрыть переводы
    this.clearTranslation('learn--card__textMeaningTranslate');
    this.clearTranslation('learn--card__textExampleTranslate');
  },

  generateNextCard: async () => {
    const ourWordObj = Cards.dayWords.pop();
    Cards.currentWord = await Cards.model.getNextWord(ourWordObj);
    console.log(Cards.currentWord, 'backend');
    console.log(ourWordObj, 'our word');

    Cards.renderCard();

    CardsHandler.initCardHandler(Cards.currentWord, ourWordObj,
      Cards.model, Cards.generateNextCard, Cards.settings);
  },

  afterRender: async (model) => {
    await model.loginUser({ email: '66group@gmail.com', password: 'Gfhjkm_123' });
    const settingsGetRaw = await model.getSettings();
    const { data: settings } = settingsGetRaw;
    Cards.settings = settings;
    Cards.model = model;

    Cards.dayWords = await model.getWordsForDay();
    const ourWordObj = Cards.dayWords.pop();
    Cards.currentWord = await model.getNextWord(ourWordObj);
    console.log(Cards.currentWord, 'backend');
    console.log(ourWordObj, 'our word');

    Cards.initSettings(model);
    Cards.renderCard();

    CardsHandler.initCardHandler(Cards.currentWord, ourWordObj, model, Cards.generateNextCard, Cards.settings);
  },
};

export default Cards;