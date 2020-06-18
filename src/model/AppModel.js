export default class AppModel {
  constructor() {
    this.searchString = 'https://afternoon-falls-25894.herokuapp.com/words?';
    this.githubString = 'https://raw.githubusercontent.com/dispector/rslang-data/master/data/';
    this.userName = 'defaultUser';
    this.wordsCounter = 0;
    this.learnedWords = [];
    this.newWords = [];
    this.difficultWords = [];
    this.deletedWords = [];
  }

  // change current user to new one
  changeUser(userName) {
    this.userName = userName;
  }

  // return array of words, which user learned before
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
}
