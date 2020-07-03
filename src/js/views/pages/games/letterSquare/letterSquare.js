import '../../../../../css/pages/games/letterSquare/letterSquare.scss';
import '../../../../../css/pages/games/allGames.scss';
import Utils from '../../../../services/Utils';

import gamePageRendering from './helpers/gamePageRendering';
import drawPlayField from './helpers/drawField';
import findingWord from './helpers/findingWord';


const letterSquare = {

  settings: {
    model: null,
  },

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
    letterSquare.settings.model = model;

    return view;
  },

  afterRender: () => {
    drawPlayField();
    findingWord();
  },
};

export default letterSquare;
