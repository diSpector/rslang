const HomeHandler = {
  addCardClickHandler: () => {
    const card = document.querySelector('.learn--card');
    card.addEventListener('click', ({ target }) => {
      if (target.classList.contains('learn--card__complexity-repeat')) {
        console.log('Repeat word');
      }
      if (target.classList.contains('learn--card__complexity-hard')) {
        console.log('Hard word');
      }
      if (target.classList.contains('learn--card__complexity-well')) {
        console.log('Well word');
      }
      if (target.classList.contains('learn--card__complexity-easy')) {
        console.log('Easy word');
      }
    });
  },

  addCardKeyHandler: () => {
    const card = document.querySelector('.learn--card');
    card.onkeyup = ({ key }) => {
      if (key === 'Enter' && document.activeElement.classList.contains('learn--card__input')) {
        console.log('Check word');
      }
    };
  },

  initHomeHandler: () => {
    document.querySelector('.learn--card__input').focus();
    HomeHandler.addCardClickHandler();
    HomeHandler.addCardKeyHandler();
  },
};

export default HomeHandler;
