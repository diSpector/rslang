const Dictionary = {
/*   async getWords() {
    const url = 'https://afternoon-falls-25894.herokuapp.com/words?group=1&page=1';
    const responce = await fetch(url);
    const data = await responce.json();
    console.log(data);
  }, */
  render: async () => {
    const view = /* html */`
    <section class="section">
      <button class="dictionary--getInfo__button">Получить словарь для текушего пользователя</button>
      <h1 class="dictionary-subheader">Словарь для пользователя 1</h1>
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
  afterRender: async () => {
    document.querySelector('.dictionary-getInfo-button').addEventListener('click', async () => {
      document.querySelector('.dictionary-subheader').innerHTML = 'Словарь для пользователя 1';
      const currentWords = document.querySelector('.dictionary-currentWords');
      const hardWords = document.querySelector('.dictionary-hardWords');
      const deletedWords = document.querySelector('.dictionary-deletedWords');
      const url = 'https://afternoon-falls-25894.herokuapp.com/words?group=1&page=1';
      const responce = await fetch(url);
      const data = await responce.json();
      for (let i = 0; i < data.length; i += 1) {
        currentWords.innerHTML = `${currentWords.innerHTML} ${data[i].word}`;
      }
      console.log(data);
      hardWords.innerHTML = 'Empty';
      deletedWords.innerHTML = 'Empty';
    });
  },

};

export default Dictionary;
