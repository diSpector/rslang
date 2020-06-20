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
    return this.getWordDataByIndex(randomIndex);
  }

  async getNewUnknownWord() {
    this.wordsCounter += 1;
    return this.getWordDataByIndex(this.wordsCounter);
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
    });
  }

  // save current user data in local storage(on document.unload)
  saveUserData() {
    localStorage.setItem(this.userName, {
      wordsCounter: this.wordsCounter,
      difficultWords: this.difficultWords,
      deletedWords: this.deletedWords,
    });
  }

  // supposed to be used only for debugging
  setLearnedWords(num) {
    this.learnedWords = num;
  }

  increaseLearnedWordsBy1() {
    this.learnedWords += 1;
  }

  decreaseLearnedWordsBy1() {
    this.learnedWords -= 1;
  }

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
    };
  }

  async getWordDataByIndex(index) {
    const group = Math.floor(index / 600);
    const page = Math.floor((index - group * 600) / 20);
    const wordIndex = index - (group * 600) - (page * 20);
    const url = `https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}`;
    const responce = await fetch(url);
    const data = await responce.json();
    return this.reformatWordData(data[wordIndex]);
  }

  getFivePossibleTranslations() {
    const correctWordData = this.getNewUnknownWord();
    const incorrectTranslation1 = this.getRandomLearnedWord();
    const incorrectTranslation2 = this.getRandomLearnedWord();
    const incorrectTranslation3 = this.getRandomLearnedWord();
    const incorrectTranslation4 = this.getRandomLearnedWord();
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
}
