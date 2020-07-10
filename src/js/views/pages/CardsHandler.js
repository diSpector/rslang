const CardsHandler = {
  currentWord: null,
  isWrongWord: false,
  model: null,
  generateNextCard: null,
  ourWordObj: null,
  homeSettings: null,
  isWordCorrect: false,

  settings: {
    sentenceTranslate: true,
    audioAutoplay: true,
  },

  playAudio: () => {
    const wordAudio = new Audio(CardsHandler.currentWord.audio);
    const wordAudioExample = new Audio(CardsHandler.currentWord.audioExample);
    const wordAudioMeaning = new Audio(CardsHandler.currentWord.audioMeaning);
    wordAudio.play();
    setTimeout(() => wordAudioExample.play(), 1000);
    setTimeout(() => wordAudioMeaning.play(), 7000);
  },

  showTranslate: () => {
    const textMeaningTranslate = document.querySelector('.learn--card__textMeaningTranslate');
    const textExampleTranslate = document.querySelector('.learn--card__textExampleTranslate');
    if (CardsHandler.homeSettings.isTextMeaning) {
      textMeaningTranslate.innerText = CardsHandler.currentWord.textMeaningTranslate;
    }
    if (CardsHandler.homeSettings.isTextExample) {
      textExampleTranslate.innerText = CardsHandler.currentWord.textExampleTranslate;
    }
  },

  showCorrectButtons: () => {
    const nextButton = document.querySelector('.learn--button-next');
    const intervalButtons = document.querySelector('.learn--card__complexity');
    nextButton.classList.remove('learn--button-hidden');
    if (CardsHandler.homeSettings.isIntervalButtons) intervalButtons.classList.remove('learn--card__complexity-hidden');
  },

  hideCorrectButtons: () => {
    const nextButton = document.querySelector('.learn--button-next');
    const intervalButtons = document.querySelector('.learn--card__complexity');
    nextButton.classList.add('learn--button-hidden');
    intervalButtons.classList.add('learn--card__complexity-hidden');
  },

  closeShowAnswerButton: () => {
    const showAnswerButton = document.querySelector('.learn--button-show');
    showAnswerButton.classList.add('learn--button-hidden');
  },

  correctAnswer: () => {
    CardsHandler.isWordCorrect = true;
    const cardInput = document.querySelector('.learn--card__input');
    CardsHandler.showCorrectButtons();
    CardsHandler.closeShowAnswerButton();
    CardsHandler.model.processSolvedWord(CardsHandler.ourWordObj);
    cardInput.innerText = CardsHandler.currentWord.word;
    cardInput.removeAttribute('contenteditable');
    cardInput.style.backgroundColor = 'rgb(145, 247, 112)';
    if (CardsHandler.settings.audioAutoplay === true) {
      CardsHandler.playAudio();
    }
    if (CardsHandler.settings.sentenceTranslate === true) {
      CardsHandler.showTranslate();
    }
  },

  setWrongLetters: () => {
    const cardInput = document.querySelector('.learn--card__input');
    const userWord = cardInput.innerText;
    const correctWord = CardsHandler.currentWord.word;
    let wrongWordCount = 0;
    let WrongLettersColor = 'orange';
    for (let i = 0; i < correctWord.length; i += 1) {
      if (correctWord[i] !== userWord[i]) {
        wrongWordCount += 1;
      }
    }
    if (wrongWordCount > correctWord.length / 2) WrongLettersColor = 'red';
    let coloredWord = '';
    for (let i = 0; i < correctWord.length; i += 1) {
      if (correctWord[i] === userWord[i]) {
        coloredWord += `<span style="color: green; transition: 0.5s ease; opacity: 1;">${correctWord[i]}</span>`;
      } else {
        coloredWord += `<span style="color: ${WrongLettersColor}; transition: 0.5s ease; opacity: 1;">${correctWord[i]}</span>`;
      }
    }
    cardInput.innerHTML = coloredWord;
    CardsHandler.isWrongWord = true;
    setTimeout(() => {
      const letters = document.querySelectorAll('.learn--card__input > span');
      for (let i = 0; i < letters.length; i += 1) {
        letters[i].style.opacity = '0.5';
      }
    }, 1000);
    cardInput.onkeydown = () => {
      if (CardsHandler.isWrongWord) cardInput.innerHTML = '';
      CardsHandler.isWrongWord = false;
    };
  },

  wrongAnswer: () => {
    CardsHandler.setWrongLetters();
  },

  getTextWidth: (text, font) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  },

  addCardClickHandler: () => {
    const card = document.querySelector('.learn--card');
    card.addEventListener('click', ({ target }) => {
      if (target.classList.contains('learn--card__complexity-repeat')) {
        CardsHandler.model.setIntervalAsAgain(CardsHandler.currentWord.id);
      }
      if (target.classList.contains('learn--card__complexity-hard')) {
        CardsHandler.model.setIntervalAsHard(CardsHandler.currentWord.id);
      }
      if (target.classList.contains('learn--card__complexity-well')) {
        CardsHandler.model.setIntervalAsGood(CardsHandler.currentWord.id);
      }
      if (target.classList.contains('learn--card__complexity-easy')) {
        CardsHandler.model.setIntervalAsEasy(CardsHandler.currentWord.id);
      }
      if (target.classList.contains('learn--card__enterAnswer') && !CardsHandler.isWordCorrect) {
        const userWord = document.querySelector('.learn--card__input').innerText;
        if (userWord === CardsHandler.currentWord.word) {
          CardsHandler.correctAnswer();
        } else if (userWord !== '') {
          CardsHandler.wrongAnswer();
        }
      }
    });
  },

  addCardKeyHandler: () => {
    const card = document.querySelector('.learn--card');
    card.onkeydown = (event) => {
      const userWord = document.querySelector('.learn--card__input').innerText;
      if (event.key === 'Enter' && document.activeElement.classList.contains('learn--card__input') && !CardsHandler.isWordCorrect) {
        event.preventDefault();
        if (userWord === CardsHandler.currentWord.word) {
          CardsHandler.correctAnswer();
        } else if (userWord !== '') {
          CardsHandler.wrongAnswer();
        }
      }
    };
  },

  clearInput: () => {
    const cardInput = document.querySelector('.learn--card__input');
    cardInput.style.width = '';
    cardInput.style.backgroundColor = '';
    cardInput.innerText = '';
    cardInput.setAttribute('contenteditable', 'true');
  },

  addButtonsClickHandler: () => {
    const learnButtons = document.querySelector('.learn--buttons');
    learnButtons.addEventListener('click', ({ target }) => {
      if (target.classList.contains('learn--button-show') && !CardsHandler.isWordCorrect) {
        CardsHandler.correctAnswer();
      }
      if (target.classList.contains('learn--button-next')) {
        const userWord = document.querySelector('.learn--card__input').innerText;
        CardsHandler.hideCorrectButtons();
        if (userWord === CardsHandler.currentWord.word) {
          CardsHandler.generateNextCard();
          CardsHandler.clearInput();
        } else if (userWord !== '') {
          CardsHandler.wrongAnswer();
        }
      }
    });
  },

  saveSettingsToLocalStorage: () => {
    localStorage.setItem('homeSettings', JSON.stringify(CardsHandler.settings));
  },

  setSettingsToHTML: () => {
    const translateIcon = document.querySelector('.learn--card__icon-book');
    const audioIcon = document.querySelector('.learn--card__icon-headphones');
    const brainIcon = document.querySelector('.learn--card__icon-headphones');
    if (CardsHandler.settings.sentenceTranslate === false) {
      translateIcon.classList.add('learn--card__icon-inactive');
    }
    if (CardsHandler.settings.audioAutoplay === false) {
      audioIcon.classList.add('learn--card__icon-inactive');
    }
    if (!CardsHandler.ourWordObj.isNew) {
      if (CardsHandler.ourWordObj.userWord.difficulty === 'hard') {
        brainIcon.classList.add('learn--card__icon-active');
      }
    }
  },

  initSettings: () => {
    if (localStorage.getItem('homeSettings') === null) CardsHandler.saveSettingsToLocalStorage();
    else CardsHandler.settings = JSON.parse(localStorage.getItem('homeSettings'));

    CardsHandler.addSettingsClickHandler();
    CardsHandler.setSettingsToHTML();
  },

  addSettingsClickHandler: () => {
    const headerSettings = document.querySelector('.learn--card__header');
    headerSettings.addEventListener('click', ({ target }) => {
      if (target.classList.contains('learn--card__icon-book') || target.classList.contains('learn--card__icon-headphones')) {
        target.classList.toggle('learn--card__icon-inactive');
        if (target.classList.contains('learn--card__icon-book')) CardsHandler.settings.sentenceTranslate = !CardsHandler.settings.sentenceTranslate;
        if (target.classList.contains('learn--card__icon-headphones')) CardsHandler.settings.audioAutoplay = !CardsHandler.settings.audioAutoplay;
        CardsHandler.saveSettingsToLocalStorage();
      }
      if (target.classList.contains('learn--card__icon-brain')) {
        CardsHandler.model.addWordToHard(CardsHandler.currentWord.id);
        target.classList.add('learn--card__icon-active');
      }
      if (target.classList.contains('learn--card__icon-delete')) {
        CardsHandler.model.addWordToDeleted(CardsHandler.currentWord.id);
        target.classList.add('learn--card__icon-active');
      }
      CardsHandler.saveSettingsToLocalStorage();
    });
  },

  setInputWidthAndFocus: () => {
    const cardInput = document.querySelector('.learn--card__input');
    cardInput.focus();
    const inputWidth = Math.ceil(CardsHandler.getTextWidth(CardsHandler.currentWord.word, 'bold 20px Montserrat'));
    cardInput.style.width = `${inputWidth}px`;
  },

  initCardHandler: async (word, ourWordObj, model, generateNextCard, settings) => {
    CardsHandler.currentWord = word;
    CardsHandler.model = model;
    CardsHandler.generateNextCard = generateNextCard;
    CardsHandler.ourWordObj = ourWordObj;
    CardsHandler.homeSettings = settings;

    CardsHandler.isWordCorrect = false;
    CardsHandler.setInputWidthAndFocus();
    CardsHandler.addCardClickHandler();
    CardsHandler.addCardKeyHandler();
    CardsHandler.addButtonsClickHandler();
    CardsHandler.initSettings();
  },
};

export default CardsHandler;
