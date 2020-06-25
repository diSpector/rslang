const EnglishPuzzleConfig = {
  general: {
    maxLevels: 6,
    maxPages: 20,
    max: {
      level: 6,
      page: 20,
    },
  },

  api: {
    githubRawData: 'https://raw.githubusercontent.com/dispector/rslang-data/master/',
    githubPicturesData: 'https://raw.githubusercontent.com/dispector/rslang_data_paintings/master/',
  },

  pages: {
    // start: '',
    game: 'gameField',
    results: 'resultsField',
  },

  containers: {
    // general
    header: '.header',
    footer: '.footer',

    gameField: '.englishPuzzle__field',
    resultsField: '.englishPuzzle__results',

    // game
    // currentLevel: '.menu__level .level__current',
    // currentPage: '.menu__page .page__current',
    menus: {
      current: {
        level: '.menu__level .level__current',
        page: '.menu__page .page__current',
      },
      dropDownClass: {
        level: '.level__menu.dropdown__menu',
        page: '.page__menu.dropdown__menu',
      },
      menuTitle: {
        level: '.level__list',
        page: '.page__list',
      }
    },
    // levelDropDownMenu: '.level__menu.dropdown__menu',
    // pageDropDownMenu: '.page__menu.dropdown__menu',
    // levelMenuTitle: '.level__list',
    // pageMenuTitle: '.page__list',

    gameButtons: '.englishPuzzle__buttons.gameButtons',
    tips: '.menu__tips.tips',
    tipsAll: '.menu__tips.tips .tips__button',

    translation: '.englishPuzzle__translation',
    audioIcon: '.englishPuzzle__sound .sound__icon',

    donePhrases: '.englishPuzzle__phrases-done',
    roundPhrase: '.englishPuzzle__phrases-round',
    roundPhraseWords: '.englishPuzzle__phrases-round .phrase__words',
    roundWordsAll: '.phrase__word',
    taskPhrase: '.englishPuzzle__task .task__words',

    // results

    wholeResultsField: '.englishPuzzle__resultsField',
    
    resultsWord: '.block__word',

    resultsFail: '.englishPuzzle__results-fail',
    failCount: '.count__idk',
    failWords: '.fail__words',

    resultsSuccess: '.englishPuzzle__results-success',
    successCount: '.count__iknow',
    successWords: '.success__words',
    
    resultsButtons: '.englishPuzzle__results .results__buttons',

  },

  buttons: {
    prefix: '.gameButtons__button-',
    idkButton: '.gameButtons__button-idk',
    checkButton: '.gameButtons__button-check',
    contButton: '.gameButtons__button-cont',
    resButton: '.gameButtons__button-res',
  },

  resultsButtons: {
    continue: '.results__continue',
  },

  cssStyles: {
    menuItem: 'menu__item',
    hidden: 'englishPuzzle__block-hidden',

    tipButton: 'tips__button',
    tipPushed: 'tips__button-pushed',
    
    roundWord: 'phrase__word',
    roundWordCorrect: 'phrase__word-correct',
    roundWordIncorrect: 'phrase__word-incorrect',

    taskWord: 'task__word',

    emptyWord: 'empty',
    
    soundIconDisabled: 'sound__icon-disabled',
    soundIconBlink: 'sound__icon-blink',

    dragged: 'task__word-dragged',
    areaUnderDragged: 'englishPuzzle__area-underDrag',
  },
};

export default EnglishPuzzleConfig;