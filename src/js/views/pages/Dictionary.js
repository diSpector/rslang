const Dictionary = {

  render: async () => {
    const view = /* html */`
    <section class="section dictionary--container">
      <button class="dictionary--getInfo__button">Получить словарь для текушего пользователя</button>
      <button class="dictionary--getNewInfo__button">Получить новые слова для текушего пользователя</button>
      <h1 class="dictionary--subheader">Словарь для пользователя 1</h1>
      <h2>Изучаемые слова</h2>
      <div class="dictionary--currentWords"></div>
      <h2>Сложные слова</h2>
      <div class="dictionary--hardWords"></div>
      <h2>Удалённые слова</h2>
      <div class="dictionary--deletedWords"></div>
    </section>
          `;
    return view;
  },
  afterRender: async (model) => {
    document.querySelector('.dictionary--getInfo__button').addEventListener('click', async () => {
      document.querySelector('.dictionary--subheader').innerHTML = 'Изученные слова для пользователя defaultUser';
      const currentWords = document.querySelector('.dictionary--currentWords');
      currentWords.innerHTML = '';
      const hardWords = document.querySelector('.dictionary--hardWords');
      const deletedWords = document.querySelector('.dictionary--deletedWords');
      const data = await model.getLearnedWords();
      for (let i = 0; i < data.length; i += 1) {
        currentWords.innerHTML = `${currentWords.innerHTML} ${data[i]}`;
      }
      hardWords.innerHTML = 'Empty';
      deletedWords.innerHTML = 'Empty';
    });
    document.querySelector('.dictionary--getNewInfo__button').addEventListener('click', async () => {
      document.querySelector('.dictionary--subheader').innerHTML = 'Новые слова для пользователя defaultUser';
      const currentWords = document.querySelector('.dictionary--currentWords');
      currentWords.innerHTML = '';
      const hardWords = document.querySelector('.dictionary--hardWords');
      const deletedWords = document.querySelector('.dictionary--deletedWords');
      const data = await model.getNewWords();
      for (let i = 0; i < data.length; i += 1) {
        currentWords.innerHTML = `${currentWords.innerHTML} ${data[i]}`;
      }
      hardWords.innerHTML = 'Empty';
      deletedWords.innerHTML = 'Empty';
    });
  },

};

export default Dictionary;
