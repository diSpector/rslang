import Utils from '../../services/Utils';
// import Audition from './games/english-puzzle/Audition';
import EnglishPuzzle from './games/english-puzzle/EnglishPuzzle';
// import SpeakIt from './games/english-puzzle/SpeakIt';
import Savannah from './games/savannah/Savannah';
// import Sprint from './games/english-puzzle/Sprint';
import letterSquare from './games/letterSquare/letterSquare';
import Error404 from './Error404';

const gameList = {
  // 'audition'        : Audition,
  'english-puzzle': EnglishPuzzle,
  // 'speakit'         : SpeakIt,
  savannah: Savannah,
  // 'sprint'          : Sprint,
  'letterSquare': letterSquare,
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
