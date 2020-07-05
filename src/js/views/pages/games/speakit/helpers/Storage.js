export default class Storage {
  saveGame(errors, wordsArr) { // записать результаты игры в localStorage
    let gameInfo = JSON.parse(localStorage.getItem('speakItStat'));
    if (gameInfo === null) {
      gameInfo = [];
    }

    gameInfo.push({
      date: new Date().toLocaleString(),
      errors,
      words: wordsArr,
    });

    localStorage.setItem('speakItStat', JSON.stringify(gameInfo));
  }

  saveLevelAndPage(level, page) {
    localStorage.setItem('speakItlevel', JSON.stringify({ levels: level, pages: page }));
  }

  getData(data) {
    return JSON.parse(localStorage.getItem(data));
  }
}
