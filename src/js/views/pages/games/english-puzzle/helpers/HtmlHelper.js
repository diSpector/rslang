import Config from '../settings/gameConfig';

const HtmlHelper = {
  
  /** удалить весь динамический контент, спрятать все блоки (игра, результаты) */
  clearAndHideAll() {
    this.clearAll();
    this.hideAll();
  },

  /** очистить и скрыть все поля (игра, статистика) */
  clearAll() {
    this.clearGameField();
    this.clearResults();
  },

  /** очистить игровое поле - собранные слова, поле сбора, перемеш. слова и т.д. */
  clearGameField() {
    const donePhrasesContainer = document.querySelector(Config.containers.donePhrases);
    const roundPhraseContainer = document.querySelector(Config.containers.roundPhrase);
    const taskPhraseContainer = document.querySelector(Config.containers.taskPhrase);
    const menuLevelContainer = document.querySelector(Config.containers.menus.dropDownClass.level);
    const menuPageContainer = document.querySelector(Config.containers.menus.dropDownClass.page);
    const translationContainer = document.querySelector(Config.containers.translation);

    const containers = [
      donePhrasesContainer,
      roundPhraseContainer,
      taskPhraseContainer,
      menuLevelContainer,
      menuPageContainer,
      translationContainer,
    ];

    this.clearContainers(containers);
  },

  /** очистить страницу с результатами */
  clearResults() {
    const failContainer = document.querySelector(Config.containers.resultsFail);
    const failCount = failContainer.querySelector(Config.containers.failCount);
    const failWordsContainer = failContainer.querySelector(Config.containers.failWords);  
    const successContainer = document.querySelector(Config.containers.resultsSuccess);
    const successCount = successContainer.querySelector(Config.containers.successCount);
    const successWordsContainer = successContainer.querySelector(Config.containers.successWords);

    const containers = [
      failCount,
      failWordsContainer,
      successCount,
      successWordsContainer,
    ];

    this.clearContainers(containers);
  },

  /** спрятать все контейнеры (добавить класс) - игра, статистика */
  hideAll() {
    const { pages, containers } = Config;
    const containersArr = [];
    Object.values(pages).forEach((key) => {
      const container = document.querySelector(containers[key]);
      containersArr.push(container);
    });

    this.hideContainers(containersArr);
  },

  /** очистить переданные контейнеры (стереть контент) */
  clearContainers(containersArr) {
    containersArr.forEach((container) => container.innerHTML = '');
  },

  /** спрятать контейнеры */
  hideContainers(containersArr) {
    containersArr.forEach((container) => {
      if (!container.classList.contains(Config.cssStyles.hidden)) {
        container.classList.add(Config.cssStyles.hidden);
      }
    })
  },

  /** показать страницу (удалить спрятанный класс у нее) */
  showPage(selectorStyle) {
    const page = document.querySelector(selectorStyle);
    page.classList.remove(Config.cssStyles.hidden);
  },

  /** 
   * сделать элемент пустым - серый цвет, фикс ширина, flex-grow = 0; 
   * 
   * @param {HTMLElement} elem - элемент, который нужно сделать пустым
   * @param {float} width - ширина, которую нужно назначить пустому элементу
   * */
  makeElementEmpty(elem, width) {
    elem.classList.add(Config.cssStyles.emptyWord);
    elem.innerHTML = '';
    elem.style.width = `${width}px`;
    elem.style.flexGrow = '0';
    elem.draggable = false;
  },

};

export default HtmlHelper;
