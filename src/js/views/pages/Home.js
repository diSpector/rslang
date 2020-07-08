import '../../../css/pages/learn.scss';
import '../../../css/pages/settings.scss';
import HomeHandler from './HomeHandler';

const Home = {
  settings: {
    newWordsPerDay: 10, // Количество новых слов в день
    maxWordsPerDay: 30, // Максимальное количество карточек в день
    isWordTranslate: true, // Перевод слова
    isTextMeaning: true, // Предложение с объяснением значения слова
    isTextExample: true, // Предложение с примером использования изучаемого слова
    isTextMeaningTranslate: false, // Перевод предложения с объяснением значения слова
    isTextExampleTranslate: false, // Перевод предложения с примером использования изучаемого слова
    isTranscription: false, // Транскрипция слова
    isImage: true, // Картинка-ассоциация
    isAnswerButton: true, // Кнопка "Показать ответ"
    isDeleteWordButton: true, // Кнопка "Удалить слово из изучения"
    isMoveToDifficultButton: true, // Кнопка - поместить слово в группу «Сложные»
    isIntervalButtons: true, // Блок кнопок для интервального повторения
  },
  currentWord: null,

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
                <div class="learn--card__icon  learn--card__icon-inactive  learn--card__icon-headphones" title="Включить/выключить автовоспроизведение звука"></div>
                <div class="learn--card__icon  learn--card__icon-brain" title="Поместить слово в группу «Сложные»"></div>
                <div class="learn--card__icon  learn--card__icon-delete" title="Удалить слово из изучения"></div>
                <div class="learn--card__icon  learn--card__icon-settings" title="Настройки"></div>
            </header>
            <main class="learn--card__content">
                <div class="learn--card__wrapper">
                    <img class="learn--card__image" src="https://raw.githubusercontent.com/dispector/rslang-data/master/files/06_0102.jpg">
                    <div class="learn--card__sentences">
                        <p class="learn--card__textMeaning">An <i>attribute</i> is a characteristic of a person or thing.</p>
                        <p class="learn--card__textMeaningTranslate  learn--card__textMeaningTranslate-hidden">Атрибут является характеристикой человека или вещи</p>
                        <p class="learn--card__textExample">He isn’t very clever, but he does have some other positive <b>attributes</b>.</p>
                        <p class="learn--card__textExampleTranslate  learn--card__textExampleTranslate-hidden">Он не очень умен, но у него есть некоторые другие положительные качества</p>
                    </div>
                </div>
                <input class="learn--card__input" type="text">
                <p class="learn--card__transcription  learn--card__transcription-hidden">[ǽtribjùːt]</p>
                <p class="learn--card__wordTranslate">атрибут</p>
            </main>
            <footer class="learn--card__complexity">
                <span class="learn--card__complexity-repeat">Снова</span>
                <span class="learn--card__complexity-hard">Трудно</span>
                <span class="learn--card__complexity-well">Хорошо</span>
                <span class="learn--card__complexity-easy">Легко</span>
            </footer>
        </section>

        <div class="learn--buttons">
            <button class="learn--button  learn--button-show">Показать ответ</button>
            <button class="learn--button  learn--button-next">Дальше</button>
        </div>
    </div>

    <div class="settings">
        <div class="settings--closeBtn"></div>
        <h2>Настройки</h2>

        <form class="settings--form" action="#" method="POST">
        <fieldset>
            <legend>Слова для изучения</legend>

            <div class="settings__newWordsPerDay">
                <input type="number" id="newWordsPerDay" min="10" max="30" value="15" required>
                <label for="newWordsPerDay">Количество новых слов в день</label>
            </div>

            <div class="settings__maxWordsPerDay">
                <input type="number" id="maxWordsPerDay" min="10" max="50" value="30" required>
                <label for="maxWordsPerDay">Максимальное количество карточек в день</label>
            </div>
        </fieldset>

        <hr>

        <fieldset>
            <legend>Информация на карточке</legend>
            <div class="settings__error">Необходимо выбрать один из вариантов</div>

            <div class="settings__wordTranslate">
              <input type="checkbox" id="isWordTranslate" checked>
              <label for="isWordTranslate">Перевод слова</label>
            </div>

            <div class="settings__textMeaning">
              <input type="checkbox" id="isTextMeaning" checked>
              <label for="isTextMeaning">Предложение с объяснением значения слова</label>
            </div>

            <div class="settings__textExample">
              <input type="checkbox" id="isTextExample" checked>
              <label for="isTextExample">Предложение с примером использования изучаемого слова</label>
            </div>
        </fieldset>

        <hr>
        
        <fieldset>
            <legend>Дополнительные элементы</legend>

            <div class="settings__transcription">
              <input type="checkbox" id="isTranscription">
              <label for="isTranscription">Транскрипция слова (появится после угадывания слова)</label>
            </div>

            <div class="settings__image">
              <input type="checkbox" id="isImage" checked>
              <label for="isImage">Картинка-ассоциация</label>
            </div>
        </fieldset>

        <hr>
        
        <fieldset>
            <legend>Кнопки (дополнительный функционал)</legend>

            <div class="settings__showAnswer">
              <input type="checkbox" id="isAnswerButton" checked>
              <label for="isAnswerButton">Показать ответ</label>
            </div>

            <div class="settings__deleteWord">
              <input type="checkbox" id="isDeleteWordButton" checked>
              <label for="isDeleteWordButton">Удалить слово из изучения</label>
            </div>

            <div class="settings__difficult">
              <input type="checkbox" id="isMoveToDifficultButton" checked>
              <label for="isMoveToDifficultButton">Поместить слово в группу «Сложные»</label>
            </div>

            <div class="settings__intervalButtons">
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

  showError() {
    const error = document.querySelector('.settings__error');
    error.classList.add('settings__error-show');
  },

  hideError() {
    const error = document.querySelector('.settings__error');
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

  saveSettings() {
    const form = document.querySelector('.settings--form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.hideError();

      if (this.isInfoChecked()) {
        console.log('save settings to backend');
        Home.renderCard();
      } else {
        this.showError();
      }
    });
  },

  initSettings() {
    Home.showSettingsToggle();
    Home.closeSettings();

    Home.changeSettings();
    Home.saveSettings();
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

  renderCard() {
    // информация на карточке
    this.renderElement(Home.settings.isWordTranslate, null, 'learn--card__wordTranslate', 'learn--card__wordTranslate-hidden', this.currentWord.wordTranslate);
    this.renderElement(Home.settings.isTextMeaning, null, 'learn--card__textMeaning', 'learn--card__textMeaning-hidden', this.currentWord.textMeaning);
    this.renderElement(Home.settings.isTextExample, null, 'learn--card__textExample', 'learn--card__textExample-hidden', this.currentWord.textExample);

    // дополнительные элементы
    this.renderElement(Home.settings.isImage, null, 'learn--card__image', 'learn--card__image-hidden', null, this.currentWord.image);

    // кнопки
    this.renderElement(Home.settings.isDeleteWordButton, null, 'learn--card__icon-delete', 'learn--card__icon-hidden');
    this.renderElement(Home.settings.isMoveToDifficultButton, null, 'learn--card__icon-brain', 'learn--card__icon-hidden');
    this.renderElement(Home.settings.isAnswerButton, null, 'learn--button-show', 'learn--button-hidden');
    this.renderElement(Home.settings.isIntervalButtons, null, 'learn--card__complexity', 'learn--card__complexity-hidden');
    // переводы предложений
    this.renderElement(Home.settings.isTextMeaning, Home.settings.isTextExample, 'learn--card__icon-book', 'learn--card__icon-hidden');
  },

  afterRender: async (model) => {
    Home.currentWord = await model.getNewUnknownWord();
    console.log(Home.currentWord);

    Home.initSettings();
    Home.renderCard();

    HomeHandler.initHomeHandler();
  },

};

export default Home;
