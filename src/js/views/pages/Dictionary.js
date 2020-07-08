import '../../../css/pages/dictionary.scss';
import AppModel from '../../model/AppModel';

const Dictionary = {
  render: async () => {
    const view = /* html */`
    <section class="section dictionary--container">
        <nav class = "dictionarry--navigation">
        <div class = "dictionary--wordsButton">
          <div data-container ='.dictionary--currentWords' class = "dictionary--currentWordsButton button">На изучении</div>
          <div data-container ='.dictionary--hardWords' class = "dictionary--hardWordsButton button">Сложные</div>
          <div data-container ='.dictionary--deletedWords' class = "dictionary--deletedWordsButton button">Удалённые</div>
        </div>
        <div class = "dictionarry--settings"</div>
          <div class = "dictionarry--buttonExample" title="Показывать примеры"></div>
          <div class = "dictionarry--buttonExplanation" title="Показывать объяснения"></div>
          <div class = "dictionarry--buttonTranscription" title="Показывать транскрипцию"></div>
          <div class = "dictionarry--buttonImg" title="Показывать изображения"></div>
        </div>
      </nav>
           
      
      
      <div class="dictionary--currentWords page">
       
      </div>
      
      <div class="dictionary--hardWords hidden page">
        
      </div>
      
      <div class="dictionary--deletedWords hidden page">
       
      </div>
    </section>
          `;

    return view;
  },
  afterRender: async () => {
    const model = new AppModel();
    let settings = null;

    function createNewElement(type, selector, innerText, title) {
      const container = document.createElement(type);
      if (title) container.setAttribute('title', title);
      container.classList.add(selector);
      if (innerText) container.innerHTML = innerText;
      return container;
    }


    async function constructCurd(wordObj, mode) {
      const newWord = createNewElement('div', 'wordCard');
      const wordData = createNewElement('div', 'wordData');
      newWord.append(wordData);

      const newWordSoundIcon = createNewElement('div', 'sound__icon');
      const audio = new Audio(wordObj.audio);
      newWordSoundIcon.onclick = () => audio.play();
      wordData.append(newWordSoundIcon);

      const mainWordAttributes = createNewElement('div', 'mainWordAttributes');
      wordData.append(mainWordAttributes);

      const newWordTextTranscription = createNewElement('div', 'textTranscription');
      mainWordAttributes.append(newWordTextTranscription);

      const newWordText = createNewElement('div', 'text', wordObj.word);
      newWordTextTranscription.append(newWordText);

      const newWordTransciption = createNewElement('div', 'transcription', wordObj.transcription);
      newWordTextTranscription.append(newWordTransciption);

      const newWordTranslate = createNewElement('div', 'translation', wordObj.wordTranslate);
      mainWordAttributes.append(newWordTranslate);

      const longRead = createNewElement('div', 'longRead');
      wordData.append(longRead);

      const newWordExample = createNewElement('q', 'example', wordObj.textExample);
      longRead.append(newWordExample);

      const newWordMeaning = createNewElement('div', 'meaning', wordObj.textMeaning);
      longRead.append(newWordMeaning);

      const newWordProgress = createNewElement('div', 'progress', 'Осталось повторить слово 100 раз');
      longRead.append(newWordProgress);


      const wordImg = createNewElement('img', 'wordImg');
      wordImg.src = wordObj.image;
      const newWordImg = createNewElement('div', 'imgContainer');
      newWordImg.append(wordImg);
      wordData.append(newWordImg);

      const wordButtonContainer = createNewElement('div', 'wordButtonContainer');
      newWord.append(wordButtonContainer);

      newWord.classList.add(wordObj.word);

      if (mode === 'deleted') {
        const wordRestoreButton = createNewElement('div', 'wordRestoreButton', '', 'Восстановить');
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
        const wordDeleteButton = createNewElement('div', 'wordDeleteButton', '', 'Удалить');
        wordButtonContainer.append(wordDeleteButton);
        wordDeleteButton.onclick = () => {
          newWord.remove();
          if (sameHardWord) {
            sameHardWord.remove();
          }
          constructCurd(wordObj, 'deleted');
          console.log('Del');
        };

        if (sameHardWord) {
          const wordCurrentButton = createNewElement('div', 'wordCurrentButton', '', 'В несложные');
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
          const wordHardButton = createNewElement('div', 'wordHardButton', '', 'В сложные');
          wordButtonContainer.append(wordHardButton);
          wordHardButton.onclick = () => {
            newWord.remove();
            constructCurd(wordObj, 'hard');
            constructCurd(wordObj, 'current');
            console.log('Diff');
          };
          newWord.classList.add('current');
        }

        const currentWordsContainer = document.querySelector('.dictionary--currentWords');
        currentWordsContainer.append(newWord);
      }
      if (mode === 'hard') {
        const wordDeleteButton = createNewElement('div', 'wordDeleteButton', '', 'Удалить');
        wordButtonContainer.append(wordDeleteButton);

        const wordCurrentButton = createNewElement('div', 'wordCurrentButton', '', 'В несложные');
        wordButtonContainer.append(wordCurrentButton);

        const hardWordsContainer = document.querySelector('.dictionary--hardWords');
        hardWordsContainer.append(newWord);
        newWord.classList.add('hard');
      }
      applaySettingsToOneCard(newWord);
    }

    async function start() {
      const currentWords = await model.getSetOfWordsCustomLength(1, 1, 10);
      const hardWords = await model.getSetOfWordsCustomLength(1, 2, 10);
      const deletedWords = await model.getSetOfWordsCustomLength(1, 3, 10);

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
    function changeSetting(buttonSelect, divSelector) {
      const button = document.querySelector(buttonSelect);
      button.classList.toggle('unactive');
      if (divSelector) {
        const list = document.querySelectorAll(divSelector);
        const array = Array.from(list);
        array.forEach((element) => {
          element.classList.toggle('hidden');
        });
      }
    }

    async function getSettings() {
      // авторизация
      await model.loginUser({ email: '66group@gmail.com', password: 'Gfhjkm_123' });

      const settingsGetRaw = await model.getSettings();
      const { data: allSettings } = settingsGetRaw;
      settings = allSettings.dictionary;
      /*
      settings = JSON.parse(localStorage.getItem('dictionarySettings'));
      if (!settings) {
        settings = {
          example: true,
          meaning: true,
          transcription: true,
          img: true,
        };
      } */
      if (!settings.example) changeSetting('.dictionarry--buttonExample');
      if (!settings.meaning) changeSetting('.dictionarry--buttonExplanation');
      if (!settings.transcription) changeSetting('.dictionarry--buttonTranscription');
      if (!settings.img) changeSetting('.dictionarry--buttonImg');
    }

    function changeSettingForOneCard(block, divSelector) {
      block.querySelector(divSelector).classList.add('hidden');
    }

    function applaySettingsToOneCard(block) {
      if (!settings.example) changeSettingForOneCard(block, '.example');
      if (!settings.meaning) changeSettingForOneCard(block, '.meaning');
      if (!settings.transcription) changeSettingForOneCard(block, '.transcription');
      if (!settings.img) changeSettingForOneCard(block, '.imgContainer');
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
      model.saveDictionarySettings(settings);
      // localStorage.setItem('dictionarySettings', JSON.stringify(settings));
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
      await getSettings();
      await start();
    }
    go();
  },

};

export default Dictionary;
