import '../../../../../css/pages/games/english-puzzle/english-puzzle.scss';
import Utils from '../../../../services/Utils';
import Model from './helpers/Model';
import WordsHelper from './helpers/WordsHelper';

const EnglishPuzzle = {

  settings: {
    game: {}, /** {level, page, round } */
    words: [
      /** allWords: [ {id, group, page, word, translate, textExample, textExampleTranslate ...}]  */
      /** solvedWords: [] - слова (предложения), которые пользователь уже угадал*/
      /** currentWord: {} - слово (предложение) текущего раунда */
      /** shuffledCurrentWord: [] - слова текущего предложения в случайном порядке */
    ],
  },

  beforeRender: async () => {
    EnglishPuzzle.clearHeaderAndFooter();
    EnglishPuzzle.settings.game = await Model.getCurrentLevelPageRound();

    const { game: gameSettings } = EnglishPuzzle.settings;
    const words = await Model.getWordsFromBackend(gameSettings.level, gameSettings.page);
    const allWords = WordsHelper.correctWords(words);
    const solvedWords = WordsHelper.getSolvedBySettings(allWords, gameSettings.round);
    const currentWord = WordsHelper.getCurrentBySettings(allWords, gameSettings.round);
    const shuffledCurrentWord = WordsHelper.shuffleCurrent(currentWord);

    EnglishPuzzle.settings.words = {
      allWords: allWords,
      solvedWords: solvedWords,
      currentWord: currentWord,
      shuffledCurrentWord: shuffledCurrentWord,
    };

    // EnglishPuzzle.settings = await Model.getWordsFromGithub(1, 10, 10);
    // EnglishPuzzle.settings.words = await Model.getWordsFromBackend(1, 2);
    // EnglishPuzzle.settings.words = await Model.getWordsFromGithub(1);
  },

  clearHeaderAndFooter: () => {
    Utils.clearBlock('.header');
    Utils.clearBlock('.footer');
  },

  render: async () => {
    await EnglishPuzzle.beforeRender();
    console.log('words', EnglishPuzzle.settings.words);
    console.log('game settings', EnglishPuzzle.settings.game);
    const view = `
    <div class="englishPuzzle">
    <div class="englishPuzzle__background"></div>
    <div class="englishPuzzle__field">
      <div class="englishPuzzle__menu menu">
        <div class="englishPuzzle__controls controls">
          <div class="menu__level">
            <div class="level__title">Level:</div>
            <div class="level__list">
              <div class="level__current">1</div>
              <div class="level__menu dropdown__menu dropdown__menu-hidden">
              </div>
            </div>
          </div>
  
          <div class="menu__page">
            <div class="page__title">Page:</div>
            <div class="page__list">
              <div class="page__current">1</div>
              <div class="page__menu dropdown__menu dropdown__menu-hidden">
              </div>
            </div>
          </div>
        </div>
        <div class="menu__tips tips">
          <div class="tips__button tips__button-autosound tips__button-pushed" data-tip="autosound" title="Autoplay phrase"></div>
          <div class="tips__button tips__button-translate tips__button-pushed" data-tip="translate" title="Translation for phrase"></div>
          <div class="tips__button tips__button-audio tips__button-pushed" data-tip="audio" title="Listen pronunciation"></div>
          <div class="tips__button tips__button-picture tips__button-pushed" data-tip="picture" title="Picture tip"></div>
        </div>
      </div>
      <div class="englishPuzzle__sound sound">
        <div class="sound__icon sound__icon-disabled"></div>
      </div>
      <div class="englishPuzzle__translation">word translate</div>

      <div class="englishPuzzle__phrases phrases">
        
        <div class="englishPuzzle__phrases-done"></div>
        
        <div class="englishPuzzle__phrases-round"></div>
          
        <div class="englishPuzzle__task task">
          <div class="task__words"></div>
        </div>

      </div>

      <div class="englishPuzzle__buttons gameButtons">
        <div class="gameButtons__button gameButtons__button-idk" data-button="idk">I don't know</div>
        <div class="gameButtons__button gameButtons__button-check" data-button="check">Check</div>
        <div class="gameButtons__button gameButtons__button-cont" data-button="cont">Continue</div>
        <div class="gameButtons__button gameButtons__button-res" data-button="res">Results</div>
      </div>
    </div>
  </div>
      `;
    return view;
  },

  afterRender: () => {
    EnglishPuzzle.fillMenuLevels();
    EnglishPuzzle.fillMenuPages();
    EnglishPuzzle.fillDonePhrases();
    EnglishPuzzle.fillRoundPhrase();
    EnglishPuzzle.fillTaskPhrase();
    EnglishPuzzle.setButtons();
    EnglishPuzzle.addListeners();
  },

  fillMenuLevels() {
    const currentLevContainer = document.querySelector('.menu__level .level__current');
    const currentLevel = this.settings.game.level + 1;
    currentLevContainer.innerHTML = currentLevel;

    const menuLevel = document.querySelector('.level__menu.dropdown__menu');
    const levels = [...Array(6)];
    levels.forEach((level, i) => {
      const cssStyles = (i === (currentLevel - 1)) ? ['menu__item', 'active'] : 'menu__item';
      Utils.createBlockInside('div', cssStyles, menuLevel, i + 1, {}, { level: i });
    })
  },

  fillMenuPages() {
    const currentPageContainer = document.querySelector('.menu__page .page__current');
    const currentPage = this.settings.game.page + 1;
    currentPageContainer.innerHTML = currentPage;

    const menuPage = document.querySelector('.page__menu.dropdown__menu');
    const levels = [...Array(20)];
    levels.forEach((level, i) => {
      const cssStyles = (i === (currentPage - 1)) ? ['menu__item', 'active'] : 'menu__item';
      Utils.createBlockInside('div', cssStyles, menuPage, i + 1, {}, { page: i });
    })
  },

  /** установить начальную конфигурацию кнопок */
  setButtons() {
    const buttonsContainer = document.querySelector('.englishPuzzle__buttons.gameButtons')
    const idkButton = buttonsContainer.querySelector('.gameButtons__button-idk');
    const checkButton = buttonsContainer.querySelector('.gameButtons__button-check');
    const contButton = buttonsContainer.querySelector('.gameButtons__button-cont');
    const resButton = buttonsContainer.querySelector('.gameButtons__button-res');

    // кнопка "I dont know" на старте должна быть видна всегда
    if (idkButton.classList.contains('gameButtons__button-hidden')) {
      idkButton.classList.remove('gameButtons__button-hidden');
    }

    const hideButtonsArr = [checkButton, contButton, resButton];
    hideButtonsArr.forEach((button) => button.classList.add('gameButtons__button-hidden'));
  },

  /** наполнить поле с выполненными фразами */
  fillDonePhrases() {
    const donePhrasesContainer = document.querySelector('.englishPuzzle__phrases-done');
    const donePhrases = this.settings.words.solvedWords;

    donePhrases.forEach((phrase, i) => {
      const phraseBlock = Utils.createBlockInside('div', 'englishPuzzle__phrase');
      Utils.createBlockInside('div', 'phrase__number', phraseBlock, i + 1);
      const phraseWordsBlock = Utils.createBlockInside('div', 'phrase__words', phraseBlock);

      const wordsArr = phrase.textExample.split(' ');
      wordsArr.forEach((word) => Utils
        .createBlockInside('div', 'phrase__word', phraseWordsBlock, word));
      donePhrasesContainer.append(phraseBlock);
    });
  },

  /** наполнить поле для текущего раунда */
  fillRoundPhrase() {
    const wordsInRound = this.settings.words.shuffledCurrentWord.length;
    const doneRounds = this.settings.words.solvedWords.length;
    const roundPhrases = [...Array(wordsInRound)];

    const roundPhraseContainer = document.querySelector('.englishPuzzle__phrases-round');
    const roundPhraseInnerContainer = Utils.createBlockInside('div', 'englishPuzzle__phrase', roundPhraseContainer);
    Utils.createBlockInside('div', ['phrase__number', 'phrase__number-current'], roundPhraseInnerContainer, doneRounds + 1);
    const currentPhraseContainer = Utils.createBlockInside('div', 'phrase__words', roundPhraseInnerContainer);

    roundPhrases.forEach((word) => {
      Utils.createBlockInside('div', ['phrase__word', 'empty'], currentPhraseContainer, word);
    })
  },

  /** наполнить поле с заданием (для перемешанных слов) */
  fillTaskPhrase() {
    const shuffledCurrentWord = this.settings.words.shuffledCurrentWord;
    const taskPhraseContainer = document.querySelector('.englishPuzzle__task .task__words');
    shuffledCurrentWord.forEach((word) => {
      Utils
        .createBlockInside('div', 'task__word', taskPhraseContainer, word.text, {}, { orderTask: word.order + 1 });
    });
  },

  /** повесить слушатели событий */
  addListeners() {
    const taskWordsContainer = document.querySelector('.task__words');
    taskWordsContainer.addEventListener('click', this.processTaskWordClick);

    const roundWordsContainer = document.querySelector('.englishPuzzle__phrases-round .phrase__words');
    roundWordsContainer.addEventListener('click', this.processRoundWordClick);

    const buttonsContainer = document.querySelector('.englishPuzzle__buttons.gameButtons')
    const idkButton = buttonsContainer.querySelector('.gameButtons__button-idk');
    const checkButton = buttonsContainer.querySelector('.gameButtons__button-check');
    const contButton = buttonsContainer.querySelector('.gameButtons__button-cont');
    const resButton = buttonsContainer.querySelector('.gameButtons__button-res');

    idkButton.addEventListener('click', this.processIdkClick);
    checkButton.addEventListener('click', this.processCheckClick);
    contButton.addEventListener('click', this.processContClick);
    resButton.addEventListener('click', this.processResClick);

    const menuLevel = document.querySelector('.level__list');
    menuLevel.addEventListener('click', this.toggleLevels);

    const levelMenuItems = document.querySelector('.level__menu.dropdown__menu');
    levelMenuItems.addEventListener('click', this.changeLevel);

    const menuPage = document.querySelector('.page__list');
    menuPage.addEventListener('click', this.togglePages);

    const pageMenuItems = document.querySelector('.page__menu.dropdown__menu');
    pageMenuItems.addEventListener('click', this.changePage);

  },

  /** удалить все слушатели событий
   * листенеры автоматически удаляются при удалении эл-та и отсутствии ссылок, но...
  */
  removeListeners() {
    const taskWordsContainer = document.querySelector('.task__words');
    const roundWordsContainer = document.querySelector('.englishPuzzle__phrases-round .phrase__words');
    const buttonsContainer = document.querySelector('.englishPuzzle__buttons.gameButtons')
    const idkButton = buttonsContainer.querySelector('.gameButtons__button-idk');
    const checkButton = buttonsContainer.querySelector('.gameButtons__button-check');
    const contButton = buttonsContainer.querySelector('.gameButtons__button-cont');
    const resButton = buttonsContainer.querySelector('.gameButtons__button-res');
    const menuLevel = document.querySelector('.level__list');
    const levelMenuItems = document.querySelector('.level__menu.dropdown__menu');
    const menuPage = document.querySelector('.page__list');
    const pageMenuItems = document.querySelector('.page__menu.dropdown__menu');
    
    taskWordsContainer.removeEventListener('click', this.processTaskWordClick);
    roundWordsContainer.removeEventListener('click', this.processRoundWordClick);
    idkButton.removeEventListener('click', this.processIdkClick);
    checkButton.removeEventListener('click', this.processCheckClick);
    contButton.removeEventListener('click', this.processContClick);
    resButton.removeEventListener('click', this.processResClick);
    menuLevel.removeEventListener('click', this.toggleLevels);
    levelMenuItems.removeEventListener('click', this.changeLevel);
    menuPage.removeEventListener('click', this.togglePages);
    pageMenuItems.removeEventListener('click', this.changePage);
  },

  /** клик по уровню в меню */
  changeLevel: async ({target}) => {
    if (!target.classList.contains('menu__item')) {
      return;
    }
    const gameSettings = EnglishPuzzle.settings.game;

    const newLevel = parseInt(target.dataset.level, 10);
    const currentLevel = gameSettings.level;

    if (newLevel === currentLevel) {
      return;
    }

    const newGameSettings = Object.assign({}, {
      level: newLevel,
      page: 0,
      round: 0,
    });

    EnglishPuzzle.clearGameField();
    Model.saveNewLevelPageRound(newGameSettings); 
    await EnglishPuzzle.render(); 
    EnglishPuzzle.afterRender();
  },

    /** клик по странице в меню */
    changePage: async ({target}) => {
      if (!target.classList.contains('menu__item')) {
        return;
      }
      const gameSettings = EnglishPuzzle.settings.game;
  
      const newPage = parseInt(target.dataset.page, 10);
      const currentPage = gameSettings.page;
  
      if (newPage === currentPage) {
        return;
      }
  
      const newGameSettings = Object.assign({}, {
        level: gameSettings.level,
        page: newPage,
        round: 0,
      });
  
      EnglishPuzzle.clearGameField();
      Model.saveNewLevelPageRound(newGameSettings); 
      await EnglishPuzzle.render(); 
      EnglishPuzzle.afterRender();
    },

  /** показать/скрыть меню с выбором уровней */
  toggleLevels: () => {
    const menuContainer = document.querySelector('.level__menu.dropdown__menu');
    menuContainer.classList.toggle('dropdown__menu-hidden');
  },

  /** показать/скрыть меню с выбором страниц */
  togglePages: () => {
    const menuContainer = document.querySelector('.page__menu.dropdown__menu');
    menuContainer.classList.toggle('dropdown__menu-hidden');
  },

  /**
   * нажатие на кнопку "Continue":
   * 1) задать новый раунд,
   * 2) обновить угаданные и текущее слова на основе нового раунда
   * 3) перерендерить всё
   */
  processContClick: async () => {
    const { settings } = EnglishPuzzle;

    EnglishPuzzle.clearGameField();

    const newGameSettings = EnglishPuzzle.getNewLevelPageRound(settings.game);
    settings.game = Object.assign({}, newGameSettings);
    Model.saveNewLevelPageRound(newGameSettings);

    if (settings.game.round !== 0) { // не надо загружать новые слова
      EnglishPuzzle.updateWordsByRound(settings.game.round);
    } else { // загрузить новые 10 слов
      await EnglishPuzzle.render();
    }

    EnglishPuzzle.afterRender();

  },

  /** получить следующие level, page, round на основании текущих */
  getNewLevelPageRound(gameConfig) {
    const { level, page, round } = gameConfig;
    const maxLevel = 5;
    const maxPage = 19;
    const maxRound = 9;

    let newRound = round + 1;
    let newPage = page;
    let newLevel = level;

    if (newRound > maxRound) {
      newRound = 0;
      newPage = page + 1;
    }

    if (newPage > maxPage) {
      newPage = 0;
      newLevel = level + 1;
    }

    if (newLevel > maxLevel) {
      newLevel = 0;
      newPage = 0;
    }

    return {
      level: newLevel,
      page: newPage,
      round: newRound,
    };

  },

  updateWordsByRound(round) {
    const allWords = this.settings.words.allWords;
    const solvedWords = WordsHelper.getSolvedBySettings(allWords, round);
    const currentWord = WordsHelper.getCurrentBySettings(allWords, round);
    const shuffledCurrentWord = WordsHelper.shuffleCurrent(currentWord);

    EnglishPuzzle.settings.words = {
      allWords: allWords,
      solvedWords: solvedWords,
      currentWord: currentWord,
      shuffledCurrentWord: shuffledCurrentWord,
    };
  },

  /** перезагрузить поле - очистить и снять слушатели событий */
  clearGameField() {
    this.removeListeners();
    this.clearField();
  },

  /** очистить игровое поле - собранные слова, поле сбора, перемеш. слова */
  clearField() {
    const donePhrasesContainer = document.querySelector('.englishPuzzle__phrases-done');
    const roundPhraseContainer = document.querySelector('.englishPuzzle__phrases-round');
    const taskPhraseContainer = document.querySelector('.englishPuzzle__task .task__words');
    const menuLevelContainer = document.querySelector('.level__menu.dropdown__menu');
    const menuPageContainer = document.querySelector('.page__menu.dropdown__menu');

    const containers = [
      donePhrasesContainer, 
      roundPhraseContainer, 
      taskPhraseContainer, 
      menuLevelContainer, 
      menuPageContainer
    ];
    containers.forEach((cont) => cont.innerHTML = '');
  },

  /** нажатие на кнопку "I don't know":
   * 1) вставить слова в правильном порядке в поле сбора,
   * 2) удалить все слова из поля с перемешанными словами,
   * 3) снять слушатели кликов с поле сбора и перемешанных слов
   * 4) показать кнопку "Continue"
   */
  processIdkClick: () => {
    const roundWordsContainer = document.querySelector('.englishPuzzle__phrases-round .phrase__words');
    roundWordsContainer.innerHTML = '';

    const currentWordArr = EnglishPuzzle.settings.words.currentWord.textExample.split(' ');
    currentWordArr.forEach((word) =>
      Utils.createBlockInside('div', 'phrase__word', roundWordsContainer, word)
    );

    const taskWordsContainer = document.querySelector('.task__words');
    taskWordsContainer.innerHTML = '';

    currentWordArr.forEach(() =>
      Utils.createBlockInside('div', ['task__word', 'empty'], taskWordsContainer)
    );

    taskWordsContainer.removeEventListener('click', EnglishPuzzle.processTaskWordClick);
    roundWordsContainer.removeEventListener('click', EnglishPuzzle.processRoundWordClick);

    EnglishPuzzle.hideButton('idk');
    EnglishPuzzle.hideButton('check');
    EnglishPuzzle.showButton('cont');
  },

  /** нажатие на кнопку "Check" 
   * 1) подсветить правильные/неправильные слова,
   * 2) если предложение угадано верно, снять слушатели, показать/спрятать кнопки
  */
  processCheckClick: () => {
    const roundWordsContainer = document
      .querySelector('.englishPuzzle__phrases-round .phrase__words');
    const taskWordsContainer = document.querySelector('.task__words');

    const roundWordsElsArr = Array.from(roundWordsContainer.querySelectorAll('.phrase__word'));
    const roundWordsArr = roundWordsElsArr.map((element) => element.innerHTML);
    const currentWordArr = EnglishPuzzle.settings.words.currentWord.textExample.split(' ');

    let corrects = 0;
    roundWordsArr.forEach((word, i) => {
      const cond = (word === currentWordArr[i]);
      corrects = (cond) ? (corrects + 1) : corrects;
      const cssClass = (cond)
        ? 'phrase__word-correct'
        : 'phrase__word-incorrect';

      roundWordsElsArr[i].classList.add(cssClass);
    });

    if (corrects === currentWordArr.length) {
      taskWordsContainer.removeEventListener('click', EnglishPuzzle.processTaskWordClick);
      roundWordsContainer.removeEventListener('click', EnglishPuzzle.processRoundWordClick);

      EnglishPuzzle.hideButton('idk');
      EnglishPuzzle.hideButton('check');
      EnglishPuzzle.showButton('cont');
    }
  },

  /** 
   * клик по слову в блоке с перемешанными словами:
   * 1) сделать кликнутое слово пустым с сохранением ширины,
   * 2) добавить копию слова в ПЕРВУЮ ПУСТУЮ ячейку блока сбора
   * */
  processTaskWordClick: ({ target }) => {
    if (!target.classList.contains('task__word')) {
      return;
    }

    if (target.classList.contains('empty')) {
      return;
    }

    const { width, text, order } = EnglishPuzzle.getClickedElParams(target);

    target.classList.add('empty');
    target.innerHTML = '';
    target.style.width = `${width}px`;
    target.style.flexGrow = '0';

    const firstEmptyWord = document.querySelectorAll('.phrase__word.empty')[0];
    EnglishPuzzle.updateElement(firstEmptyWord, text, width, order);

    if (EnglishPuzzle.checkRoundWordFilled()) {
      EnglishPuzzle.showButton('check');
    }
  },

  /** показать кнопку с переданным именем */
  showButton(buttonName) {
    const buttonsContainer = document.querySelector('.englishPuzzle__buttons.gameButtons');
    const button = buttonsContainer.querySelector(`.gameButtons__button-${buttonName}`);
    if (button.classList.contains('gameButtons__button-hidden')) {
      button.classList.remove('gameButtons__button-hidden');
    }
  },

  /** спрятать кнопку с переданным именем */
  hideButton(buttonName) {
    const buttonsContainer = document.querySelector('.englishPuzzle__buttons.gameButtons');
    const button = buttonsContainer.querySelector(`.gameButtons__button-${buttonName}`);
    if (!button.classList.contains('gameButtons__button-hidden')) {
      button.classList.add('gameButtons__button-hidden');
    }
  },

  /** 
   * клик по слову в поле для сбора слова:
   * 1) удалить кликнутое слово,
   * 2) вставить пустое (empty) слово в конец,
   * 3) вернуть кликнутое слово на свое место в блоке с перемешанными словами,
   * 4) удалить стили проверенных слов (красный/зеленый цвет)
   * */
  processRoundWordClick: ({ target }) => {
    if (!target.classList.contains('phrase__word')) {
      return;
    }

    if (target.classList.contains('empty')) {
      return;
    }
    const phraseContainer = document.querySelector('.englishPuzzle__phrases-round .phrase__words');
    const { width, text, order } = EnglishPuzzle.getClickedElParams(target);

    // удалить эл-т, по которому кликнули, вставить пустой элемент в конец
    target.remove();
    Utils.createBlockInside('div', ['phrase__word', 'empty'], phraseContainer);

    const taskEmptyWord = document.querySelectorAll('.task__words .task__word')[order - 1];
    EnglishPuzzle.updateElement(taskEmptyWord, text, width, order);

    EnglishPuzzle.deleteCheckingStyles();

    if (!EnglishPuzzle.checkRoundWordFilled()) {
      EnglishPuzzle.hideButton('check');
    }
  },

  /** удалить цвета фонов, которые остались после проверки */
  deleteCheckingStyles() {
    const roundWordsContainer = document.querySelector('.englishPuzzle__phrases-round .phrase__words');
    const roundWordsElsArr = Array.from(roundWordsContainer.querySelectorAll('.phrase__word'));
    roundWordsElsArr.forEach((el) => {
      if (el.classList.contains('phrase__word-incorrect')) {
        el.classList.remove('phrase__word-incorrect');
      }
      if (el.classList.contains('phrase__word-correct')) {
        el.classList.remove('phrase__word-correct');
      }
    });

  },

  /** проверить, что все слова перемещены в поле сбора */
  checkRoundWordFilled() {
    const howManyWordsInRound = this.settings.words.shuffledCurrentWord.length;
    const howManyWordCollected = document
      .querySelectorAll('.englishPuzzle__phrases-round .phrase__word:not(.empty)')
      .length;
    return (howManyWordsInRound === howManyWordCollected);
  },

  /**
   * вернуть параметры кликнутого слова - ширину, текст, порядок
   */
  getClickedElParams: (element) => {
    return {
      width: element.getBoundingClientRect().width,
      text: element.innerHTML,
      order: element.dataset.orderTask,
    };
  },

  /** обновить слово - задать новые текст, ширину, порядок */
  updateElement: (element, newText, newWidth, newOrder) => {
    element.innerHTML = newText;
    element.classList.remove('empty');
    element.style.width = `${newWidth}px`;
    element.style.flexGrow = '0';
    element.dataset.orderTask = newOrder;
  }
};

export default EnglishPuzzle;

{/* <div class="phrase__word"
style="width:100px;"
data-order-task="1"
data-order-round="1"
>test</div> */}

