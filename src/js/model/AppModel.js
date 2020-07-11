import WordsHelper from './helpers/WordsHelper';
import DateHelper from './helpers/DateHelper';

export default class AppModel {
  constructor() {
    this.searchString = 'https://afternoon-falls-25894.herokuapp.com/words?';
    this.backendURL = 'https://afternoon-falls-25894.herokuapp.com/';
    this.contentBookURL = 'https://raw.githubusercontent.com/dispector/rslang-data/master/data/book';
    this.contentURL = 'https://raw.githubusercontent.com/dispector/rslang-data/master/';
    this.backendWordIdPrefix = '5e9f5ee35eb9e72bc21';
    this.backendFirstWordId = '5e9f5ee35eb9e72bc21af4a0';
    this.userName = 'defaultUser';
    this.maxDictionaryLength = 3600;
    this.learnedWordsCounter = 100;
    this.learnedWords = [];
    this.newWords = [];
    this.difficultWords = [];
    this.deletedWords = [];
    this.dailyQuote = 20;
    this.maxWordsPerExampleSentence = 50;
    this.wordSetLength = 600;
    this.defaultPageLength = 20;
    this.numberOfDifficulties = 6;
    this.currentWordSet = [];
    this.gameStatistics = {
      englishPuzzle: {},
      savannah: {},
      speakIt: {},
      sprint: {},
      square: {},
    };
    this.defaultUserEmail = '66group@gmail.com';
    this.defaultUserPassword = 'Gfhjkm_123';
    this.defaultUserId = '5ef6f4c5f3e215001785d617';
    this.authToken = null;
    this.userId = null;
    this.emailValidator = /^[-.\w]+@(?:[a-z\d]{2,}\.)+[a-z]{2,6}$/;
    this.passwordValidator = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[+\-_@$!%*?&#.,;:[\]{}])[\S]{8,}$/;
    this.serverErrorMessage = 'Ошибка при обращении к серверу';

    this.wordsHelper = WordsHelper;
    this.dateHelper = DateHelper;
  }

  // change current user to new one
  changeUser(userName) {
    this.userName = userName;
  }

  // get a single learned word
  async getRandomLearnedWord() {
    if (this.learnedWordsCounter <= 0) {
      return { error: true, errorText: 'Недостаточно выученных слов' };
    }
    const randomIndex = Math.floor(Math.random() * Math.floor(this.learnedWordsCounter));
    return this.getWordDataByIndex(randomIndex);
  }

  // get a single unknown word
  async getNewUnknownWord() {
    return this.getWordDataByIndex(this.learnedWordsCounter);
  }

  // get a single random word with set difficulty and round
  async getRandomWordByDifficulty(difficulty, round, roundLength) {
    if (difficulty > 5 || difficulty < 0) {
      return null;
    }
    const startOfDifficultyGroup = Math.floor(difficulty * this.wordSetLength);
    const startOfRound = startOfDifficultyGroup
      + Math.floor((this.wordSetLength / roundLength) * round);
    const index = startOfRound + Math.floor(Math.random() * roundLength);
    const result = await this.getWordDataByIndex(index);
    return result;
  }

  // manually set counter for learned words, supposed to be used only for debugging!!
  setLearnedWords(num) {
    this.learnedWordsCounter = num;
  }

  // increase counter forlearned words by 1
  increaseLearnedWordsBy1() {
    this.learnedWordsCounter += 1;
  }

  // decrease counter forlearned words by 1
  decreaseLearnedWordsBy1() {
    this.learnedWordsCounter -= 1;
  }

  // utility function, cuts useless word data and sets correct paths for img/mp3 assets
  reformatWordData(wordData, isDashBeforeId) {
    return {
      id: (!isDashBeforeId) ? wordData.id : wordData._id,
      textExample: wordData.textExample,
      textExampleTranslate: wordData.textExampleTranslate,
      textMeaning: wordData.textMeaning,
      textMeaningTranslate: wordData.textMeaningTranslate,
      word: wordData.word,
      wordTranslate: wordData.wordTranslate,
      transcription: wordData.transcription,
      audio: `${this.contentURL}${wordData.audio}`,
      audioMeaning: `${this.contentURL}${wordData.audioMeaning}`,
      audioExample: `${this.contentURL}${wordData.audioExample}`,
      image: `${this.contentURL}${wordData.image}`,
      difficulty: wordData.group,
      userWord: (!isDashBeforeId) ? null : wordData.userWord,
      // wordsPerExampleSentence: wordData.wordsPerExampleSentence,
    };
  }

  // utilty function, gets word data from API by its index
  async getWordDataByIndex(index) {
    // console.log(index);
    const group = Math.floor(index / 600);
    const page = Math.floor((index - group * 600) / 20);
    const wordIndex = index - (group * 600) - (page * 20);
    const url = `https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}`;
    const responce = await fetch(url);
    const data = await responce.json();
    //console.log(data);
    const result = this.reformatWordData(data[wordIndex]);
    return result;
  }

  // выдает случайное слово и 4 неправильных перевода к нему
  async getFivePossibleTranslations() {
    const correctWordData = await this.getNewUnknownWord();
    const incorrectTranslation1Promise = this.getRandomLearnedWord();
    const incorrectTranslation2Promise = this.getRandomLearnedWord();
    const incorrectTranslation3Promise = this.getRandomLearnedWord();
    const incorrectTranslation4Promise = this.getRandomLearnedWord();
    const incorrectTranslation1 = await incorrectTranslation1Promise;
    const incorrectTranslation2 = await incorrectTranslation2Promise;
    const incorrectTranslation3 = await incorrectTranslation3Promise;
    const incorrectTranslation4 = await incorrectTranslation4Promise;
    if (correctWordData.error) {
      return correctWordData.errorText;
    }
    if (incorrectTranslation1.error) {
      return incorrectTranslation1.errorText;
    }
    if (incorrectTranslation2.error) {
      return incorrectTranslation2.errorText;
    }
    if (incorrectTranslation3.error) {
      return incorrectTranslation3.errorText;
    }
    if (incorrectTranslation4.error) {
      return incorrectTranslation4.errorText;
    }
    return {
      correct: correctWordData,
      incorrect: [
        incorrectTranslation1,
        incorrectTranslation2,
        incorrectTranslation3,
        incorrectTranslation4,
      ],
    };
  }

  // выдает случайное слово и один неправильный перевод
  async getTwoPossibleTranslations() {
    const correctWordDataPromise = this.getRandomLearnedWord();
    const incorrectTranslationPromise = this.getRandomLearnedWord();
    const correctWordData = await correctWordDataPromise;
    const incorrectTranslation = await incorrectTranslationPromise;
    if (correctWordData.error) {
      return correctWordData.errorText;
    }
    if (incorrectTranslation.error) {
      return incorrectTranslation.errorText;
    }
    return {
      correct: correctWordData,
      incorrect: incorrectTranslation.wordTranslate,
    };
  }

  // выдает набор из 20 слов по указанным данным. Аргументы:
  // group -  сложность, от 0 до 5
  // page - страница, от 0 до 29
  async getSetOfWords(group, page) {
    if (group < 0 || group > 5 || page < 0 || page > 29) {
      return { error: true, errorText: 'Некорректные аргументы функции' };
    }
    const url = `${this.searchString}group=${group}&page=${page}`;
    try {
      const responce = await fetch(url);
      const data = await responce.json();
      const result = data.map((x) => this.reformatWordData(x));
      return result;
    } catch (e) {
      return { error: true, errorText: this.serverErrorMessage };
    }
  }

  // выдает набор слов указанной длины по данным параметрам. Аргументы:
  // group -  сложность, от 0 до 5
  // page - страница, page * wordsPerPage не может быть больше 600
  // wordsPerPage - количество запрашиваемых слов
  async getSetOfWordsCustomLength(
    group,
    page,
    wordsPerPage = 10,
    wordsPerExampleSentenceLTE = this.maxWordsPerExampleSentence,
  ) {
    if (group < 0 || group > 5 || page < 0 || wordsPerPage < 0 || page * wordsPerPage > 600) {
      return { error: true, errorText: 'Некорректные аргументы функции' };
    }
    try {
      const url = `${this.searchString}group=${group}&page=${page}&wordsPerExampleSentenceLTE=${wordsPerExampleSentenceLTE}&wordsPerPage=${wordsPerPage}`;
      const responce = await fetch(url);
      const data = await responce.json();
      const result = data.map((x) => this.reformatWordData(x));
      return result;
    } catch (e) {
      return { error: true, errorText: this.serverErrorMessage };
    }
  }

  // служебная функция, записывающая массив слов данной сложности из гитхаба в модель
  async getWordsDataFromGithub(difficulty) {
    try {
      const url = `${this.contentBookURL}${difficulty}.json`;
      const responce = await fetch(url);
      const data = await responce.json();
      this.currentWordSet = await data;
      return { error: false, errorText: '' };
    } catch (e) {
      return { error: true, errorText: this.serverErrorMessage };
    }
  }

  // служебная ф-я, достающая из данных модели набор слов для указанного раунда
  getRoundDataFromModel(round, roundLength) {
    return this.currentWordSet.slice(round * roundLength, (round + 1) * roundLength);
  }

  // предполагается что это будет основная ф-я для получения слов из бекенда в миниигры
  // на входе: difficulty - сложность (от 1 до 6)
  // round - номер раунда. в зависимости от длины раунда может быть  0 - 29, 0-19 или 0-59.
  // roundLength - количество слов в раунде игры. допустимые значения 10/20/30
  // numberOfTranslations - количество НЕПРАВИЛЬНЫХ переводов идущих вместе с правильным (от 1 до 5)
  async getSetOfWordsAndTranslations(difficulty, round, roundLength, numberOfTranslations) {
    const incorrectTranslationsRounds = [];
    const incorrectTranslations = [];
    let incorrectTranslationsSubArray = [];
    let numberOfCurrentRound;
    let githubData = {};
    const finalArray = [];
    const totalNumberOfRounds = this.wordSetLength / roundLength;
    githubData = await this.getWordsDataFromGithub(difficulty);
    if (githubData.error) {
      return { error: true, errorText: this.serverErrorMessage };
    }
    const correctResults = this.getRoundDataFromModel(round, roundLength)
      .map((x) => this.reformatWordData(x));
    do {
      numberOfCurrentRound = Math.floor(Math.random() * totalNumberOfRounds);
      if (
        !incorrectTranslationsRounds.includes(numberOfCurrentRound)
        && numberOfCurrentRound !== round
      ) {
        incorrectTranslationsRounds.push(numberOfCurrentRound);
      }
    } while (incorrectTranslationsRounds.length < numberOfTranslations);
    for (let i = 0; i < numberOfTranslations; i += 1) {
      incorrectTranslations[i] = this
        .getRoundDataFromModel(incorrectTranslationsRounds[i], roundLength);
    }
    for (let i = 0; i < roundLength; i += 1) {
      incorrectTranslationsSubArray = [];
      for (let j = 0; j < numberOfTranslations; j += 1) {
        incorrectTranslationsSubArray.push(incorrectTranslations[j][i]);
      }
      finalArray.push({ correct: correctResults[i], incorrect: incorrectTranslationsSubArray });
    }
    return finalArray;
  }

  // функция, выдающая набор заданной длины из ВЫУЧЕННЫХ слов и неправильных переводов к ним
  // numberOfWords - кол-во запрашиваемых слов, функция тестировалась для значений 10, 20, 30, 60
  // numberOfTranslations - количество переводов для каждого слова, от 0 до 4
  async getSetOfLearnedWordsAndTranslations(numberOfWords, numberOfTranslations) {
    if (numberOfWords > this.learnedWordsCounter) {
      return null;
    }
    // выбираем случайное число от 0 до this.learnedWordsCounter чтобы выбрать сложность
    const randomSeed = Math.floor(Math.random() * (this.learnedWordsCounter - numberOfWords));
    let randomDifficulty = Math.floor(randomSeed / this.wordSetLength) + 1;
    // находим начальный индекс сложности, из которой мы будем брать слова
    // если в данной сложности слов нехватает для запроса, опускаемся на одну ниже
    let startIndex = (randomDifficulty - 1) * this.wordSetLength;
    if (this.learnedWordsCounter - startIndex < numberOfWords) {
      randomDifficulty -= 1;
      startIndex -= this.wordSetLength;
    }
    // находим количество слов в массиве, из которого мы будем брать слова
    // это будет или 600 или разница  this.learnedWordsCounter - startIndex
    let sourceArrAmount;
    if (this.learnedWordsCounter - startIndex > this.wordSetLength) {
      sourceArrAmount = this.wordSetLength;
    } else {
      sourceArrAmount = this.learnedWordsCounter - startIndex;
    }
    // находим количество возможных раундов, которые могут уместиться в этом массиве
    const numberOfPossibleRounds = sourceArrAmount / numberOfWords;
    // выбираем случайный раунд
    const indexOfRandomRound = Math.floor(Math.random() * numberOfPossibleRounds);
    // вызываем функцию getSetOfWordsAndTranslations с найденными параметрами
    const result = await this.getSetOfWordsAndTranslations(
      randomDifficulty,
      indexOfRandomRound,
      numberOfWords,
      numberOfTranslations,
    );
    return result;
  }

  // выдает рандомный массив выученных слов заданной длины
  async getSetOfLearnedWords(numberOfWords) {
    if (numberOfWords > this.learnedWordsCounter || numberOfWords < 1) {
      return { error: true, errorText: 'Некорректные аргументы функции' };
    }
    let startIndex = 0;
    let githubData = {};
    if (githubData.error) {
      return { error: true, errorText: this.serverErrorMessage };
    }
    const randomSeed = Math.floor(Math.random() * (this.learnedWordsCounter - numberOfWords));
    const randomDifficulty = Math.floor(randomSeed / this.wordSetLength) + 1;
    githubData = await this.getWordsDataFromGithub(randomDifficulty);
    startIndex = randomSeed - randomDifficulty * this.wordSetLength;
    return this.currentWordSet.slice(startIndex, startIndex + numberOfWords)
      .map((x) => this.reformatWordData(x));
  }


  // создание пользователя
  async createUser(user) {
    const validation = this.validateUserData(user);
    if (!validation.valid) {
      return { data: null, error: validation.error, errorText: validation.errorText };
    }
    try {
      const rawResponse = await fetch(`${this.backendURL}users`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const content = await rawResponse.json();
      return { data: content, error: false, errorText: '' };
    } catch (e) {
      return { error: true, errorText: this.serverErrorMessage };
    }
  }

  // логин пользователя
  async loginUser(user) {
    const validation = this.validateUserData(user);
    if (!validation.valid) {
      return { data: null, error: validation.error, errorText: validation.errorText };
    }
    try {
      const rawResponse = await fetch(`${this.backendURL}signin`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const content = await rawResponse.json();
      //console.log(content);
      return { data: content, error: false, errorText: '' };
    } catch (e) {
      return { error: true, errorText: this.serverErrorMessage };
    }
  }

  // служебная функция для валидации вводимых данных пользователя
  validateUserData(user) {
    if (!user.email || !this.emailValidator.test(user.email)) {
      return { error: true, errorText: 'Enter correct email please', valid: false };
    }
    if (!user.password || !this.passwordValidator.test(user.password)) {
      return { error: true, errorText: 'Enter correct password please', valid: false };
    }
    return { error: false, errorText: '', valid: true };
  }

  // сохранение статистики
  async saveStats(stats) {
    try {
      const rawResponse = await fetch(`${this.backendURL}users/${this.userId}/statistics`, {
        method: 'PUT',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${this.authToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stats),
      });
      const content = await rawResponse.json();
      console.log(content);
      return { error: false, errorText: '' };
    } catch (e) {
      return { error: true, errorText: this.serverErrorMessage };
    }
  }

  // получение статистики залогиненного пользователя
  async getStats() {
    try {
      const rawResponse = await fetch(`${this.backendURL}users/${this.userId}/statistics`, {
        method: 'GET',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${this.authToken}`,
          Accept: 'application/json',
        },
      });
      const content = await rawResponse.json();
      console.log(content);
      return content;
    } catch (e) {
      return { error: true, errorText: this.serverErrorMessage };
    }
  }

  /**
   * сохранить на бэкенде настройки приложения
   *
   * @param {Object} settingsObj - объект с настройками
   * settingsObj = {
   *  newWordsPerDay, // number, кол-во новых слов в день
   *  maxWordsPerDay, // number, макс кол-во карточек за день
   *  isWordTranslate, // bool, перевод слова
   *  isTextMeaning, // bool, предложение с объяснением значения слова
   *  isTextExample, // bool, предложение с примером использования изучаемого слова
   *  isTextMeaningTranslate, // bool, перевод предложения с объяснением значения слова
   *  isTextExampleTranslate, // bool, Перевод предложения с примером использования изучаемого слова
   *  isTranscription, // bool, транскрипция слова
   *  isImage, // bool, картинка-ассоциация
   *  isAnswerButton, // bool, кнопка "Показать ответ"
   *  isDeleteWordButton, // bool, кнопка "Удалить слово из изучения"
   *  isMoveToDifficultButton, // bool, кнопка - поместить слово в группу «Сложные»
   *  isIntervalButtons, // bool, блок кнопок для интервального повторения
   *  dictionary: {
   *    example,
   *    meaning,
   *    transcription,
   *    img,
   *   }
   * }
   * @return bool - успешно ли прошло сохранение настроек
   * */
  async saveSettings(settingsObj) {
    const settingsToSave = {
      wordsPerDay: settingsObj.newWordsPerDay,
      optional: {
        maxWordsPerDay: settingsObj.maxWordsPerDay,
        isWordTranslate: settingsObj.isWordTranslate,
        isTextMeaning: settingsObj.isTextMeaning,
        isTextExample: settingsObj.isTextExample,
        isTextMeaningTranslate: settingsObj.isTextMeaningTranslate,
        isTextExampleTranslate: settingsObj.isTextExampleTranslate,
        isTranscription: settingsObj.isTranscription,
        isImage: settingsObj.isImage,
        isAnswerButton: settingsObj.isAnswerButton,
        isDeleteWordButton: settingsObj.isDeleteWordButton,
        isMoveToDifficultButton: settingsObj.isMoveToDifficultButton,
        isIntervalButtons: settingsObj.isIntervalButtons,
        dictionary: {
          example: settingsObj.dictionary.example,
          meaning: settingsObj.dictionary.meaning,
          transcription: settingsObj.dictionary.transcription,
          img: settingsObj.dictionary.img,
        },
      },
    };
    try {
      const url = `${this.backendURL}users/${this.userId}/settings`;
      const rawResponse = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${this.authToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settingsToSave),
      });
      const content = await rawResponse.json();
      console.log('content', content);
      return { error: false, errorText: '' };
    } catch (e) {
      return { error: true, errorText: 'Ошибка при сохранении настроек. Попробуйте еще раз попозже' };
    }
  }

  /**
   * сохранить настройки словаря (не затронув при этом настройки приложения)
   * @param {Object} settingsObj - {example, meaning, transcription, img}
  */
  async saveDictionarySettings(settingsObj) {
    const appSettingsRaw = await this.getSettings();
    const appSettings = appSettingsRaw.data;
    const newSettings = appSettings;
    newSettings.dictionary = settingsObj;
    await this.saveSettings(newSettings);
  }

  /** сохранить настройки приложения (не затронув настройки словаря) */
  async saveCardsSettings(settingsObj) {
    const appSettingsRaw = await this.getSettings();
    const { dictionary } = appSettingsRaw.data;
    const newSettings = settingsObj;
    newSettings.dictionary = dictionary;
    await this.saveSettings(newSettings);
  }

  /** получить с бэкенда ВСЕ настройки приложения */
  async getSettings() {
    try {
      const url = `${this.backendURL}users/${this.userId}/settings`;
      const rawResponse = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.authToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const content = await rawResponse.json();
      const settingsObj = {
        newWordsPerDay: content.wordsPerDay,
        maxWordsPerDay: content.optional.maxWordsPerDay,
        isWordTranslate: content.optional.isWordTranslate,
        isTextMeaning: content.optional.isTextMeaning,
        isTextExample: content.optional.isTextExample,
        isTextMeaningTranslate: content.optional.isTextMeaningTranslate,
        isTextExampleTranslate: content.optional.isTextExampleTranslate,
        isTranscription: content.optional.isTranscription,
        isImage: content.optional.isImage,
        isAnswerButton: content.optional.isAnswerButton,
        isDeleteWordButton: content.optional.isDeleteWordButton,
        isMoveToDifficultButton: content.optional.isMoveToDifficultButton,
        isIntervalButtons: content.optional.isIntervalButtons,
        dictionary: content.optional.dictionary,
      };
      return { data: settingsObj, error: false, errorText: '' };
    } catch (e) {
      return { error: true, errorText: 'Ошибка при получении настроек. Попробуйте еще раз попозже' };
    }
  }

  /**
   * получить с бэкенда все изученные пользователем слова
   * */
  async getAllLearnedWordsFromBackend() {
    try {
      const url = `${this.backendURL}users/${this.userId}/words`;
      const rawResponse = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.authToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const content = await rawResponse.json();
      return { data: content, error: false, errorText: '' };
    } catch (e) {
      return { error: true, errorText: 'Ошибка при получении слов. Попробуйте еще раз попозже' };
    }
  }

  /**
   * получить все слова за сегодня (изученные + новые), с учетом интервалов
   */
  async getWordsForDay() {
    const settings = await this.getSettings();
    const { data: { maxWordsPerDay, newWordsPerDay } } = settings;
    const needToBeLearnedWords = maxWordsPerDay - newWordsPerDay;
    const learnedWordsObj = await this.getAllLearnedWordsFromBackend();
    /** @var learnedWords - все выученные слова - массив [
     * { difficulty: string, // сложность - normal|hard
     *   wordId: string, // id данного слова на бэкенде
     *   optional: {
     *     wordId: number, // id слова в bookN.js
     *     state: string, // none|deleted,
     *     date: dateTime, // none|dateTime - дата следующего повторения
     *     dateLearned: dateTime, // none|dateTime - дата изучения слова
     *    }
     *  }
     * ]
     * */
    const { data: allLearnedWordsWithDeleted } = learnedWordsObj;
    /** оставляем только слова без метки "deleted" */
    const allLearnedWords = this.wordsHelper.removeDeletedWords(allLearnedWordsWithDeleted);

    // добавить проверку на непустоту

    const dateToday = this.dateHelper.getBeutifyTodayDate();
    /** сначала берем слова с сегодняшней датой */
    const wordsWithDateToday = this.wordsHelper.filterWordsWithDate(allLearnedWords, dateToday);

    /** ищем слова, у которых дата не указана */
    const wordsWithoutDate = this.wordsHelper.filterWordsWithDate(allLearnedWords, 'none');

    /** ищем слова, у которых дата указана и она не сегодня, чтобы добить ими массив */
    const wordsWithDateSpecified = this.wordsHelper
      .filterWordsDateSpecNotToday(allLearnedWords, dateToday);

    const wordsArraysObj = {
      todayWords: wordsWithDateToday,
      withoutDateWords: wordsWithoutDate,
      withDateWords: wordsWithDateSpecified,
    };

    /** получаем максимальный массив из выученных слов (но не более, чем needToBeLearnedWords) */
    const resLearnedArr = this.wordsHelper.formLearnedArray(wordsArraysObj, needToBeLearnedWords);

    const wordsIds = (resLearnedArr.length !== 0)
      ? this.wordsHelper.getWordsIds(resLearnedArr)
      : [this.backendFirstWordId];
    // const wordsIdsFromBook = this.wordsHelper.getIdsFromBook(resLearnedArr);

    const wordsRaw = await this.getAggregateUserWords(wordsIds);
    const words = wordsRaw.data[0].paginatedResults
      .map((word) => this.reformatWordData(word, true));

    /** @var resWordsArr - массив изученных слов для вывода */
    const resWordsArr = this.wordsHelper.prepareArrayForOutput(words);

    /** дальше происходит магия - берем айдишники выученных слов (последние 5 цифр каждого)
     * переводим их в десятичную систему счисления, находим максимальное число,
     * берем это число + 1 и формируем newWordsPerDay последовательных id,
     * которые конвертируем в 16-систему счисления, добавляя префикс - это айдишники новых слов
     */
    const convertIdsFromHex = this.wordsHelper.convertIdsFromHex(wordsIds);

    const maxId = Math.max(...convertIdsFromHex);
    const idsArr = this.wordsHelper.createArrOfIds(
      newWordsPerDay,
      maxId + 1,
      this.backendWordIdPrefix,
    );

    // const newWordsObj = await this.getNewWords(newWordsPerDay, maxId);
    // const { data: newWordsRaw } = newWordsObj;
    // const newWordsArr = newWordsRaw.map((wordObj) => this.reformatWordData(wordObj));
    const resNewWordsArr = this.wordsHelper.addNewMark(idsArr);

    /** @var returnArray - итоговый, но пока НЕ перемешанный массив из новых и изученных слов */
    const returnArray = resWordsArr.concat(resNewWordsArr);
    const shuffledReturnArray = this.wordsHelper.shuffleArray(returnArray);
    return shuffledReturnArray;
  }

  /** получить слова по агрегированному запросу - объект, в котором есть ВСЁ */
  async getAggregateUserWords(wordsIdsArr) {
    const aggrObj = this.wordsHelper.getAggrWordsIds(wordsIdsArr);
    try {
      const url = `${this.backendURL}users/${this.userId}/aggregatedWords?wordsPerPage=50&filter=${JSON.stringify(aggrObj)}`;
      const rawResponse = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.authToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const content = await rawResponse.json();

      return { data: content, error: false, errorText: '' };
    } catch (e) {
      return { error: true, errorText: 'Ошибка при получении слов. Попробуйте еще раз попозже' };
    }
  }

  /** получить слово с бэкенда */
  async getNextWord(wordObj) {
    const { id } = wordObj;
    const wordRaw = await this.getWordById(id);
    // добавить обработку ошибок
    return this.reformatWordData(wordRaw.data);
  }

  /** подготовить объект для создания нового слова */
  prepareObjForNewWord(newWordId) {
    const dateToday = this.dateHelper.getBeutifyTodayDate();
    return {
      difficulty: 'normal',
      optional: {
        wordId: newWordId,
        state: 'none',
        date: 'none', // когда слово будет показываться в след. раз
        dateLearned: dateToday, // когда было выучено
        dateLast: dateToday, // когда было показано в послед. раз
        count: 1, // счетчик показов
      },
    };
  }

  /** подготовить объект для обновления слова */
  prepareObjForUpdatedWord(wordObj) {
    const { userWord: newWordObj } = wordObj;
    const dateToday = this.dateHelper.getBeutifyTodayDate();
    const oldCount = newWordObj.optional.count;
    const newCount = (!oldCount) ? 1 : (oldCount + 1);
    // для существующего слова просто обновляем дату последнего показа и счетчик показов
    newWordObj.optional.dateLast = dateToday;
    newWordObj.optional.count = newCount;

    return newWordObj;
  }

  /** обработать угаданное слово - Нажатие на кнопку "Далее"
   * @param {Object} wordObj - объект слова
   * wordObj = {
   *   id: String // "5e9f5ee35eb9e72bc21af4a0" - id слова на бэкенде
   *   isNew: Boolean // новое слово или изученное
   *   ... + другие поля для уже изученных слов
   * }
  */
  async processSolvedWord(wordObj) {
    const res = (!wordObj.isNew)
      ? await this.processLearnedWord(wordObj)
      : await this.processNewWord(wordObj);

    return res;
  }

  async processNewWord(wordObj) {
    const { id } = wordObj;
    const newWordObj = this.prepareObjForNewWord(id);
    const res = await this.createLearnedWord(id, newWordObj);
    return res;
  }

  async processLearnedWord(wordObj) {
    const { id } = wordObj;
    const newWordObj = this.prepareObjForUpdatedWord(wordObj);
    const res = await this.updateUserWord(id, newWordObj);
    return res;
  }

  /** добавить слово в слова пользователя на бэкенде */
  async createLearnedWord(wordId, wordObj) {
    try {
      const url = `${this.backendURL}users/${this.userId}/words/${wordId}`;
      const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.authToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wordObj),
      });
      const content = await rawResponse.json();

      return { data: content, error: false, errorText: '' };
    } catch (e) {
      return { error: true, errorText: 'Ошибка при получении слов. Попробуйте еще раз попозже' };
    }
  }

  /** обновить слово в словах пользователя на бэкенде */
  async updateUserWord(wordId, wordObj) {
    try {
      const url = `${this.backendURL}users/${this.userId}/words/${wordId}`;
      const rawResponse = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${this.authToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wordObj),
      });
      const content = await rawResponse.json();

      return { data: content, error: false, errorText: '' };
    } catch (e) {
      return { error: true, errorText: 'Ошибка при получении слов. Попробуйте еще раз попозже' };
    }
  }

  /** получить слово с бэкенда по id */
  async getWordById(id) {
    const url = `${this.backendURL}words/${id}?noAssets=true`;
    try {
      const rawResponse = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const content = await rawResponse.json();

      return { data: content, error: false, errorText: '' };
    } catch (e) {
      return { error: true, errorText: 'Ошибка при получении слов. Попробуйте еще раз попозже' };
    }
  }

  /** установить нужную сложность слову
   * @param {String} wordId - id слова на бэкенде
   * @param {String} difficulty - сложность (weak|normal|hard)
  */
  async setWordDifficultAs(wordId, newDifficulty = 'normal') {
    const { data: { optional } } = await this.getUserWordById(wordId);
    const newWord = {
      difficulty: newDifficulty,
      optional,
    };
    const res = await this.updateUserWord(wordId, newWord);
    return res;
  }

  /** установить нужное состояние слову
   * @param {String} wordId - id слова на бэкенде
   * @param {String} newState - состояние (none|deleted)
  */
  async setWordStateAs(wordId, newState = 'none') {
    const { data: { difficulty, optional } } = await this.getUserWordById(wordId);
    const newOptional = { ...optional };

    newOptional.state = newState;
    const newWord = {
      difficulty,
      optional: newOptional,
    };

    const res = await this.updateUserWord(wordId, newWord);
    return res;
  }

  /** установить нужную дату следующего показа слову
   * @param {String} wordId - id слова на бэкенде
   * @param {String} newDate - дата (в формате YYYY-MM-DD)
  */
  async setWordDateAs(wordId, newDate) {
    const { data: { difficulty, optional } } = await this.getUserWordById(wordId);
    const newOptional = { ...optional };

    newOptional.date = newDate;
    const newWord = {
      difficulty,
      optional: newOptional,
    };

    const res = await this.updateUserWord(wordId, newWord);
    return res;
  }

  /** добавить слово в сложные */
  async addWordToHard(wordId) {
    const res = await this.setWordDifficultAs(wordId, 'hard');
    return res;
  }

  /** сделать слово нормальным (удалить из сложных) */
  async addWordToNormal(wordId) {
    const res = await this.setWordDifficultAs(wordId, 'normal');
    return res;
  }

  /** сделать слово легким (удалить из сложных) */
  async addWordToWeak(wordId) {
    const res = await this.setWordDifficultAs(wordId, 'weak');
    return res;
  }

  /** добавить слово в удаленные */
  async addWordToDeleted(wordId) {
    const res = await this.setWordStateAs(wordId, 'deleted');
    return res;
  }

  /** удалить слово из удаленных */
  async removeWordFromDeleted(wordId) {
    const res = await this.setWordStateAs(wordId, 'none');
    return res;
  }

  /** установить интервал для кнопки "Просто" - 1 месяц */
  async setIntervalAsEasy(wordId) {
    const date = DateHelper.getNextMonthDate();
    const res = await this.setWordDateAs(wordId, date);
    return res;
  }

  /** установить интервал для кнопки "Хорошо" - 1 неделя */
  async setIntervalAsGood(wordId) {
    const date = DateHelper.getNextWeekDate();
    const res = await this.setWordDateAs(wordId, date);
    return res;
  }

  /** установить интервал для кнопки "Сложно" - 1 день */
  async setIntervalAsHard(wordId) {
    const date = DateHelper.getTomorrowDate();
    const res = await this.setWordDateAs(wordId, date);
    return res;
  }

  /** установить интервал для кнопки "Снова" - сегодня */
  async setIntervalAsAgain(wordId) {
    const date = DateHelper.getTodayDate();
    const res = await this.setWordDateAs(wordId, date);
    return res;
  }


  /** получить слово ПОЛЬЗОВАТЕЛЯ с бэкенда по id */
  async getUserWordById(wordId) {
    const url = `${this.backendURL}users/${this.userId}/words/${wordId}`;
    try {
      const rawResponse = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.authToken}`,
          'Content-Type': 'application/json',
        },
      });
      const content = await rawResponse.json();

      return { data: content, error: false, errorText: '' };
    } catch (e) {
      return { error: true, errorText: 'Ошибка при получении слов. Попробуйте еще раз попозже' };
    }
  }


  /** APP DICTIONARY METHODS - BEGIN */

  /** получить слова для словаря в объекте из 3 массивов:
   * 1) все, кроме удаленных,
   * 2) все сложные,
   * 3) все удаленные
   */
  async getWordsForDictionary() {
    const aggrAllLearnedWordsObj = this.wordsHelper.getAggrObgForAllLearnedWords();
    const allLearnedWordsWithDeletedRaw = await this
      .getAggregateUserWordsByObj(aggrAllLearnedWordsObj);
    const allLearnedWordsWithDeleted = allLearnedWordsWithDeletedRaw.data[0].paginatedResults
      .map((word) => this.reformatWordData(word, true));
    const mappedWordsForDictionary = this.wordsHelper
      .getLearnHardDeletedWords(allLearnedWordsWithDeleted);
    return mappedWordsForDictionary;
  }

  /** APP DICTIONARY METHODS - END */

  /** получить все слова, изученные за переданную дату
   * @param {String} date - дата в формате YYYY-MM-DD (если не передана - сегодняшняя дата)
   * @return {Array} - массив выученных слов за переданную дату
   */
  async getLearnedWordsByDate(date = null) {
    const searchDate = (date) || this.dateHelper.getBeutifyTodayDate();
    const { data: learnedWords } = await this.getAllLearnedWordsFromBackend();
    return this.wordsHelper.getWordsByDate(learnedWords, searchDate);
  }

  /** получить КОЛИЧЕСТВО выученных слов за переданную дату
   * @param {String} date - дата в формате YYYY-MM-DD (если не передана - сегодняшяя дата)
   * @return {Number} - кол-во выученных слов за дату
  */
  async getHowManyLearnedWordsByDate(date = null) {
    const learnedWordsByDate = await this.getLearnedWordsByDate(date);
    return learnedWordsByDate.length;
  }

  /** APP STATISTICS METHODS - BEGIN */

  /** получить объекты всех изученных слова с указанной датой изучения, сгруппир. по датам */
  async groupLearnedWordsByDates() {
    const aggrObjForDatesLearned = this.wordsHelper.getAggrObgForDateLearned();
    const aggrWordsRaw = await this.getAggregateUserWordsByObj(aggrObjForDatesLearned, 100);
    const aggrWords = aggrWordsRaw.data[0].paginatedResults
      .map((word) => this.reformatWordData(word, true));
    const mappedWords = this.wordsHelper.getWordsMappedByDates(aggrWords);
    return mappedWords;
  }

  /** получить массив объектов вида {Дата:Кол-во изученных слов} для всех дат */
  async getLearnedWordsCountByDates() {
    const rawWordsByDates = await this.groupLearnedWordsByDates();
    const wordsCountByDates = this.wordsHelper.getWordsCountByDates(rawWordsByDates);
    return wordsCountByDates;
  }

  /** получить массив объектов вида {Дата:[слова]} для всех дат */
  async getLearnedWordsByDates() {
    const rawWordsByDates = await this.groupLearnedWordsByDates();
    const wordsByDates = this.wordsHelper.getWordsByDates(rawWordsByDates);
    return wordsByDates;
  }

  /**
   * получить универсальный объект для статистики
   * {
   *  wordsByDates: [{дата: массив слов, изученных в эту дату},...]
   *  wordsCountByDates: [{дата: кол-во слов, изученных в эту дату},...]
   * }
   * */
  async getBothWordsAndCountByDates() {
    const rawWordsByDates = await this.groupLearnedWordsByDates();
    const wordsCountByDates = this.wordsHelper.getWordsCountByDates(rawWordsByDates);
    const wordsByDates = this.wordsHelper.getWordsByDates(rawWordsByDates);
    return {
      wordsByDates,
      wordsCountByDates,
    };
  }

  /** APP STATISTICS METHODS - END */

  /**
   * получить агрегированные слова пользователя в соответствии с запросом
   * @param {JSON} aggrObj - объект с агрегированным запросом (валидный JSON)
   * @param {Number} count - кол-во записей (по умолчанию 50)
  */
  async getAggregateUserWordsByObj(aggrObj, count = 50) {
    try {
      const url = `${this.backendURL}users/${this.userId}/aggregatedWords?wordsPerPage=${count}&filter=${aggrObj}`;
      const rawResponse = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.authToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const content = await rawResponse.json();

      return { data: content, error: false, errorText: '' };
    } catch (e) {
      return { error: true, errorText: 'Ошибка при получении слов. Попробуйте еще раз попозже' };
    }
  }
}

// /**
//  * вернуть слова с гитхаба - либо с одной книги, либо с двух (если нужно склеить)
//  *
//  * @param {Number} count - количество слов, которые нужно получить,
//  * @param {Number} begin - с какого id начать отдавать эти слова
//  *
//  * @return {Array} - массив объектов слов
//  * */
// async getNewWords(count, begin) {
//   const bookNumberStart = Math.floor(begin / 600) + 1;
//   const bookNumberEnd = Math.floor((begin + count) / 600) + 1;
//   let words = [];
//   const relativeBegin = begin - ((bookNumberStart - 1) * 600);
//   if (bookNumberStart === bookNumberEnd) {
//     words = await this.getWordsFromBook(bookNumberStart, count, relativeBegin);
//     return words;
//   } else {
//     const wordsBegin = await this
// .getWordsFromBook(bookNumberStart, 600 - relativeBegin, relativeBegin);
//     const wordsEnd = await this
// .getWordsFromBook(bookNumberEnd, count - (600 - relativeBegin), 0);
//     return wordsBegin.concat(wordsEnd);
//   }
// }

// /** вернуть с гитхаба count слов, начиная с begin */
// async getWordsFromBook(bookNumber, count, begin) {
//   try {
//     const url = `${this.contentBookURL}${bookNumber}.json`;
//     const response = await fetch(url);
//     const data = await response.json();
//     const resArr = data.slice(begin, begin + count);
//     return { data: resArr, 'error': false, 'errorText': '' };
//   } catch (e) {
//     return { 'error': true, 'errorText': this.serverErrorMessage };
//   }
// }


// {
//   "wordsPerDay": 20,
//   "optional": {
//     "maxWordsPerDay": 40,
//     "isWordTranslate": true,
//     "isTextMeaning": true,
//     "isTextExample": true,
//     "isTextMeaningTranslate": true,
//     "isTextExampleTranslate": true,
//     "isTranscription": true,
//     "isImage": false,
//     "isAnswerButton": false,
//     "isDeleteWordButton": false,
//     "isMoveToDifficultButton": false,
//     "isIntervalButtons": false,
//         "dictionary": {
//           "example": true,
//           "meaning": true,
//           "transcription": true,
//           "img": true,
//         }
//   }
// }


// from Home.js
// console.log('word', word);
// const t0 = performance.now();

// const login = await model.loginUser({email: '66group@gmail.com', password: 'Gfhjkm_123'});
// console.log('login', login);

// // const settings = {
// //   newWordsPerDay: 15, // Количество новых слов в день
// //   maxWordsPerDay: 40, // Максимальное количество карточек в день
// //   isWordTranslate: true, // Перевод слова
// //   isTextMeaning: true, // Предложение с объяснением значения слова
// //   isTextExample: true, // Предложение с примером использования изучаемого слова
// //   isTextMeaningTranslate: true, // Перевод предложения с объяснением значения слова
// //   isTextExampleTranslate: true, // Перевод предл с примером использования изучаемого слова
// //   isTranscription: true, // Транскрипция слова
// //   isImage: true, // Картинка-ассоциация
// //   isAnswerButton: true, // Кнопка "Показать ответ"
// //   isDeleteWordButton: true, // Кнопка "Удалить слово из изучения"
// //   isMoveToDifficultButton: true, // Кнопка - поместить слово в группу «Сложные»
// //   isIntervalButtons: true, // Блок кнопок для интервального повторения
// // };

// // await model.saveCardsSettings(settings);

// // await model.saveDictionarySettings({
// //   example: false,
// //   meaning: false,
// //   transcription: false,
// //   img: false,
// // });
// // const settingsGet = await model.getSettings();
// // console.log('settingsGet', settingsGet);

// const words = await model.getWordsForDay();
// console.log('words', words);
// // console.log('words[0]', words[0]);
// // const wordInfo = await model.processSolvedWord(words[0]);
// // console.log('wordInfo', wordInfo);
// await model.processSolvedWord(words[0]);
// const word1 = await model.getNextWord(words[0]);
// console.log('word1', word1)
// // await model.updateLearnedWord(word1.id);

// // const word2 = await model.getNextWord(words[1]);
// // console.log('word2', word2)
// const t1 = performance.now();
// console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")

// // const learnedWordsToday = await model.getLearnedWordsByDate('2020-07-08');
// // const learnedWordsCount = await model.getHowManyLearnedWordsByDate('2020-07-08');
// // console.log('learnedWordsToday', learnedWordsToday);
// // console.log('learnedWordsCount', learnedWordsCount);
// // const learnedWordsByDate = await model.groupLearnedWordsByDates();
// // console.log('learnedWordsByDate', learnedWordsByDate);

// // const aggrLearnedDate = await model.groupLearnedWordsByDates();
// // console.log('aggrLearnedDate', aggrLearnedDate);

// // await model.addWordToHard('5e9f5ee35eb9e72bc21af4b4');
// // const adventure = await model.setIntervalAsGood('5e9f5ee35eb9e72bc21af4b4');
// // console.log('adventure', adventure);

// // const grouped = await model.getBothWordsAndCountByDates();
// // console.log('grouped', grouped);

// // model.setIntervalAsEasy();

// // const dictionary = await model.getWordsForDictionary();
// // console.log('dictionary', dictionary);
