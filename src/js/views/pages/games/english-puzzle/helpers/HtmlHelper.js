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
    const menuLevelContainer = document.querySelector(Config.containers.levelDropDownMenu);
    const menuPageContainer = document.querySelector(Config.containers.pageDropDownMenu);
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
  }

};

export default HtmlHelper;
