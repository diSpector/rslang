export default class AppModel {
  constructor() {
    this.searchString = 'https://afternoon-falls-25894.herokuapp.com/words?';
    this.githubString = 'https://raw.githubusercontent.com/dispector/rslang-data/master/data/';
    this.userName = 'defaultUser';
    this.wordsCounter = 0;
    this.learnedWords = [];
    this.difficultWords = [];
    this.deletedWords = [];
  }

  async getUserData(userName) {
    const UserData = localStorage.getItem(userName);
    if (UserData) {
      this.userName = userName;
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

  saveUserData(userName) {
    localStorage.setItem(userName, {
      wordsCounter: this.wordsCounter,
      difficultWords: this.difficultWords,
      deletedWords: this.deletedWords,
    });
  }
}
