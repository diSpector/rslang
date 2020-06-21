import '../../../../../css/pages/games/letterSquare/letterSquare.scss';
// import '../../../../../css/pages/games/allGames.scss';
import Utils from '../../../../services/Utils';

import gamePageRendering from './helpers/gamePageRendering';
import drawPlayField from './helpers/drawField';
import wordsToFind from './helpers/wordsToFind';

const letterSquare = {

  beforeRender() {
    this.clearHeaderAndFooter();
  },

  clearHeaderAndFooter: () => {
    Utils.clearBlock('.header');
    Utils.clearBlock('.footer');
  },

  render: (model) => {
    letterSquare.beforeRender();

    const view = gamePageRendering();
    return view;
  },

  afterRender: () => {
    drawPlayField();
    wordsToFind();
  },
};

export default letterSquare;
