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
      if (innerText) container.innerText = innerText;
      return container;
    }


    async function constructCurd(wordObj) {
      const currentWordsContainer = document.querySelector('.dictionary--currentWords');
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

      const newWorExample = createNewElement('div', 'example', wordObj.textExample);
      longRead.append(newWorExample);

      const newWorMeaning = createNewElement('div', 'meaning', wordObj.textMeaning);
      longRead.append(newWorMeaning);

      const wordImg = createNewElement('img', 'wordImg');
      wordImg.src = wordObj.image;
      const newWordImg = createNewElement('div', 'imgContainer');
      newWordImg.append(wordImg);
      newWord.append(newWordImg);

      const wordButtonContainer = createNewElement('div', 'wordButtonContainer');
      newWord.append(wordButtonContainer);

      const wordDeleteButton = createNewElement('button', 'wordDeleteButton', 'Удалить');
      wordButtonContainer.append(wordDeleteButton);

      const wordDifficultButton = createNewElement('button', 'wordDifficultButton', 'В сложные');
      wordButtonContainer.append(wordDifficultButton);

      currentWordsContainer.append(newWord);
    }

    async function start() {
      const currentWords = await model.getSetOfLearnedWords(10);
      currentWords.forEach((word) => {
        constructCurd(word);
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
