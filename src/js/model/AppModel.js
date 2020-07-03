/* eslint-disable quote-props */
/* eslint-disable max-len */
export default class AppModel {
  constructor() {
    this.searchString = 'https://afternoon-falls-25894.herokuapp.com/words?';
    this.backendURL = 'https://afternoon-falls-25894.herokuapp.com/';
    this.contentBookURL = 'https://raw.githubusercontent.com/dispector/rslang-data/master/data/book';
    this.contentURL = 'https://raw.githubusercontent.com/dispector/rslang-data/master/';
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
  }

  // change current user to new one
  changeUser(userName) {
    this.userName = userName;
  }

  // get a single learned word
  async getRandomLearnedWord() {
    if (this.learnedWordsCounter <= 0) {
      return { 'error': true, 'errorText': 'Недостаточно выученных слов' };
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
    const startOfRound = startOfDifficultyGroup + Math.floor((this.wordSetLength / roundLength) * round);
    const index = startOfRound + Math.floor(Math.random() * roundLength);
    const result = await this.getWordDataByIndex(index);
    // console.log(startOfDifficultyGroup, startOfRound, index, result);
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
  reformatWordData(wordData) {
    return {
      id: wordData.id,
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
      // wordsPerExampleSentence: wordData.wordsPerExampleSentence,
    };
  }

  // utilty function, gets word data from API by its index
  async getWordDataByIndex(index) {
    const group = Math.floor(index / this.wordSetLength);
    const page = Math.floor((index - group * this.wordSetLength) / this.defaultPageLength);
    const wordIndex = index - (group * this.wordSetLength) - (page * this.defaultPageLength);
    const url = `${this.searchString}group=${group}&page=${page}`;
    const responce = await fetch(url);
    const data = await responce.json();
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
    return {
      correct: correctWordData,
      incorrect: incorrectTranslation.wordTranslate,
    };
  }

  // выдает набор из 20 слов по указанным данным. Аргументы:
  // group -  сложность, от 0 до 5
  // page - страница, от 0 до 29
  async getSetOfWords(group, page) {
    const url = `${this.searchString}group=${group}&page=${page}`;
    const responce = await fetch(url);
    const data = await responce.json();
    const result = data.map((x) => this.reformatWordData(x));
    return result;
  }

  // выдает набор слов указанной длины по данным параметрам. Аргументы:
  // group -  сложность, от 0 до 5
  // page - страница, page * wordsPerPage не может быть больше 600
  // wordsPerPage - количество запрашиваемых слов
  async getSetOfWordsCustomLength(group, page, wordsPerPage) {
    const url = `${this.searchString}group=${group}&page=${page}&wordsPerExampleSentenceLTE=${this.maxWordsPerExampleSentence}&wordsPerPage=${wordsPerPage}`;
    const responce = await fetch(url);
    const data = await responce.json();
    const result = data.map((x) => this.reformatWordData(x));
    return result;
  }

  // служебная функция, записывающая массив слов данной сложности из гитхаба в модель
  async getWordsDataFromGithub(difficulty) {
    const url = `${this.contentBookURL}${difficulty}.json`;
    const responce = await fetch(url);
    const data = await responce.json();
    this.currentWordSet = await data;
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
    const finalArray = [];
    const totalNumberOfRounds = this.wordSetLength / roundLength;
    await this.getWordsDataFromGithub(difficulty);
    const correctResults = this.getRoundDataFromModel(round, roundLength).map((x) => this.reformatWordData(x));
    do {
      numberOfCurrentRound = Math.floor(Math.random() * totalNumberOfRounds);
      if (!incorrectTranslationsRounds.includes(numberOfCurrentRound) && numberOfCurrentRound !== round) {
        incorrectTranslationsRounds.push(numberOfCurrentRound);
      }
    } while (incorrectTranslationsRounds.length < numberOfTranslations);
    for (let i = 0; i < numberOfTranslations; i += 1) {
      incorrectTranslations[i] = this.getRoundDataFromModel(incorrectTranslationsRounds[i], roundLength);
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
  // numberOfWords - количество запрашиваемых слов, функция тестировалась для значений 10, 20, 30, 60
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
    const result = await this.getSetOfWordsAndTranslations(randomDifficulty, indexOfRandomRound, numberOfWords, numberOfTranslations);
    return result;
  }

  // выдает рандомный массив выученных слов заданной длины
  async getSetOfLearnedWords(numberOfWords) {
    let startIndex = 0;
    if (numberOfWords > this.learnedWordsCounter) {
      return null;
    }
    const randomSeed = Math.floor(Math.random() * (this.learnedWordsCounter - numberOfWords));
    const randomDifficulty = Math.floor(randomSeed / this.wordSetLength) + 1;
    await this.getWordsDataFromGithub(randomDifficulty);
    startIndex = randomSeed - randomDifficulty * this.wordSetLength;
    return this.currentWordSet.slice(startIndex, startIndex + numberOfWords).map((x) => this.reformatWordData(x));
  }


  // создание пользователя
  async createUser(user) {
    const validation = this.validateUserData(user);
    if (validation.valid) {
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
    }
    return { data: null, error: validation.error, errorText: validation.errorText };
  }

  // логин пользователя
  async loginUser(user) {
    const validation = this.validateUserData(user);
    if (validation.valid) {
      const rawResponse = await fetch(`${this.backendURL}signin`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const content = await rawResponse.json();
      console.log(content);
      this.authToken = content.token;
      this.userId = content.userId;
      return { data: content, error: false, errorText: '' };
    }
    return { data: null, error: validation.error, errorText: validation.errorText };
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

  // сохранение стратистики
  async saveStats(stats) {
    const rawResponse = await fetch(`${this.backendURL}users/${this.userId}/statistics`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${this.authToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stats),
    });
    const content = await rawResponse.json();
    console.log(content);
  }

  // получение статистики залогиненного пользователя
  async getStats() {
    const rawResponse = await fetch(`${this.backendURL}users/${this.userId}/statistics`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${this.authToken}`,
        'Accept': 'application/json',
      },
    });
    const content = await rawResponse.json();
    console.log(content);
  }
}
