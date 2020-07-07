const HomeHandler = {
  currentWord: null,

  playAudio: () => {
    const wordAudio = new Audio(HomeHandler.currentWord.audio);
    const wordAudioExample = new Audio(HomeHandler.currentWord.audioExample);
    const wordAudioMeaning = new Audio(HomeHandler.currentWord.audioMeaning);
    wordAudio.play();
    setTimeout(() => wordAudioExample.play(), 1000);
    setTimeout(() => wordAudioMeaning.play(), 7000);
    wordAudioMeaning.onended = () => console.log('Next card');
  },

  correctAnswer: () => {
    console.log('Correct word');
    HomeHandler.playAudio();
  },

  wrongAnswer: () => {
    const cardInput = document.querySelector('.learn--card__input');
    cardInput.value = HomeHandler.currentWord.word;
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
      const userWord = document.querySelector('.learn--card__input').value;
      if (key === 'Enter' && document.activeElement.classList.contains('learn--card__input')) {
        if (userWord === HomeHandler.currentWord.word) {
          HomeHandler.correctAnswer();
        } else if (userWord !== '') {
          console.log('Wrong answer');
          HomeHandler.wrongAnswer();
        }
      }
    };
  },

  addButtonsClickHandler: () => {
    const learnButtons = document.querySelector('.learn--buttons');
    learnButtons.addEventListener('click', ({ target }) => {
      if (target.classList.contains('learn--button-show')) {
        console.log('Show Answer');
      }
      if (target.classList.contains('learn--button-next')) {
        const userWord = document.querySelector('.learn--card__input').value;
        if (userWord === HomeHandler.currentWord.word) {
          HomeHandler.correctAnswer();
        } else if (userWord !== '') {
          console.log('Wrong answer');
        }
      }
    });
  },

  setInputWidthAndFocus: () => {
    const cardInput = document.querySelector('.learn--card__input');
    cardInput.focus();
    const inputWidth = Math.ceil(HomeHandler.getTextWidth(HomeHandler.currentWord.word, 'bold 20px Montserrat'));
    cardInput.style.width = `${inputWidth}px`;
  },

  initHomeHandler: (word) => {
    HomeHandler.currentWord = word;
    HomeHandler.setInputWidthAndFocus();
    HomeHandler.addCardClickHandler();
    HomeHandler.addCardKeyHandler();
    HomeHandler.addButtonsClickHandler();
  },
};

export default HomeHandler;
