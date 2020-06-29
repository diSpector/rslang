import '../../../../../css/pages/games/english-puzzle/english-puzzle.scss';
import Utils from '../../../../services/Utils';
import Model from './helpers/Model';
import WordsHelper from './helpers/WordsHelper';
import HtmlHelper from './helpers/HtmlHelper';
import ArrayHelper from './helpers/ArrayHelper'
import Config from './settings/gameConfig';

const EnglishPuzzle = {

  settings: {
    game: {}, /** { level, page, round } */
    tips: {}, /** { autosound, translate, audio, picture } */
    words: [
      /** allWords: [ {id, group, page, word, translate, textExample, textExampleTranslate ...}]  */
      /** solvedWords: [] - слова (предложения), которые пользователь уже угадал*/
      /** currentWord: {} - слово (предложение) текущего раунда */
      /** shuffledCurrentWord: [] - слова текущего предложения в случайном порядке */
    ],
    localStat: { // статистика для хранения данных текущего раунда
      knowWords: [],
      idkWords: [],
    },
    results: { // результат для вывода на странице результатов
      knowWords: [],
      idkWords: [],
    },
    picture: {}, /** {author, imageSrc, name, year, id, cut } */
    taskPictureConfig: [],
    isPageIsOver: false,
  },

  beforeRender: async () => {
    // localStorage.clear();
    EnglishPuzzle.clearHeaderAndFooter();

    const userSettings = await Model.getUserSettings();

    EnglishPuzzle.settings.game = userSettings.progress;
    EnglishPuzzle.settings.tips = userSettings.tips;
    EnglishPuzzle.settings.localStat = userSettings.localStat;

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

    const pictureObj = await Model.getPictureInfoFromGithub(gameSettings.level, gameSettings.page);
    EnglishPuzzle.settings.picture = pictureObj;

    // EnglishPuzzle.settings = await Model.getWordsFromGithub(1, 10, 10);
    // EnglishPuzzle.settings.words = await Model.getWordsFromBackend(1, 2);
    // EnglishPuzzle.settings.words = await Model.getWordsFromGithub(1);
  },



  clearHeaderAndFooter: () => {
    Utils.clearBlock(Config.containers.header);
    Utils.clearBlock(Config.containers.footer);
  },

  render: async () => {
    await EnglishPuzzle.beforeRender();
    console.log('all settings', EnglishPuzzle.settings);
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
              <div class="level__menu dropdown__menu englishPuzzle__block-hidden">
              </div>
            </div>
          </div>
  
          <div class="menu__page">
            <div class="page__title">Page:</div>
            <div class="page__list">
              <div class="page__current">1</div>
              <div class="page__menu dropdown__menu englishPuzzle__block-hidden">
              </div>
            </div>
          </div>
        </div>
        <div class="menu__tips tips">
          <div class="tips__button tips__button-autosound" data-tip="autosound" title="Autoplay phrase"></div>
          <div class="tips__button tips__button-translate" data-tip="translate" title="Translation for phrase"></div>
          <div class="tips__button tips__button-audio" data-tip="audio" title="Listen pronunciation"></div>
          <div class="tips__button tips__button-picture" data-tip="picture" title="Picture tip"></div>
        </div>
      </div>
      <div class="englishPuzzle__sound sound">
        <div class="sound__icon"></div>
      </div>
      <div class="englishPuzzle__translation"></div>

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

    <div class="englishPuzzle__results englishPuzzle__block-hidden">
      <div class="englishPuzzle__resultsField">

        <div class="englishPuzzle__pictureMinField">
          <div class="pictureMin__img"></div>
          <div class="pictureMin__desc"></div>      
        </div>
        
        <div class="englishPuzzle__results-fail">
          <div class="block__title fail__title">
            I don't know <span class="count__idk"></span>
          </div>
          <div class="block__words fail__words">
          </div>
        </div>

        <div class="englishPuzzle__results-success">
          <div class ="block__title success__title">
            I know <span class="count__iknow"></span>
          </div>
          <div class="block__words success__words">
          </div>
        </div>

        <div class="results__buttons">
          <div class="results__button results__continue">Continue</div>
        </div>

      </div>
    </div>
    <div class="englishPuzzle__picture englishPuzzle__block-hidden">
      <div class="englishPuzzle__pictureField">

        <div class="picture__img"></div>
        <div class="picture__desc"></div>
        <div class="gameButtons__button gameButtons__button-res" data-button="res">Results</div>
      
      </div>
    </div>

  </div>
      `;
    return view;
  },

  afterRender: () => {
    EnglishPuzzle.fillGamePage();
    EnglishPuzzle.addListeners();

    console.log('localStorage', JSON.parse(localStorage.getItem('EnglishPuzzleSettings')));
    console.log('localStat: ', EnglishPuzzle.settings.localStat);
  },

  /** заполнить страницу */
  fillGamePage() {
    EnglishPuzzle.hideMenus();
    EnglishPuzzle.fillLevelsPagesMenus(),
    EnglishPuzzle.fillDonePhrases();
    EnglishPuzzle.fillRoundPhrase();
    EnglishPuzzle.fillTaskPhrase();
    EnglishPuzzle.fillTaskPictureConfig();
    // EnglishPuzzle.fillPictureInfo();
    EnglishPuzzle.setButtons();
    EnglishPuzzle.setTips();
    EnglishPuzzle.setBlocksByTips();
  },

  /** спрятать оба меню - выбора уровня и раунда */
  hideMenus() {
    const levelMenu = document.querySelector(Config.containers.menus.dropDownClass.level);
    const pageMenu = document.querySelector(Config.containers.menus.dropDownClass.page);

    HtmlHelper.hideContainers([levelMenu, pageMenu]);
  },

  /** заполнить меню уровней и страниц */
  fillLevelsPagesMenus() {
    EnglishPuzzle.fillMenu('level');
    EnglishPuzzle.fillMenu('page');
  },
  
  /** 
   * заполнить меню (список, выделение текущей стр) уровня или страницы
   * @param {string} menuKey - level|page какое меню нужно заполнить (уровень или страница)
   */
  fillMenu(menuKey) {
    const currentMenuKeyContainer = document.querySelector(Config.containers.menus.current[menuKey]);
    const currentKeyValue = this.settings.game[menuKey] + 1;
    currentMenuKeyContainer.innerHTML = currentKeyValue; // текущий уровень или страница

    const menuDropDown = document.querySelector(Config.containers.menus.dropDownClass[menuKey]);
    const menuValues = [...Array(Config.general.max[menuKey])];
    menuValues.forEach((value, i) => {
      const cssStyles = (i === (currentKeyValue - 1)) ? ['menu__item', 'active'] : 'menu__item';
      Utils.createBlockInside('div', cssStyles, menuDropDown, i + 1, {}, { [menuKey]: i });
    })
  },

  /** установить начальную видимость кнопок */
  setButtons() {
    const buttonsContainer = document.querySelector(Config.containers.gameButtons); 
    const idkButton = buttonsContainer.querySelector(Config.buttons.idkButton);
    const checkButton = buttonsContainer.querySelector(Config.buttons.checkButton);
    const contButton = buttonsContainer.querySelector(Config.buttons.contButton);
    const resButton = buttonsContainer.querySelector(Config.buttons.resButton); 

    // кнопка "I dont know" на старте должна быть видна всегда
    if (idkButton.classList.contains(Config.cssStyles.hidden)) {
      idkButton.classList.remove(Config.cssStyles.hidden);
    }

    const hideButtonsArr = [checkButton, contButton, resButton];
    hideButtonsArr.forEach((button) => button.classList.add(Config.cssStyles.hidden));
  },

  /** установить видимость подсказок (начальный конфиг с подсказками) */
  setTips() {
    const tipsButtons = document.querySelectorAll(Config.containers.tipsAll);
    const { tips } = this.settings;

    tipsButtons.forEach((tip) => {
      const tipData = tip.dataset.tip;
      if (tips[tipData]) {
        tip.classList.add(Config.cssStyles.tipPushed);
      }
    });
  },

  /** отобразить перевод и возможность озвучивания на основании конфига подсказок */
  setBlocksByTips() {
    const { tips, words } = this.settings;
    const translationContainer = document.querySelector(Config.containers.translation);
    const audioIconBlock = document.querySelector(Config.containers.audioIcon);
    const taskPhraseContainer = Array.from(document.querySelectorAll(`${Config.containers.taskPhrase} .task__word`));
    const roundPhraseContainer = Array.from(document.querySelectorAll(`${Config.containers.roundPhrase} ${Config.containers.roundWordsAll}`));

    translationContainer.innerHTML = (tips.translate)
      ? words.currentWord.textExampleTranslate : '';

    if (tips.audio) {
      audioIconBlock.classList.remove(Config.cssStyles.soundIconDisabled); 
    } else {
      audioIconBlock.classList.add(Config.cssStyles.soundIconDisabled);
    }

    if (tips.picture) { // если включена подсказка "Картина"
      // показать картины на всех НЕПУСТЫХ словах в блоке перемешанных
      taskPhraseContainer.forEach((taskWord, i) => { 
        if (taskWord.classList.contains('empty')) {
          return;
        }
        const taskWordConfig = EnglishPuzzle.settings.taskPictureConfig[i];
        taskWord.style.backgroundImage = taskWordConfig.bgImg;
        taskWord.style.backgroundPosition = taskWordConfig.bgPos;
      });

      // показать картины на всех НЕПУСТЫХ словах в поле сбора
      roundPhraseContainer.forEach((roundWord) => {
        if (roundWord.classList.contains('empty')) {
          return;
        }
        const order = roundWord.dataset.orderTask;
        const picImg = EnglishPuzzle.settings.taskPictureConfig[order - 1];
        roundWord.style.backgroundImage = picImg.bgImg;
        roundWord.style.backgroundPosition = picImg.bgPos;
      });
    } else { // если отключена, убрать все картины из поля сбора и из поля перемешанных
      taskPhraseContainer.forEach((taskWord) => taskWord.style.backgroundImage = 'none');
      roundPhraseContainer.forEach((roundWord) => roundWord.style.backgroundImage = 'none');
    }
  },

  /** наполнить поле с выполненными фразами */
  fillDonePhrases() {
    const donePhrasesContainer = document.querySelector(Config.containers.donePhrases);
    const donePhrases = this.settings.words.solvedWords;

    donePhrases.forEach((phrase, i) => {
      const phraseBlock = Utils.createBlockInside('div', 'englishPuzzle__phrase');
      Utils.createBlockInside('div', 'phrase__number', phraseBlock, i + 1);
      const phraseWordsBlock = Utils.createBlockInside('div', 'phrase__words', phraseBlock, '', {}, {}, {
        backgroundImage: `url('${Config.api.githubPicturesData}${EnglishPuzzle.settings.picture.imageSrc}')`,
        backgroundPosition: `0px ${Config.general.pictureOffset -40 * i}px`,
      });
      
      const wordsArr = phrase.textExample.split(' ');
      wordsArr.forEach((word) => Utils
        .createBlockInside('div', 'phrase__word', phraseWordsBlock, word));
      donePhrasesContainer.append(phraseBlock);
    });
  },

  /** наполнить поле для текущего раунда - номер раунда + пустые слова для сбора фразы */
  fillRoundPhrase() {
    const wordsInRound = this.settings.words.shuffledCurrentWord.length;
    const doneRounds = this.settings.words.solvedWords.length;
    const roundPhrases = [...Array(wordsInRound)];

    const roundPhraseContainer = document.querySelector(Config.containers.roundPhrase);
    const roundPhraseInnerContainer = Utils.createBlockInside('div', 'englishPuzzle__phrase', roundPhraseContainer);
    Utils.createBlockInside('div', ['phrase__number', 'phrase__number-current'], roundPhraseInnerContainer, doneRounds + 1);
    const currentPhraseContainer = Utils.createBlockInside('div', 'phrase__words', roundPhraseInnerContainer);

    roundPhrases.forEach(() => {
      Utils.createBlockInside('div', ['phrase__word', 'empty'], currentPhraseContainer);
    })
  },

  /** наполнить поле с заданием (для перемешанных слов) */
  fillTaskPhrase() {
    const shuffledCurrentWord = this.settings.words.shuffledCurrentWord;
    const taskPhraseContainer = document.querySelector(Config.containers.taskPhrase);
    shuffledCurrentWord.forEach((word) => {
      Utils
        .createBlockInside('div', 'task__word', taskPhraseContainer, word.text, {draggable: true}, { orderTask: word.order + 1 });
    });
  },

  /** конфиг для позиционирования куска картины на каждом паззле */
  fillTaskPictureConfig() {
    const { currentWord, solvedWords } = EnglishPuzzle.settings.words;
    
    const roundWord = currentWord.textExample;
    const roundWordArr = roundWord.split(' ');
    const verticalPos = solvedWords.length;

    const taskPhraseContainer = Array.from(document.querySelectorAll(`${Config.containers.taskPhrase} .task__word`));
    /** массив объектов с данными об элементах в поле с заданием */
    const taskArr = taskPhraseContainer.map((word) => ({
        element: word,
        text: word.innerHTML,
        wid: word.offsetWidth,
        corPos: roundWordArr.indexOf(word.innerHTML) + 1,
        bgImg: null,
        bgPos: null,
    }));

    /** массив объектов со словами в ВЕРНОМ порядке */
    const sortedArr = taskArr.slice().sort((a, b) => a.corPos - b.corPos);

    taskArr.forEach((word) => {
      let prevWid = 0; // смещение в пикселях каждого блока с паззлом относительно ВЕРНОГО
      const arrBefore = sortedArr.slice(0, word.corPos - 1);
      arrBefore.forEach((el) => prevWid += el.wid);
      word.bgImg = `url('${Config.api.githubPicturesData}${EnglishPuzzle.settings.picture.imageSrc}')`;
      word.bgPos = `-${prevWid}px ${Config.general.pictureOffset -40 * verticalPos}px`;
    });

    EnglishPuzzle.settings.taskPictureConfig = taskArr;
  },

  /** наполнить контейнер информацией о картине */
  fillPictureInfo() {
    const pictureContainer = document.querySelector(Config.containers.picture);
    const pictureImg = pictureContainer.querySelector(Config.containers.pictureImg);
    const pictureDesc = pictureContainer.querySelector(Config.containers.pictureDesc);

    const { picture } = EnglishPuzzle.settings;
    pictureImg.style.backgroundImage = `url('${Config.api.githubPicturesData}${picture.imageSrc}')`;
    pictureDesc.innerHTML = HtmlHelper.beautifyAuthorText(picture);
  },

  /** повесить слушатели событий */
  addListeners() {
    const taskWordsContainer = document.querySelector(Config.containers.taskPhrase);

    // drag and drop - разрешить drop в контейнер с перемешанными словами
    taskWordsContainer.addEventListener('dragover', this.processDragOverTask);
    taskWordsContainer.addEventListener('dragenter', this.processDragEnterTask);

    // drag and drop - действия на начале перетаскивания из task, попытке дропа в task
    taskWordsContainer.addEventListener('dragstart', this.processDragStartTaskWord);
    taskWordsContainer.addEventListener('dragend', this.processDragEndTaskWord);
    taskWordsContainer.addEventListener('drop', this.processDropToTask);

    // click
    taskWordsContainer.addEventListener('click', this.processTaskWordClick);

    const roundWordsContainer = document.querySelector(Config.containers.roundPhraseWords);
    // drag and drop - разрешить drop в контейнер для сбора слов
    roundWordsContainer.addEventListener('dragover', this.processDragOverRound);
    roundWordsContainer.addEventListener('dragenter', this.processDragEnterRound);
    
    // drag and drop - действия на начале перетаскивания из round, попытке дропа в round
    roundWordsContainer.addEventListener('dragstart', this.processDragStartRoundWord);    
    roundWordsContainer.addEventListener('dragend', this.processDragEndRoundWord);    
    roundWordsContainer.addEventListener('drop', this.processDropToRound);

    // click
    roundWordsContainer.addEventListener('click', this.processRoundWordClick);

    const buttonsContainer = document.querySelector(Config.containers.gameButtons)
    const idkButton = buttonsContainer.querySelector(Config.buttons.idkButton);
    const checkButton = buttonsContainer.querySelector(Config.buttons.checkButton);
    const contButton = buttonsContainer.querySelector(Config.buttons.contButton);
    const resButton = buttonsContainer.querySelector(Config.buttons.resButton);

    idkButton.addEventListener('click', this.processIdkClick);
    checkButton.addEventListener('click', this.processCheckClick);
    contButton.addEventListener('click', this.processContClick);
    resButton.addEventListener('click', this.processResClick);

    const menuLevel = document.querySelector(Config.containers.menus.menuTitle.level);
    menuLevel.addEventListener('click', this.toggleLevels);

    const levelMenuItems = document.querySelector(Config.containers.menus.dropDownClass.level);
    levelMenuItems.addEventListener('click', this.changeLevel);

    const menuPage = document.querySelector(Config.containers.menus.menuTitle.page);
    menuPage.addEventListener('click', this.togglePages);

    const pageMenuItems = document.querySelector(Config.containers.menus.dropDownClass.page);
    pageMenuItems.addEventListener('click', this.changePage);

    const tipsContainer = document.querySelector(Config.containers.tips);
    tipsContainer.addEventListener('click', this.processTipClick);

    const soundIconBlock = document.querySelector(Config.containers.audioIcon);
    soundIconBlock.addEventListener('click', this.processSoundClick);

  },

  /** удалить все слушатели событий
   * листенеры автоматически удаляются при удалении эл-та и отсутствии ссылок, но...
  */
  removeListeners() {
    const taskWordsContainer = document.querySelector(Config.containers.taskPhrase);
    taskWordsContainer.removeEventListener('click', this.processTaskWordClick);

    const roundWordsContainer = document.querySelector(Config.containers.roundPhraseWords);
    roundWordsContainer.removeEventListener('click', this.processRoundWordClick);

    const buttonsContainer = document.querySelector(Config.containers.gameButtons)
    const idkButton = buttonsContainer.querySelector(Config.buttons.idkButton);
    const checkButton = buttonsContainer.querySelector(Config.buttons.checkButton);
    const contButton = buttonsContainer.querySelector(Config.buttons.contButton);
    const resButton = buttonsContainer.querySelector(Config.buttons.resButton);

    idkButton.removeEventListener('click', this.processIdkClick);
    checkButton.removeEventListener('click', this.processCheckClick);
    contButton.removeEventListener('click', this.processContClick);
    resButton.removeEventListener('click', this.processResClick);

    const menuLevel = document.querySelector(Config.containers.menus.menuTitle.level);
    menuLevel.removeEventListener('click', this.toggleLevels);

    const levelMenuItems = document.querySelector(Config.containers.menus.dropDownClass.level);
    levelMenuItems.removeEventListener('click', this.changeLevel);

    const menuPage = document.querySelector(Config.containers.menus.menuTitle.page);
    menuPage.removeEventListener('click', this.togglePages);

    const pageMenuItems = document.querySelector(Config.containers.menus.dropDownClass.page);
    pageMenuItems.removeEventListener('click', this.changePage);

    const tipsContainer = document.querySelector(Config.containers.tips);
    tipsContainer.removeEventListener('click', this.processTipClick);

    const soundIconBlock = document.querySelector(Config.containers.audioIcon);
    soundIconBlock.removeEventListener('click', this.processSoundClick);
  },

  /** 
   * обработка drop'а в контейнер раунда - из task или внутри round
   * @param {Event} event - объект события (event.target - НА КАКОЙ блок происходит drop)
   * */
  processDropToRound: (event) => {
    EnglishPuzzle.deleteHighlightAreas();   
    console.log('dropped Data: ', event.dataTransfer.getData('text'));
    const underElement = event.target;
    console.log('drop will be to: ', underElement);
    
    let order = 0;
    let draggedEl = null; // перетаскиваемый элемент
    const textParam = event.dataTransfer.getData('text');
    
    /** для того, чтобы определить, из какого контейнера перетаскивается эл-т 
     *  используется "флаг" @@ в параметре 'text' перетаскиваемого эл-та:
     * - если эл-т тянется из round, у него есть @@ - формат "order@@word"
     * - если из task, то нет - формат "order"
    */
    if (textParam.includes('@@')) { // эл-т тянется из round (перенос внутри строки)
      const textParamArr = textParam.split('@@');
      order = textParamArr[0];
      const text = textParamArr[1]; // текст слова на блоке
      draggedEl = document.querySelector(`${Config.containers.roundPhraseWords} .phrase__word[data-order-task="${order}"]`);
      if (!draggedEl) {
        return;
      }
      EnglishPuzzle.dropToSpecElement(draggedEl, underElement, true);
    } else { // элемент тянется из task 
      try { // на случай глюка, когда выбраны и тянутся несколько элементов
        order = textParam;
        draggedEl = document.querySelector(`${Config.containers.taskPhrase} .task__word[data-order-task="${order}"]`);
        console.log('dragged element from task', draggedEl);
        if (!draggedEl) {
          return;
        }
        EnglishPuzzle.dropToSpecElement(draggedEl, underElement);
      } catch(error) {
        return;
      }
    }
  },

  /** 
   * drop элемента на другой элемент (пустой или нет) 
   * 
   * @param {HTMLElement} dragEl - элемент, который юзер тянет 
   * @param {HTMLElement} dropEl - элемент, на который юзер опускает dragEl
   * @param {boolean} isNeedUpdate - true, если элемент тянется ВНУТРИ строки round
   * */
  dropToSpecElement(dragEl, dropEl, isNeedUpdate = false) {
    let roundArr = EnglishPuzzle.getRoundArr();
    const dropPosition = EnglishPuzzle.getDropPosition(dropEl);

    let newRoundArr = [];

    /** draggedParams: { width, order, text } - параметры перетаскиваемого эл-та */
    const draggedParams = EnglishPuzzle.getClickedElParams(dragEl);

    /** поместить пустой элемент на место, с которого забрали слово */
    HtmlHelper.makeElementEmpty(dragEl, draggedParams.width); 

    // если перенос внутри раунда, то обновить массив слова после удаления слова
    if (isNeedUpdate) {
      roundArr = EnglishPuzzle.getRoundArr();
    }

    if (!roundArr[dropPosition]) { // если на места сброса нет элемента, просто вставляем новый
      newRoundArr = roundArr.slice();
      newRoundArr[dropPosition] = draggedParams;
    } else { // если на месте сброса есть элемент, двигаем массив по-умному
      newRoundArr = ArrayHelper.getShiftedArray(roundArr.slice(), dropPosition);
      newRoundArr[dropPosition] = draggedParams;
    }

    /** отрендерить слова в раунде на основании массива */
    EnglishPuzzle.renderRoundWordsFromArr(newRoundArr);

    if (EnglishPuzzle.checkRoundWordFilled()) {
      EnglishPuzzle.showButton('check');
    }
  },

  /** найти индекс первого null-элемента */
  getFirstNullInd(arr) {
    return arr.findIndex((elem) => elem === null);
  },

  /** 
   * рендер слов в раунде на основании массива 
   * @param {Array} configArr - массив для рендера в формате:
   * [null, ..., null, {order, text, width, ...}, {order, text, width}, ..., null]
   * */
  renderRoundWordsFromArr(configArr) {
    const roundWordsContainer = document.querySelector(Config.containers.roundPhraseWords);
    HtmlHelper.clearContainers([roundWordsContainer]);
    configArr.forEach((elem) => { /** elem: { width, order, text, bgImg, bgPos } */
      if (!elem) { // если null - рендер пустой строки
        Utils.createBlockInside('div', ['phrase__word', 'empty'], roundWordsContainer);
      } else { // иначе, рендер строки со словом и картиной
        Utils.createBlockInside('div', ['phrase__word'], roundWordsContainer, elem.text, 
          { draggable: true }, { orderTask: elem.order},
          {
            width: `${elem.width}px`,
            flexGrow: '0',
            backgroundImage: elem.bgImg,
            backgroundPosition: elem.bgPos
          }
        );
      }
    });
  },

  /** получить позицию, на которую сбрасывается элемент внутри своего контейнера */
  getDropPosition(dropEl) {
    const index = [...dropEl.parentElement.children].indexOf(dropEl);
    return index;
  },

  /** получить элементы в блоке раунда в виде массива */
  getRoundArr() {
    const roundWords = Array.from(document.querySelectorAll(`
      ${Config.containers.roundPhraseWords}
      ${Config.containers.roundWordsAll}
    `));

    const roundArr = roundWords.map((block) => {
      return (block.classList.contains('empty'))
        ? null
        : EnglishPuzzle.getClickedElParams(block);
    });
    return roundArr;
  },

  /** drop в контейнер для перемешанных слов */
  processDropToTask: (event) => {
    EnglishPuzzle.deleteHighlightAreas();
    try { // на случай, если юзер захватил несколько элементов
      const order = event.dataTransfer.getData('text').split('@@')[0];
      const draggedEl = document.querySelector(`${Config.containers.roundPhrase} .phrase__word[data-order-task="${order}"]`);
      if (!draggedEl) {
        return;
      }
      EnglishPuzzle.processRoundWordClick({target: draggedEl});
    } catch (error) {
      return;
    }
  },

  /** установить передаваемые данные, подсветить поле для drop */
  processDragStartTaskWord: (event) => {
    event.stopPropagation();
    if (!event.target.classList) { // глюк, когда выбирается несколько эл-тов
      return;
    }
    if (event.target.classList.contains(Config.cssStyles.emptyWord)) {
      return;
    }
    if (event.target.classList.contains(Config.cssStyles.roundWord)) {
      return;
    }
    event.dataTransfer.setData('text', event.target.dataset.orderTask);
    const roundWordsContainer = document.querySelector(Config.containers.roundPhraseWords);
    roundWordsContainer.classList.add(Config.cssStyles.areaUnderDragged);
  },

  /** установить передаваемые данные, подсветить поле для drop */
  processDragStartRoundWord: (event) => {
    event.stopPropagation();
    if (!event.target.classList) { // глюк, когда выбирается несколько эл-тов
      return;
    }
    if (event.target.classList.contains(Config.cssStyles.emptyWord)) {
      return;
    }
    if (event.target.classList.contains(Config.cssStyles.taskWord)) {
      return;
    }
    event.dataTransfer.setData('text', `${event.target.dataset.orderTask}@@${event.target.innerHTML}`);

    const taskWordsContainer = document.querySelector(Config.containers.taskPhrase);
    taskWordsContainer.classList.add(Config.cssStyles.areaUnderDragged);
  },

  /** разрешить drop на поле round */
  processDragOverRound: (event) => {
    event.preventDefault();
  },

  /** разрешить drop на поле round */
  processDragEnterRound: (event) => {
    event.preventDefault();
  },

  /** разрешить drop на поле task */
  processDragOverTask: (event) => {
    event.preventDefault();
  },

  /** разрешить drop на поле task */
  processDragEnterTask: (event) => {
    event.preventDefault();
  },

  processDragEndRoundWord: () => {
    EnglishPuzzle.deleteHighlightAreas();
  },

  processDragEndTaskWord: () => {
    EnglishPuzzle.deleteHighlightAreas();
  },

  /** удалить зеленую подсветку с обоих полей после сбрасывания элемента */
  deleteHighlightAreas() {
    const roundWordsContainer = document.querySelector(Config.containers.roundPhraseWords);
    if (roundWordsContainer.classList.contains(Config.cssStyles.areaUnderDragged)) {
      roundWordsContainer.classList.remove(Config.cssStyles.areaUnderDragged);
    }
    const taskWordsContainer = document.querySelector(Config.containers.taskPhrase);
    if (taskWordsContainer.classList.contains(Config.cssStyles.areaUnderDragged)) {
      taskWordsContainer.classList.remove(Config.cssStyles.areaUnderDragged);
    }
  },


  /** отобразить нужную страницу, скрыть остальные */
  loadPage(pageName) {
    HtmlHelper.clearAndHideAll();
    HtmlHelper.showPage(Config.containers[Config.pages[pageName]]);
    // this.removeListeners();
  },

  // /** клик по кнопке Results */
  // processResClick: () => {
  //   EnglishPuzzle.loadPage('results');

  //   // const { settings } = EnglishPuzzle;
  //   // const newGameSettings = EnglishPuzzle.getNewLevelPageRound(settings.game);
  //   // settings.game = Object.assign({}, newGameSettings);
  //   // Model.saveProgress(newGameSettings);
  //   // Model.saveTips(settings.tips);

  //   EnglishPuzzle.fillResults();
  // },

  /** наполнить страницу результатами */
  fillResults() {
    const { knowWords, idkWords } = this.settings.results;
    const { picture } = EnglishPuzzle.settings;

    const pictureMinContainer = document.querySelector(Config.containers.pictureMin);
    const pictureMinImg = pictureMinContainer.querySelector(Config.containers.pictureMinImg);
    const pictureMinDesc = pictureMinContainer.querySelector(Config.containers.pictureMinDesc);

    pictureMinImg.style.backgroundImage = `url('${Config.api.githubPicturesData}${picture.imageSrc}')`;
    pictureMinDesc.innerHTML = HtmlHelper.beautifyAuthorText(picture);

    const failContainer = document.querySelector(Config.containers.resultsFail);
    const failCount = failContainer.querySelector(Config.containers.failCount);
    const failWordsContainer = failContainer.querySelector(Config.containers.failWords);

    failCount.innerHTML = this.settings.results.idkWords.length;
    idkWords.forEach((word, i) => {
      const failWordBlock = Utils.createBlockInside('div', ['block__word', 'fail__word'], failWordsContainer, '', {}, { sound: `fail-${i}` });
      Utils.createBlockInside('div', 'word__soundicon', failWordBlock);
      Utils.createBlockInside('div', 'word__text', failWordBlock, word.textExample);
    });

    const successContainer = document.querySelector(Config.containers.resultsSuccess);
    const successCount = successContainer.querySelector(Config.containers.successCount);
    const successWordsContainer = successContainer.querySelector(Config.containers.successWords);
    
    successCount.innerHTML = this.settings.results.knowWords.length;
    knowWords.forEach((word, i) => {
      const successWordBlock = Utils.createBlockInside('div', ['block__word', 'success__word'], successWordsContainer, '', {}, { sound: `success-${i}` });
      Utils.createBlockInside('div', 'word__soundicon', successWordBlock);
      Utils.createBlockInside('div', 'word__text', successWordBlock, word.textExample);
    });
  },

  addListenersToResults() {
    const wordsContainer = document.querySelector(Config.containers.wholeResultsField);
    wordsContainer.addEventListener('click', this.processResWordClick);

    const resultsButtonContainer = document.querySelector(Config.containers.resultsButtons);
    const resultsContButon = resultsButtonContainer.querySelector(Config.resultsButtons.continue);
    resultsContButon.addEventListener('click', this.processResultsContClick);
  },

  /** клик по строке со словом на странице результатов (угаданной или нет) */
  processResWordClick: ({ target }) => {
    const wordBlock = target.closest(Config.containers.resultsWord);
    if (!wordBlock) {
      return;
    }
    const { knowWords, idkWords } = EnglishPuzzle.settings.results;

    const id = wordBlock.dataset.sound;
    const idArr = id.split('-');
    const [wordArrName, wordId] = idArr;
    const arr = (wordArrName === 'fail') ? idkWords : knowWords;
    
    const audio = arr[wordId].audioExample;
    const audioFullPath = `${Config.api.githubRawData}${audio}`;
    EnglishPuzzle.playAudio(audioFullPath);
  },

  /** клик по кнопке "Continue" на странице результатов */
  processResultsContClick: async () => {
    EnglishPuzzle.loadPage('game');    
    EnglishPuzzle.settings.localStat = {
      knowWords: [],
      idkWords: [],
    };
    Model.saveStats(EnglishPuzzle.settings.localStat);
    await EnglishPuzzle.render();

    EnglishPuzzle.afterRender();

  },

  /** клик по подсказке */
  processTipClick: ({ target }) => {
    if (!target.classList.contains(Config.cssStyles.tipButton)) {
      return;
    }

    const { tips } = EnglishPuzzle.settings;
    const dataTip = target.dataset.tip;
    target.classList.toggle(Config.cssStyles.tipPushed);
    tips[dataTip] = !tips[dataTip];

    EnglishPuzzle.setTips();
    EnglishPuzzle.setBlocksByTips();
  },

  /** показать перевод и разрешить прослушать слово в конце раунда */
  showTipsBlocksInRoundEnd: () => {
    const translationContainer = document.querySelector(Config.containers.translation);
    const audioIconBlock = document.querySelector(Config.containers.audioIcon);

    translationContainer.innerHTML = EnglishPuzzle.settings.words.currentWord.textExampleTranslate;
    audioIconBlock.classList.remove(Config.cssStyles.soundIconDisabled); 
  },

  /** клик на иконке аудио */
  processSoundClick: () => {
    const audioIconBlock = document.querySelector(Config.containers.audioIcon);
    if (!audioIconBlock.classList.contains(Config.cssStyles.soundIconDisabled)) {
      EnglishPuzzle.processCurrentAudio();
    }
  },

  /** проиграть файл, поморгать иконкой */
  processCurrentAudio() {
    const audio = this.settings.words.currentWord.audioExample;
    const audioFullPath = `${Config.api.githubRawData}${audio}`;
    this.playAudio(audioFullPath);
    this.blinkAudioIcon();
  },

  /** проигрывание аудиофайла */
  playAudio(audioPath) {
    const audio = new Audio(audioPath);
    audio.play();
  },

  /** моргание иконки */
  blinkAudioIcon() {
    const soundIcon = document.querySelector(Config.containers.audioIcon);
    soundIcon.classList.add(Config.cssStyles.soundIconBlink);
    setTimeout(() => {
      soundIcon.classList.remove(Config.cssStyles.soundIconBlink);
    }, 5000);
  },

  /** клик по уровню в меню */
  changeLevel: async ({ target }) => {
    if (!target.classList.contains(Config.cssStyles.menuItem)) {
      return;
    }
    const { settings } = EnglishPuzzle;
    const gameSettings = settings.game;

    const newLevel = parseInt(target.dataset.level, 10);
    const currentLevel = gameSettings.level;
    
    if (newLevel === currentLevel) {
      return;
    }

    // установить новый уровень, и начальные страницу и раунд
    const newGameSettings = Object.assign({}, {
      level: newLevel,
      page: 0,
      round: 0,
    });

    EnglishPuzzle.clearGameField();
    Model.saveProgress(newGameSettings);
    Model.saveTips(settings.tips);

    // так как уровень новый, стереть всю статистику
    EnglishPuzzle.settings.localStat = {
      knowWords: [],
      idkWords: [],
    };
    Model.saveStats(EnglishPuzzle.settings.localStat);

    await EnglishPuzzle.render();
    EnglishPuzzle.afterRender();
  },

  /** клик по странице в меню */
  changePage: async ({ target }) => {
    if (!target.classList.contains(Config.cssStyles.menuItem)) {
      return;
    }
    const { settings } = EnglishPuzzle;
    const gameSettings = settings.game;

    const newPage = parseInt(target.dataset.page, 10);
    const currentPage = gameSettings.page;

    if (newPage === currentPage) {
      return;
    }
    // установить новую начальную страницу и раунд, уровень оставить без изменения
    const newGameSettings = Object.assign({}, {
      level: gameSettings.level,
      page: newPage,
      round: 0,
    });

    EnglishPuzzle.clearGameField();
    Model.saveProgress(newGameSettings);
    Model.saveTips(settings.tips);

    // так как страница новая, стереть всю статистику
    EnglishPuzzle.settings.localStat = {
      knowWords: [],
      idkWords: [],
    };
    Model.saveStats(EnglishPuzzle.settings.localStat);
    
    await EnglishPuzzle.render();
    EnglishPuzzle.afterRender();
  },

  /** показать/скрыть меню с выбором уровней */
  toggleLevels: () => {
    const menuContainer = document.querySelector(Config.containers.menus.dropDownClass.level);
    menuContainer.classList.toggle(Config.cssStyles.hidden);
  },

  /** показать/скрыть меню с выбором страниц */
  togglePages: () => {
    const menuContainer = document.querySelector(Config.containers.menus.dropDownClass.page);
    menuContainer.classList.toggle(Config.cssStyles.hidden);
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
    HtmlHelper.clearGameField();
  },


  /** показать картину без текста и границ + информацию о ней */
  showFullPicture() {
    const numbersBlocks = Array.from(document.querySelectorAll(Config.containers.roundNumbersAll));
    const roundBlocks = Array.from(document.querySelectorAll(Config.containers.roundPhraseAll));
    const allPhraseBlocks = Array.from(document.querySelectorAll(Config.containers.roundWordsAll));
    const taskBlock = document.querySelector(Config.containers.taskPhraseAll);
    const picInfoContainer = document.querySelector(Config.containers.pictureInfo);
    const translateBlock = document.querySelector(Config.containers.translation);
    const audioIconBlock = document.querySelector(Config.containers.audioIcon);

    roundBlocks.forEach((round) => { // убрать обводки и рамки вокруг каждой строки
      round.style.border = 'none';
      round.style.boxShadow = 'none';
    });
    allPhraseBlocks.forEach((word) => { // убрать рамки и стереть текст вокруг каждого слова
      word.innerHTML = '';
      word.style.border = 'none';
    });
    numbersBlocks.forEach((number) => { 
      number.innerHTML = '';
      number.style.border = 'none';
      number.style.boxShadow = 'none';
    });
    taskBlock.innerHTML = '';
    translateBlock.innerHTML = '';
    audioIconBlock.classList.add(Config.cssStyles.hidden);
    picInfoContainer.classList.remove(Config.cssStyles.hidden);
  },

  /** нажатие на кнопку "I don't know":
   * 1) вставить слова в правильном порядке в поле сбора,
   * 2) удалить все слова из поля с перемешанными словами,
   * 3) снять слушатели кликов с поля сбора, перемешанных слов, подсказок
   * 4) показать кнопку "Continue"
   * 5) проигрывание предложения, если автопроизношение включено
   */
  processIdkClick: () => {
    const roundWordsContainer = document.querySelector(Config.containers.roundPhraseWords);
    const taskWordsContainer = document.querySelector(Config.containers.taskPhrase);
    HtmlHelper.clearContainers([roundWordsContainer, taskWordsContainer]);

    const currentWordArr = EnglishPuzzle.settings.words.currentWord.textExample.split(' ');
    currentWordArr.forEach((word) => {
      Utils.createBlockInside('div', 'phrase__word', roundWordsContainer, word);
      Utils.createBlockInside('div', ['task__word', 'empty'], taskWordsContainer);
    });

    roundWordsContainer.style.backgroundImage = `url('${Config.api.githubPicturesData}${EnglishPuzzle.settings.picture.imageSrc}')`;
    roundWordsContainer.style.backgroundPosition = `0px ${Config.general.pictureOffset -40 * (EnglishPuzzle.settings.words.solvedWords.length)}px`;

    const { tips } = EnglishPuzzle.settings;
    if (tips.autosound) {
      EnglishPuzzle.processCurrentAudio();
    }

    EnglishPuzzle.showTipsBlocksInRoundEnd(); // показать перевод и иконку звука в конце раунда

    const { currentWord } = EnglishPuzzle.settings.words;
    EnglishPuzzle.settings.localStat.idkWords.push(currentWord);
    Model.saveStats(EnglishPuzzle.settings.localStat);

    taskWordsContainer.removeEventListener('click', EnglishPuzzle.processTaskWordClick);
    roundWordsContainer.removeEventListener('click', EnglishPuzzle.processRoundWordClick);

    EnglishPuzzle.hideButton('idk');
    EnglishPuzzle.hideButton('check');
    EnglishPuzzle.showButton('cont');

    // const { round } = EnglishPuzzle.settings.game;
    // if (round === 9) {
    const tipsContainer = document.querySelector(Config.containers.tips);
    tipsContainer.removeEventListener('click', EnglishPuzzle.processTipClick);
      // EnglishPuzzle.isPageIsOver = true;
    // }
  },

  /** нажатие на кнопку "Check" 
   * 1) подсветить правильные/неправильные слова,
   * 2) если предложение угадано верно, снять слушатели, показать/спрятать кнопки, проиграть фразу
  */
  processCheckClick: () => {
    const roundWordsContainer = document.querySelector(Config.containers.roundPhraseWords);
    const taskWordsContainer = document.querySelector(Config.containers.taskPhrase);

    const roundWordsElsArr = Array.from(roundWordsContainer.querySelectorAll(Config.containers.roundWordsAll));
    const roundWordsArr = roundWordsElsArr.map((element) => element.innerHTML);
    const currentWordArr = EnglishPuzzle.settings.words.currentWord.textExample.split(' ');

    let corrects = 0;
    roundWordsArr.forEach((word, i) => {
      const cond = (word === currentWordArr[i]);
      corrects = (cond) ? (corrects + 1) : corrects;
      const cssClass = (cond)
        ? Config.cssStyles.roundWordCorrect
        : Config.cssStyles.roundWordIncorrect;

      roundWordsElsArr[i].classList.add(cssClass);
    });

    if (corrects === currentWordArr.length) { // если угадано верно
      const { tips } = EnglishPuzzle.settings;

      const { currentWord } = EnglishPuzzle.settings.words;
      EnglishPuzzle.settings.localStat.knowWords.push(currentWord);
      Model.saveStats(EnglishPuzzle.settings.localStat);

      if (tips.autosound) {
        EnglishPuzzle.processCurrentAudio();
      }
      EnglishPuzzle.showTipsBlocksInRoundEnd();

      taskWordsContainer.removeEventListener('click', EnglishPuzzle.processTaskWordClick);
      roundWordsContainer.removeEventListener('click', EnglishPuzzle.processRoundWordClick);
      roundWordsContainer.removeEventListener('dragstart', EnglishPuzzle.processDragStartRoundWord);    
      
      EnglishPuzzle.hideButton('idk');
      EnglishPuzzle.hideButton('check');
      EnglishPuzzle.showButton('cont');

      // const { round } = EnglishPuzzle.settings.game;
      // if (round === 9) {
      //   // EnglishPuzzle.hideButton('cont');
      //   // EnglishPuzzle.showButton('res');
      //   EnglishPuzzle.isPageIsOver = true;
      // }
    }
  },

  /**
   * нажатие на кнопку "Continue":
   * 1) задать новый раунд,
   * 2) обновить угаданные и текущее слова на основе нового раунда
   * 3) перерендерить всё
   */
  processContClick: async () => {
    const tipsContainer = document.querySelector(Config.containers.tips);
    tipsContainer.removeEventListener('click', EnglishPuzzle.processTipClick);

    const { settings } = EnglishPuzzle;
    const newGameSettings = EnglishPuzzle.getNewLevelPageRound(settings.game);
    settings.game = Object.assign({}, newGameSettings);
    Model.saveProgress(newGameSettings);
    Model.saveTips(settings.tips);

    if (settings.game.round !== 0) { // собрано меньше 10 раундов - не надо загружать новые слова
      EnglishPuzzle.clearGameField();
      EnglishPuzzle.updateWordsByRound(settings.game.round);
      EnglishPuzzle.afterRender();
  
    } else { // собрано все 10 раундов - загрузить картину
      EnglishPuzzle.settings.results = Object.assign({}, EnglishPuzzle.settings.localStat);
      EnglishPuzzle.settings.localStat = {
        knowWords: [],
        idkWords: [],
      };
      Model.saveStats(EnglishPuzzle.settings.localStat);
      EnglishPuzzle.loadPicture();
    }
  },

  /** загрузить страницу с картиной */
  loadPicture() {
    EnglishPuzzle.loadPage('picture');
    EnglishPuzzle.fillPictureInfo('picture');
    EnglishPuzzle.addListenersToPicture();
  },

  /** загрузить страницу с результатами */
  loadResults() {
    EnglishPuzzle.loadPage('results');
    EnglishPuzzle.fillResults();
    EnglishPuzzle.addListenersToResults();
  },
 
  /** добавить слушатели на страницу с картиной */
  addListenersToPicture () {
    const pictureContainer = document.querySelector(Config.containers.picture);
    const resultsButton = pictureContainer.querySelector(Config.buttons.resButton);
    resultsButton.addEventListener('click', this.processPictureResClick);
  },

  /** нажатие на клик по результатам на странице картины */
  processPictureResClick() {
    EnglishPuzzle.loadResults();
  },

  // /** обновить конфигурацию подсказок */
  // updateTipsByRound(tipsObject) {
  //   EnglishPuzzle.settings.tips = Object.assign({}, tipsObject);
  // },

  /** 
   * клик по слову в блоке с перемешанными словами:
   * 1) сделать кликнутое слово пустым с сохранением ширины,
   * 2) добавить копию слова в ПЕРВУЮ ПУСТУЮ ячейку блока сбора
   * */
  processTaskWordClick: ({ target }) => {
    if (!target.classList.contains(Config.cssStyles.taskWord)) {
      return;
    }

    if (target.classList.contains(Config.cssStyles.emptyWord)) {
      return;
    }

    const roundArr = EnglishPuzzle.getRoundArr();
    const firstNullInd = EnglishPuzzle.getFirstNullInd(roundArr);
    
    /** clickedParams: { width, order, text, bgImg, bgPos } */
    const clickedParams = EnglishPuzzle.getClickedElParams(target);

    /** поместить пустой элемент на месте, по которому кликнули */
    HtmlHelper.makeElementEmpty(target, clickedParams.width);
    
    /** поместить элемент, по которому кликнули на первом свободное место */
    roundArr[firstNullInd] = clickedParams;

    /** отрендерить слова в раунде на основании массива */
    EnglishPuzzle.renderRoundWordsFromArr(roundArr);

    if (EnglishPuzzle.checkRoundWordFilled()) {
      EnglishPuzzle.showButton('check');
    }
  },

  /** показать кнопку с переданным именем */
  showButton(buttonName) {
    const buttonsContainer = document.querySelector(Config.containers.gameButtons);
    const button = buttonsContainer.querySelector(`${Config.buttons.prefix}${buttonName}`);
    if (button.classList.contains(Config.cssStyles.hidden)) {
      button.classList.remove(Config.cssStyles.hidden);
    }
  },

  /** спрятать кнопку с переданным именем */
  hideButton(buttonName) {
    const buttonsContainer = document.querySelector(Config.containers.gameButtons);
    const button = buttonsContainer.querySelector(`${Config.buttons.prefix}${buttonName}`);
    if (!button.classList.contains(Config.cssStyles.hidden)) {
      button.classList.add(Config.cssStyles.hidden);
    }
  },

  /** 
   * клик по слову в поле для сбора слова:
   * 1) удалить кликнутое слово из поля сбора
   * 2) вернуть кликнутое слово на свое место в блоке с перемешанными словами,
   * 3) удалить стили проверенных слов (красный/зеленый цвет)
   * */
  processRoundWordClick: ({ target }) => {
    if (!target.classList.contains(Config.cssStyles.roundWord)) {
      return;
    }

    if (target.classList.contains(Config.cssStyles.emptyWord)) {
      return;
    }
    const { width, text, order, bgImg } = EnglishPuzzle.getClickedElParams(target);

    // сделать пустым элемент, по которому кликнули
    HtmlHelper.makeElementEmpty(target, width);

    const taskEmptyWord = document.querySelectorAll('.task__words .task__word')[order - 1];
    EnglishPuzzle.updateElement(taskEmptyWord, text, width, order, bgImg);

    EnglishPuzzle.deleteCheckingStyles();

    if (!EnglishPuzzle.checkRoundWordFilled()) {
      EnglishPuzzle.hideButton('check');
    }
  },

  /** удалить цвета фонов, которые остались после проверки */
  deleteCheckingStyles() {
    const roundWordsContainer = document.querySelector(Config.containers.roundPhraseWords);
    const roundWordsElsArr = Array
      .from(roundWordsContainer.querySelectorAll(Config.containers.roundWordsAll));
    roundWordsElsArr.forEach((el) => {
      if (el.classList.contains(Config.cssStyles.roundWordIncorrect)) {
        el.classList.remove(Config.cssStyles.roundWordIncorrect);
      }
      if (el.classList.contains(Config.cssStyles.roundWordCorrect)) {
        el.classList.remove(Config.cssStyles.roundWordCorrect);
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
   * вернуть параметры кликнутого слова - ширину, текст, порядок, задник и позиционирование
   * @param {HTMLElement} element - html-элемент
   */
  getClickedElParams: (element) => {
    return {
      width: element.getBoundingClientRect().width,
      text: element.innerHTML,
      order: element.dataset.orderTask,
      bgImg: element.style.backgroundImage,
      bgPos: element.style.backgroundPosition,
    };
  },

  /** обновить слово - задать новые текст, ширину, порядок */
  updateElement: (element, newText, newWidth, newOrder, newBgImg, newBgPos) => {
    element.innerHTML = newText;
    element.classList.remove('empty');
    element.style.width = `${newWidth}px`;
    element.style.flexGrow = '0';
    element.dataset.orderTask = newOrder;
    element.draggable = true;
    element.style.backgroundImage = newBgImg;
    element.style.backgroundPosition = newBgPos;
  }
};

export default EnglishPuzzle;

