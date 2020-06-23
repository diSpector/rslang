export default class AppModel {
  constructor() {
    this.searchString = 'https://afternoon-falls-25894.herokuapp.com/words?';
    this.contentURL = 'https://raw.githubusercontent.com/dispector/rslang-data/master/';
    this.userName = 'defaultUser';
    this.maxDictionaryLength = 3600;
    this.wordsCounter = 100;
    this.learnedWords = [];
    this.newWords = [];
    this.difficultWords = [];
    this.deletedWords = [];
    this.dailyQuote = 20;
    this.gameStatistics = {
      englishPuzzle: {},
      savannah: {},
      speakIt: {},
      sprint: {},
      square: {},
    };
  }

  // change current user to new one
  changeUser(userName) {
    this.userName = userName;
  }

  // return array of words, which user learned before. NOT FINISHED!!!!
  async getLearnedWords() {
    const UserData = localStorage.getItem(this.userName);
    if (UserData) {
      this.wordsCounter = UserData.wordsCounter;
      const url = 'https://afternoon-falls-25894.herokuapp.com/words?group=1&page=1';
      const responce = await fetch(url);
      const data = await responce.json();
      this.learnedWords = [];
      for (let i = 0; i < data.length; i += 1) {
        this.learnedWords.push(data[i].word);
      }
    } else {
      this.setDefaultUserData(this.userName);
      this.learnedWords = [];
    }
    return this.learnedWords;
  }

  // get a single learned word
  async getRandomLearnedWord() {
    const randomIndex = Math.floor(Math.random() * Math.floor(this.wordsCounter));
    // console.log(this.wordsCounter);
    return this.getWordDataByIndex(randomIndex);
  }

  // get a single unknown word
  async getNewUnknownWord() {
    this.wordsCounter += 1;
    return this.getWordDataByIndex(this.wordsCounter);
  }

  // get a single random word with set difficulty
  async getRandomWordByDifficulty(difficulty, round, roundLength) {
    if (difficulty > 5 || difficulty < 0) {
      return null;
    }
    const startOfDifficultyGroup = Math.floor(difficulty * 600);
    const startOfRound = startOfDifficultyGroup + Math.floor((600 / roundLength) * round);
    const index = startOfRound + Math.floor(Math.random() * roundLength);
    const result = await this.getWordDataByIndex(index);
    console.log(startOfDifficultyGroup, startOfRound, index, result);
    return result;
  }

  // initialize user data for the first load
  setDefaultUserData(userName) {
    this.userName = userName;
    this.wordsCounter = 0;
    this.difficultWords = [];
    this.deletedWords = [];
    localStorage.setItem(this.userName, {
      wordsCounter: this.wordsCounter,
      difficultWords: [],
      deletedWords: [],
      gameStatistics: {
        englishPuzzle: {
          level: 0,
          page: 0,
          round: 0,
        },
        savannah: {},
        speakIt: {},
        sprint: {},
        square: {},
      },
    });
  }

  // save current user data in local storage(on document.unload)
  saveUserData() {
    localStorage.setItem('defaultUser', {
      wordsCounter: this.wordsCounter,
      difficultWords: this.difficultWords,
      deletedWords: this.deletedWords,
      gameStatistics: this.gameStatistics,
    });
  }

  // load user data from local storage(currently happens on document.load)
  loadUserData() {
    const UserData = localStorage.getItem('defaultUser');
    // console.log(UserData);
    if (!UserData) {
      this.setDefaultUserData();
    } else {
      console.log(UserData.wordsCounter, this.userName);
      this.wordsCounter = UserData.wordsCounter ? UserData.wordsCounter : 100;
      this.difficultWords = UserData.difficultWords ? UserData.difficultWords : []; // ?? check this
      this.deletedWords = UserData.deletedWords ? UserData.deletedWords : [];
      this.gameStatistics = UserData.gameStatistics ? UserData.gameStatistics : {
        englishPuzzle: {
          level: 0,
          page: 0,
          round: 0,
        },
        savannah: {},
        speakIt: {},
        sprint: {},
        square: {},
      };
    }
  }

  // manually set counter for learned words, supposed to be used only for debugging!!
  setLearnedWords(num) {
    this.wordsCounter = num;
  }

  // increase counter forlearned words by 1
  increaseLearnedWordsBy1() {
    this.wordsCounter += 1;
  }

  // decrease counter forlearned words by 1
  decreaseLearnedWordsBy1() {
    this.wordsCounter -= 1;
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
    const result = this.reformatWordData(data[wordIndex]);
    return result;
  }

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
}
