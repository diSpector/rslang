const apiBackAddr = 'https://afternoon-falls-25894.herokuapp.com/words';
const apiGithubAddr = 'https://raw.githubusercontent.com/dispector/rslang-data/master/data/';

const Model = {
  getWordsFromBackend: async (group, page) => {
    try {
      const wordsPromise = await fetch(`${apiBackAddr}?page=${page}&group=${group}
      &wordsPerExampleSentenceLTE=10&wordsPerPage=10
        `,
      {});
      if (wordsPromise.status !== 200) {
        return null;
      }
      const words = await wordsPromise.json();
      return words;
    } catch (e) {
      console.log('Ошибка при получении слов', e.message);
      return null;
    }
  },

  /**
   * получить определенное количество слов с github
   *
   * @param {number} page - страница по сложности (от 1 до 6)
   * @param {number} count - количество слов, которое нужно вернуть
   * @param {number} offset - сдвиг слов от нуля
   *
   * @return {Object[]} - массив объектов со словами
   */
  getWordsFromGithub: async (page, count = 10, offset = 0) => {
    try {
      const wordsPromise = await fetch(`${apiGithubAddr}book${page}.json`);
      if (wordsPromise.status !== 200) {
        return null;
      }
      const words = await wordsPromise.json();
      const wordsLen = words.length;

      return ((wordsLen - offset) < count)
        ? null
        : words.slice(offset, count + offset);
    } catch (e) {
      console.log('Ошибка при получении слов', e.message);
      return null;
    }
  },

  /**
   * получить из хранилища текущий level, page, round
   * 
   * @return {Object} объект с настройками
   */
  getCurrentLevelPageRound: async () => {
    let currentLevelPageRound = localStorage.getItem('EnglishPuzzleSettings');
    if (!currentLevelPageRound) {
      currentLevelPageRound = {
        level: 0,
        page: 0,
        round: 0,
      };
      Model.saveNewLevelPageRound(currentLevelPageRound);
    } else {
      currentLevelPageRound = JSON.parse(currentLevelPageRound);
    }

    return currentLevelPageRound;
  },

  /** установить настройки level/page/round для игры */
  saveNewLevelPageRound: async (gameSettingsObj) => {
    localStorage.setItem('EnglishPuzzleSettings', JSON.stringify(gameSettingsObj));
  },

  getUserSettings: async() => {
    let userSettings = localStorage.getItem('EnglishPuzzleSettings');
    if (!userSettings) {
      userSettings = {
        progress: {
          level: 0,
          page: 0,
          round: 0,
        },
        tips: {
          autosound: true,
          translate: true,
          audio: true,
          picture: false,
        },
        localStat: {
          knowWords: [],
          idkWords: [],
        },
      };
      Model.saveUserSettings(userSettings);
    } else {
      userSettings = JSON.parse(userSettings);
    }

    return userSettings;
  },

  /** сохранить целиком весь объект настроек */
  saveUserSettings: async(gameSettingsObj) => {
    localStorage.setItem('EnglishPuzzleSettings', JSON.stringify(gameSettingsObj));
  },

  /** сохранить прогресс {level, page, round} */
  saveProgress: async(progressObj) => {
    let userSettings = JSON.parse(localStorage.getItem('EnglishPuzzleSettings'));
    userSettings.progress = Object.assign({}, progressObj);
    localStorage.setItem('EnglishPuzzleSettings', JSON.stringify(userSettings));
  },

  /** сохранить конфиг с подсказками */
  saveTips: async(tipsObj) => {
    let userSettings = JSON.parse(localStorage.getItem('EnglishPuzzleSettings'));
    userSettings.tips = Object.assign({}, tipsObj);
    localStorage.setItem('EnglishPuzzleSettings', JSON.stringify(userSettings));
  },

  /** сохранить конфиг с подсказками */
  saveStats: async (statsObj) => {
    let userSettings = JSON.parse(localStorage.getItem('EnglishPuzzleSettings'));
    userSettings.localStat = Object.assign({}, statsObj);
    localStorage.setItem('EnglishPuzzleSettings', JSON.stringify(userSettings));
  },
};

export default Model;
