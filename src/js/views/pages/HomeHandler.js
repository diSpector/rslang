const HomeHandler = {
  currentWord: null,
  isWrongWord: false,
  model: null,
  generateNextCard: null,

  settings: {
    sentenceTranslate: true,
    audioAutoplay: true,
  },

  playAudio: () => {
    const wordAudio = new Audio(HomeHandler.currentWord.audio);
    const wordAudioExample = new Audio(HomeHandler.currentWord.audioExample);
    const wordAudioMeaning = new Audio(HomeHandler.currentWord.audioMeaning);
    wordAudio.play();
    setTimeout(() => wordAudioExample.play(), 1000);
    setTimeout(() => wordAudioMeaning.play(), 7000);
    wordAudioMeaning.onended = () => HomeHandler.generateNextCard();
  },

  showTranslate: () => {
    const textMeaningTranslate = document.querySelector('.learn--card__textMeaningTranslate');
    const textExampleTranslate = document.querySelector('.learn--card__textExampleTranslate');
    textMeaningTranslate.classList.remove('learn--card__textMeaningTranslate-hidden');
    textExampleTranslate.classList.remove('learn--card__textExampleTranslate-hidden');
  },

  correctAnswer: () => {
    const cardInput = document.querySelector('.learn--card__input');
    cardInput.innerText = HomeHandler.currentWord.word;
    cardInput.removeAttribute('contenteditable');
    cardInput.style.backgroundColor = 'rgb(145, 247, 112)';
    if (HomeHandler.settings.audioAutoplay === true) {
      HomeHandler.playAudio();
    } else if (HomeHandler.settings.sentenceTranslate === true) {
      HomeHandler.showTranslate();
    }
  },

  setWrongLetters: () => {
    const cardInput = document.querySelector('.learn--card__input');
    const userWord = cardInput.innerText;
    const correctWord = HomeHandler.currentWord.word;
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
    HomeHandler.isWrongWord = true;
    setTimeout(() => {
      const letters = document.querySelectorAll('.learn--card__input > span');
      for (let i = 0; i < letters.length; i += 1) {
        letters[i].style.opacity = '0.5';
      }
    }, 1000);
    cardInput.onkeydown = () => {
      if (HomeHandler.isWrongWord) cardInput.innerHTML = '';
      HomeHandler.isWrongWord = false;
    };
  },

  wrongAnswer: () => {
    HomeHandler.setWrongLetters();
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
        HomeHandler.model.setIntervalAsAgain(HomeHandler.currentWord.id);
      }
      if (target.classList.contains('learn--card__complexity-hard')) {
        HomeHandler.model.setIntervalAsHard(HomeHandler.currentWord.id);
      }
      if (target.classList.contains('learn--card__complexity-well')) {
        HomeHandler.model.setIntervalAsGood(HomeHandler.currentWord.id);
      }
      if (target.classList.contains('learn--card__complexity-easy')) {
        HomeHandler.model.setIntervalAsEasy(HomeHandler.currentWord.id);
      }
    });
  },

  addCardKeyHandler: () => {
    const card = document.querySelector('.learn--card');
    card.onkeydown = (event) => {
      const userWord = document.querySelector('.learn--card__input').innerText;
      if (event.key === 'Enter' && document.activeElement.classList.contains('learn--card__input')) {
        event.preventDefault();
        if (userWord === HomeHandler.currentWord.word) {
          HomeHandler.correctAnswer();
        } else if (userWord !== '') {
          HomeHandler.wrongAnswer();
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
      if (target.classList.contains('learn--button-show')) {
        HomeHandler.correctAnswer();
        HomeHandler.model.processSolvedWord(HomeHandler.currentWord);
      }
      if (target.classList.contains('learn--button-next')) {
        const userWord = document.querySelector('.learn--card__input').innerText;
        if (userWord === HomeHandler.currentWord.word) {
          HomeHandler.generateNextCard();
          HomeHandler.clearInput();
        } else if (userWord !== '') {
          HomeHandler.wrongAnswer();
        }
      }
    });
  },

  saveSettingsToLocalStorage: () => {
    localStorage.setItem('homeSettings', JSON.stringify(HomeHandler.settings));
  },

  setSettingsToHTML: () => {
    const translateIcon = document.querySelector('.learn--card__icon-book');
    const audioIcon = document.querySelector('.learn--card__icon-headphones');
    const brainIcon = document.querySelector('.learn--card__icon-headphones');
    if (HomeHandler.settings.sentenceTranslate === false) {
      translateIcon.classList.add('learn--card__icon-inactive');
    }
    if (HomeHandler.settings.audioAutoplay === false) {
      audioIcon.classList.add('learn--card__icon-inactive');
    }
    if (HomeHandler.currentWord.userWord.difficulty === 'hard') {
      brainIcon.classList.add('learn--card__icon-active');
    }
  },

  initSettings: () => {
    if (localStorage.getItem('homeSettings') === null) HomeHandler.saveSettingsToLocalStorage();
    else HomeHandler.settings = JSON.parse(localStorage.getItem('homeSettings'));

    HomeHandler.addSettingsClickHandler();
    HomeHandler.setSettingsToHTML();
  },

  addSettingsClickHandler: () => {
    const headerSettings = document.querySelector('.learn--card__header');
    headerSettings.addEventListener('click', ({ target }) => {
      if (target.classList.contains('learn--card__icon-book') || target.classList.contains('learn--card__icon-headphones')) {
        target.classList.toggle('learn--card__icon-inactive');
        if (target.classList.contains('learn--card__icon-book')) HomeHandler.settings.sentenceTranslate = !HomeHandler.settings.sentenceTranslate;
        if (target.classList.contains('learn--card__icon-headphones')) HomeHandler.settings.audioAutoplay = !HomeHandler.settings.audioAutoplay;
        HomeHandler.saveSettingsToLocalStorage();
      }
      if (target.classList.contains('learn--card__icon-brain')) {
        HomeHandler.model.addWordToHard(HomeHandler.currentWord.id);
        target.classList.add('learn--card__icon-active');
      }
      if (target.classList.contains('learn--card__icon-delete')) {
        HomeHandler.model.addWordToDeleted(HomeHandler.currentWord.id);
        target.classList.add('learn--card__icon-active');
      }
      HomeHandler.saveSettingsToLocalStorage();
    });
  },

  setInputWidthAndFocus: () => {
    const cardInput = document.querySelector('.learn--card__input');
    cardInput.focus();
    const inputWidth = Math.ceil(HomeHandler.getTextWidth(HomeHandler.currentWord.word, 'bold 20px Montserrat'));
    cardInput.style.width = `${inputWidth}px`;
  },

  initHomeHandler: async (word, model, generateNextCard) => {
    await model.loginUser({ email: '66group@gmail.com', password: 'Gfhjkm_123' });
    HomeHandler.currentWord = word;
    HomeHandler.model = model;
    HomeHandler.generateNextCard = generateNextCard;

    HomeHandler.setInputWidthAndFocus();
    HomeHandler.addCardClickHandler();
    HomeHandler.addCardKeyHandler();
    HomeHandler.addButtonsClickHandler();
    HomeHandler.initSettings();
  },
};

export default HomeHandler;
