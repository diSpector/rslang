const Audition = {

  render: async () => {
    const view = /* html */`
      <div class="wrapper">
        <div class="gameDetails">
          <h1 class="game__title">Аудиовызов</h1>
          <p class="game__description">В этой игре вы улучшите восприятие английской речи на слух.</p>
          <button class="game__startGame">Начать игру</button>
        </div>
      </div>
        `;
    return view;
  },
  afterRender: async () => {
  },
};
export default Audition;
