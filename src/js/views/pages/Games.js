import Utils from '../../services/Utils';
import EnglishPuzzle from './games/english-puzzle/EnglishPuzzle';
import Error404 from './Error404';

const gameList = {
  // 'audition'        : Audition,
  'english-puzzle'  : EnglishPuzzle,
  // 'speakit'         : SpeakIt,
  // 'savanna'         : Savanna,
  // 'sprint'          : Sprint,
  // 'square'          : Square,
};

const Games = {
  currentGame: null,

  beforeRender: function () { // установить игру
    this.setGame();
    this.clearHeaderAndFooter();
  },

  clearHeaderAndFooter: function () {
    Utils.clearBlock('.header');
    Utils.clearBlock('.footer');
  },

  setGame: function () { // распарсить url, установить игру в св-во объекта
    const request = Utils.parseRequestURL();
    const { id : gameId } = request;
    const game = gameList[gameId];
    const page = (game) ? gameList[gameId] : Error404;
    this.currentGame = page;
  },

  render: async () => {
    Games.beforeRender();
    
    const view = /* html */ await Games.currentGame.render();
    return view;
  },

  afterRender: async () => { 
    await Games.currentGame.afterRender();
  },

};

export default Games;
