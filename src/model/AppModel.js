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
    const group = Math.floor(randomIndex / 600);
    const page = Math.floor((randomIndex - group * 600) / 30);
    const wordIndex = randomIndex - (group * 600) - (page * 30);
    const url = `https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}`;
    const responce = await fetch(url);
    const data = await responce.json();
    console.log(data[wordIndex], wordIndex);
    return this.reformatWordData(data[wordIndex]);
  }

  async getNewWords() {
    this.wordsCounter += 20;
    const url = 'https://afternoon-falls-25894.herokuapp.com/words?group=1&page=2';
    const responce = await fetch(url);
    const data = await responce.json();
    this.newWords = [];
    for (let i = 0; i < data.length; i += 1) {
      this.newWords.push(data[i].word);
      this.learnedWords.push(data[i].word);
    }
    return this.newWords;
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
}
