import '../../../css/pages/games.scss';

const AllGames = {
  render: () => {
    const view = `
    <div class="allGames">
      <div class="wrapper">
        <h1 class="allGames__title">Все игры</h1>
        <div class="allGames__cards">
          <div class="allGames__gameCard audition" id="audition">
            <div class="gameCard__title">Аудиовызов</div>
            <div class="gameCard__icon"></div>
            <div class="gameCard__hint audition">
              <div class="gameCard__hint-description">Улучшает восприятие английской речи на слух.</div>
              <div class="gameCard__hint-skills">
                <div class="gameCard__hint-icon listening"></div>
                <div class="gameCard__hint-icon vocabulary"></div>
              </div>
            </div>
          </div>
          <div class="allGames__gameCard sprint" id="sprint">
            <div class="gameCard__title">Спринт</div>
              <div class="gameCard__icon"></div>
              <div class="gameCard__hint sprint">
                <div class="gameCard__hint-description">Учит быстро переводить с английского на ваш родной язык. 
                Для этой тренировки используются слова из вашего словаря.</div>
                <div class="gameCard__hint-skills">
                <div class="gameCard__hint-icon vocabulary"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    return view;
  },

  addInfoMouseHandler() {
    const cardInfoButton = document.querySelectorAll('.gameCard__icon');
    cardInfoButton.forEach((elem) => {
      elem.addEventListener('mouseover', ({ target }) => {
        const cardBlock = target.closest('.allGames__gameCard');
        const hintBlock = cardBlock.lastElementChild;
        hintBlock.classList.add('visible');
      });
      elem.addEventListener('mouseout', ({ target }) => {
        const cardBlock = target.closest('.allGames__gameCard');
        const hintBlock = cardBlock.lastElementChild;
        hintBlock.classList.remove('visible');
      });
    });
  },

  afterRender: async () => {
    AllGames.addInfoMouseHandler();

    const gameCards = document.querySelectorAll('.allGames__gameCard');
    gameCards.forEach((elem) => {
      elem.setAttribute('onclick', `location.href='#/games/${elem.id}'`);
    });
  },
};

export default AllGames;
