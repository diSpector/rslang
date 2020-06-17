
import Utils from '../../services/Utils';
import Audition from './games/audition';
import Error404 from './Error404';

const gamesList = {
  audition: Audition, // Аудиовызов
};
const Games = {
  render: async () => {
    const content = null || document.querySelector('.content');
    const request = Utils.parseRequestURL();
    const gameName = request.id;
    if (gameName) {
      const page = gamesList[gameName] ? gamesList[gameName] : Error404;
      content.innerHTML = await page.render();
      await page.afterRender();
      return content.innerHTML;
    }
    const view = /* html */`
          <h1>Games</h1>
    `;
    return view;
  },
  afterRender: async () => { },
};
export default Games;
