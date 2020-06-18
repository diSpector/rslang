import Utils from '../../services/Utils';
// import Audition from './games/english-puzzle/Audition';
import EnglishPuzzle from './games/english-puzzle/EnglishPuzzle';
// import SpeakIt from './games/english-puzzle/SpeakIt';
// import Savanna from './games/english-puzzle/Savanna';
// import Sprint from './games/english-puzzle/Sprint';
// import Square from './games/english-puzzle/Square';
import Error404 from './Error404';

const gameList = {
  // 'audition'        : Audition,
  'english-puzzle': EnglishPuzzle,
  // 'speakit'         : SpeakIt,
  // 'savanna'         : Savanna,
  // 'sprint'          : Sprint,
  // 'square'          : Square,
};

const Games = {
  currentGame: null,

  render: async () => {
    Games.beforeRender();

    const view = /* html */ await Games.currentGame.render();
    return view;
  },

  beforeRender() { // установить игру
    this.setGame();
  },

  afterRender: async () => {
    await Games.currentGame.afterRender();
  },

  setGame() { // распарсить url, установить игру в св-во объекта
    const request = Utils.parseRequestURL();
    const { id: gameId } = request;
    const game = gameList[gameId];
    const page = (game) ? gameList[gameId] : Error404;
    this.currentGame = page;
  },

};

export default Games;
