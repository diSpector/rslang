import '../../../css/pages/dictionary.scss';
import AppModel from '../../model/AppModel';

const Dictionary = {
  render: async (model) => {
    const view = /* html */`
    <section class="section dictionary--container">
      <h1 class="dictionary--subheader">Словарь для пользователя 1</h1>
      <nav class = "dictionarry--navigation">
        <div class = "dictionary--wordsButton">
          <button data-container ='.dictionary--currentWords' class = "dictionary--currentWordsButton button">На изучении</button>
          <button data-container ='.dictionary--hardWords' class = "dictionary--hardWordsButton button">Сложные</button>
          <button data-container ='.dictionary--deletedWords' class = "dictionary--deletedWordsButton button">Удалённые</button>
        </div>
        <div class = "dictionarry--settings"</div>
          <div class = "dictionarry--buttonExample" title="Показывать примеры"></div>
          <div class = "dictionarry--buttonExplanation" title="Показывать объяснения"></div>
          <div class = "dictionarry--buttonTranscription" title="Показывать транскрипцию"></div>
          <div class = "dictionarry--buttonImg" title="Показывать изображения"></div>
        </div>
      </nav>
           
      
      
      <div class="dictionary--currentWords page">
        <h2>Изучаемые слова</h2>
      </div>
      
      <div class="dictionary--hardWords hidden page">
        <h2>Сложные слова</h2>
      </div>
      
      <div class="dictionary--deletedWords hidden page">
        <h2>Удалённые слова</h2>
      </div>
    </section>
          `;


    return view;
  },
  afterRender: async () => {
    const model = new AppModel();
    let settings = null;

    function createNewElement(type, selector, innerText) {
      const container = document.createElement(type);
      container.classList.add(selector);
      if (innerText) container.innerHTML = innerText;
      return container;
    }


    async function constructCurd(wordObj, mode) {
      const newWord = createNewElement('div', 'wordCard');


      const newWordSoundIcon = createNewElement('div', 'sound__icon');
      const audio = new Audio(wordObj.audio);
      newWordSoundIcon.onclick = () => audio.play();
      newWord.append(newWordSoundIcon);

      const mainWordAttributes = createNewElement('div', 'mainWordAttributes');
      newWord.append(mainWordAttributes);

      const newWordTextTranscription = createNewElement('div', 'textTranscription');
      mainWordAttributes.append(newWordTextTranscription);

      const newWordText = createNewElement('div', 'text', wordObj.word);
      newWordTextTranscription.append(newWordText);

      const newWordTransciption = createNewElement('div', 'transcription', wordObj.transcription);
      newWordTextTranscription.append(newWordTransciption);

      const newWordTranslate = createNewElement('div', 'translate', wordObj.wordTranslate);
      mainWordAttributes.append(newWordTranslate);

      const longRead = createNewElement('div', 'longRead');
      newWord.append(longRead);

      const newWordExample = createNewElement('div', 'example', wordObj.textExample);
      longRead.append(newWordExample);

      const newWordMeaning = createNewElement('div', 'meaning', wordObj.textMeaning);
      longRead.append(newWordMeaning);

      const newWordProgress = createNewElement('div', 'progress', 'Осталось повторить слово 100 раз');
      longRead.append(newWordProgress);


      const wordImg = createNewElement('img', 'wordImg');
      wordImg.src = wordObj.image;
      const newWordImg = createNewElement('div', 'imgContainer');
      newWordImg.append(wordImg);
      newWord.append(newWordImg);

      const wordButtonContainer = createNewElement('div', 'wordButtonContainer');
      newWord.append(wordButtonContainer);

      newWord.classList.add(wordObj.word);

      if (mode === 'deleted') {
        const wordRestoreButton = createNewElement('button', 'wordRestoreButton', 'Восстановить');
        wordButtonContainer.append(wordRestoreButton);
        wordRestoreButton.onclick = () => {
          newWord.remove();
          constructCurd(wordObj, 'current');
          console.log('restore');
        };

        const deletedWordsContainer = document.querySelector('.dictionary--deletedWords');
        deletedWordsContainer.append(newWord);
        newWord.classList.add('deleted');
      }
      if (mode === 'current') {
        const sameHardWord = document.querySelector(`.${wordObj.word}`);
        // ставим onclick на кнопку удаления
        const wordDeleteButton = createNewElement('button', 'wordDeleteButton', 'Удалить');
        wordButtonContainer.append(wordDeleteButton);
        wordDeleteButton.onclick = () => {
          newWord.remove();
          constructCurd(wordObj, 'deleted');
          if (sameHardWord) {
            sameHardWord.remove();
          }
          console.log('Del');
        };

        if (sameHardWord) {
          const wordCurrentButton = createNewElement('button', 'wordHardButton', 'В несложные');
          wordButtonContainer.append(wordCurrentButton);
          wordCurrentButton.onclick = () => {
            newWord.remove();
            sameHardWord.remove();
            constructCurd(wordObj, 'current');
            console.log('current');
          };
          newWord.classList.add('hardInCurrent');
          // Устонавливаем onclick для карточек из блока Hard
          const sameHarddeleteButton = sameHardWord.querySelector('.wordDeleteButton');
          sameHarddeleteButton.onclick = () => {
            newWord.remove();
            sameHardWord.remove();
            constructCurd(wordObj, 'deleted');
            console.log('Del');
          };
          const sameHardCurrentButton = sameHardWord.querySelector('.wordCurrentButton');
          sameHardCurrentButton.onclick = () => {
            newWord.remove();
            sameHardWord.remove();
            constructCurd(wordObj, 'current');
            console.log('Current');
          };
        } else {
          const wordHardButton = createNewElement('button', 'wordHardButton', 'В сложные');
          wordButtonContainer.append(wordHardButton);
          wordHardButton.onclick = () => {
            newWord.remove();
            constructCurd(wordObj, 'hard');
            console.log('Diff');
          };
          newWord.classList.add('current');
        }


        const currentWordsContainer = document.querySelector('.dictionary--currentWords');
        currentWordsContainer.append(newWord);
      }
      if (mode === 'hard') {
        const wordDeleteButton = createNewElement('button', 'wordDeleteButton', 'Удалить');
        wordButtonContainer.append(wordDeleteButton);

        const wordCurrentButton = createNewElement('button', 'wordCurrentButton', 'В несложные');
        wordButtonContainer.append(wordCurrentButton);

        const hardWordsContainer = document.querySelector('.dictionary--hardWords');
        hardWordsContainer.append(newWord);
        newWord.classList.add('hard');
      }
    }

    async function start() {
      const currentWords = await model.getSetOfWordsByDifficulty(1, 1, 10);
      const hardWords = await model.getSetOfWordsByDifficulty(1, 2, 10);
      const deletedWords = await model.getSetOfWordsByDifficulty(1, 3, 10);

      hardWords.forEach((word) => {
        constructCurd(word, 'hard');
        constructCurd(word, 'current');
      });

      currentWords.forEach((word) => {
        constructCurd(word, 'current');
      });

      deletedWords.forEach((word) => {
        constructCurd(word, 'deleted');
      });
    }

    function getSettings() {
      settings = JSON.parse(localStorage.getItem('dictionarySettings'));
      if (!settings) {
        settings = {
          example: true,
          meaning: true,
          transcription: true,
          img: true,
        };
      }
      if (!settings.example) changeSetting('.dictionarry--buttonExample', '.example');
      if (!settings.meaning) changeSetting('.dictionarry--buttonExplanation', '.meaning');
      if (!settings.transcription) changeSetting('.dictionarry--buttonTranscription', '.transcription');
      if (!settings.img) changeSetting('.dictionarry--buttonImg', '.imgContainer');
    }
    function changeSetting(buttonSelect, divSelect) {
      const button = document.querySelector(buttonSelect);
      button.classList.toggle('unactive');

      const list = document.querySelectorAll(divSelect);
      const array = Array.from(list);
      array.forEach((element) => {
        element.classList.toggle('hidden');
      });
    }
    function clickSettings(target) {
      if (target.classList.contains('dictionarry--buttonExample')) {
        settings.example = !settings.example;
        changeSetting('.dictionarry--buttonExample', '.example');
      }
      if (target.classList.contains('dictionarry--buttonExplanation')) {
        settings.meaning = !settings.meaning;
        changeSetting('.dictionarry--buttonExplanation', '.meaning');
      }
      if (target.classList.contains('dictionarry--buttonTranscription')) {
        settings.transcription = !settings.transcription;
        changeSetting('.dictionarry--buttonTranscription', '.transcription');
      }
      if (target.classList.contains('dictionarry--buttonImg')) {
        settings.img = !settings.img;
        changeSetting('.dictionarry--buttonImg', '.imgContainer');
      }

      localStorage.setItem('dictionarySettings', JSON.stringify(settings));
    }

    function showPage(target) {
      const pages = document.querySelectorAll('.page');
      const pagesArr = Array.from(pages);
      pagesArr.forEach((element) => {
        element.classList.add('hidden');
      });
      document.querySelector(target.dataset.container).classList.remove('hidden');
    }

    function setEventListeners() {
      // const getNewInfoButton = document.querySelector('dictionary--getNewInfo__button');
      const wordsButton = document.querySelector('.dictionary--wordsButton');
      wordsButton.addEventListener('click', ({ target }) => {
        if (target.classList.contains('button')) showPage(target);
      });

      const settings = document.querySelector('.dictionarry--settings');
      settings.addEventListener('click', ({ target }) => clickSettings(target));
    }

    async function go() {
      setEventListeners();
      await start();
      getSettings();
    }
    go();
  },

};

export default Dictionary;
