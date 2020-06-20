import '../../../../../css/pages/games/english-puzzle/english-puzzle.scss';
import Utils from '../../../../services/Utils';
import Model from './helpers/Model';
import WordsHelper from './helpers/WordsHelper';

const EnglishPuzzle = {

  settings: {
    game: {}, /** {level, page, round } */
    words: [
      /** allWords: [ {id, group, page, word, translate, textExample, textExampleTranslate ...}]  */
      /** solvedWords: [] - слова (предложения), которые пользователь уже угадал*/
      /** currentWord: {} - слово (предложение) текущего раунда */
      /** shuffledCurrentWord: [] - слова текущего предложения в случайном порядке */
    ],
  },

  beforeRender: async () => {
    EnglishPuzzle.clearHeaderAndFooter();
    EnglishPuzzle.settings.game = await Model.getCurrentLevelPageRound();

    const { game: gameSettings } = EnglishPuzzle.settings;
    const words = await Model.getWordsFromBackend(gameSettings.level, gameSettings.page);
    const allWords = WordsHelper.correctWords(words);
    const solvedWords = WordsHelper.getSolvedBySettings(allWords, gameSettings.round);
    const currentWord = WordsHelper.getCurrentBySettings(allWords, gameSettings.round);
    const shuffledCurrentWord = WordsHelper.shuffleCurrent(currentWord);
    // const roundWord = ;
    
    EnglishPuzzle.settings.words = {
      allWords: allWords,
      solvedWords: solvedWords,
      currentWord: currentWord,
      shuffledCurrentWord: shuffledCurrentWord,

    };

    // EnglishPuzzle.settings = await Model.getWordsFromGithub(1, 10, 10);
    // EnglishPuzzle.settings.words = await Model.getWordsFromBackend(1, 2);
    // EnglishPuzzle.settings.words = await Model.getWordsFromGithub(1);
  },

  clearHeaderAndFooter: () => {
    Utils.clearBlock('.header');
    Utils.clearBlock('.footer');
  },

  render: async () => {
    await EnglishPuzzle.beforeRender();
    console.log('words', EnglishPuzzle.settings.words);
    console.log('game settings', EnglishPuzzle.settings.game);
    const view = `
    <div class="englishPuzzle">
    <div class="englishPuzzle__background"></div>
    <div class="englishPuzzle__logout"><div class="logout__button"></div></div>
    <div class="englishPuzzle__field">
      <div class="englishPuzzle__menu menu">
        <div class="englishPuzzle__controls controls">
          <div class="menu__level">
            <div class="level__title">Level:</div>
            <div class="level__list">
              <div class="level__current">1</div>
              <div class="level__menu dropdown__menu hidden">
                <div class="menu__item active" data-level="1">1</div>
              </div>
            </div>
          </div>
  
          <div class="menu__page">
            <div class="page__title">Page:</div>
            <div class="page__list">
              <div class="page__current">1</div>
              <div class="page__menu dropdown__menu hidden">
                <div class="menu__item active" data-page="1">1</div>
              </div>
            </div>
          </div>
        </div>
        <div class="menu__tips tips">
          <div class="tips__button tips__button-autosound tips__button-pushed" data-tip="autosound" title="Autoplay phrase"></div>
          <div class="tips__button tips__button-translate tips__button-pushed" data-tip="translate" title="Translation for phrase"></div>
          <div class="tips__button tips__button-audio tips__button-pushed" data-tip="audio" title="Listen pronunciation"></div>
          <div class="tips__button tips__button-picture tips__button-pushed" data-tip="picture" title="Picture tip"></div>
        </div>
      </div>
      <div class="englishPuzzle__sound sound">
        <div class="sound__icon sound__icon-disabled"></div>
      </div>
      <div class="englishPuzzle__translation">word translate</div>

      <div class="englishPuzzle__phrases phrases">
        
        <div class="englishPuzzle__phrases-done"></div>
        
        <div class="englishPuzzle__phrases-round"></div>
          
        <div class="englishPuzzle__task task">
          <div class="task__words"></div>
        </div>

      </div>
      <div class="englishPuzzle__task task">
        <div class="task__words"></div>
      </div>
      <div class="englishPuzzle__buttons gameButtons">
        <div class="gameButtons__button gameButtons__button-idk" data-button="idk">I don't know</div>
        <div class="gameButtons__button gameButtons__button-check" data-button="check">Check</div>
        <div class="gameButtons__button gameButtons__button-cont" data-button="cont">Continue</div>
        <div class="gameButtons__button gameButtons__button-res" data-button="res">Results</div>
      </div>
    </div>
  </div>
      `;
    return view;
  },

  afterRender: () => {
    const { words } = EnglishPuzzle.settings;

    EnglishPuzzle.fillDonePhrases();
    EnglishPuzzle.fillRoundPhrase();
    EnglishPuzzle.fillTaskPhrase();

    EnglishPuzzle.addListeners();

  },

  
  /** наполнить поле с выполненными фразами */
  fillDonePhrases() {
    const donePhrasesContainer = document.querySelector('.englishPuzzle__phrases-done');
    const donePhrases = this.settings.words.solvedWords;

    donePhrases.forEach((phrase, i) => {
      const phraseBlock = Utils.createBlockInside('div', 'englishPuzzle__phrase');
      Utils.createBlockInside('div', 'phrase__number', phraseBlock, i + 1);
      const phraseWordsBlock = Utils.createBlockInside('div', 'phrase__words', phraseBlock);

      const wordsArr = phrase.textExample.split(' ');
      wordsArr.forEach((word) => Utils
        .createBlockInside('div', 'phrase__word', phraseWordsBlock, word));
      donePhrasesContainer.append(phraseBlock);
    });
  },

  /** наполнить поле для текущего раунда */
  fillRoundPhrase() {
    const wordsInRound = this.settings.words.shuffledCurrentWord.length;
    const doneRounds = this.settings.words.solvedWords.length;
    const roundPhrases = [...Array(wordsInRound)];

    const roundPhraseContainer = document.querySelector('.englishPuzzle__phrases-round');
    const roundPhraseInnerContainer = Utils.createBlockInside('div', 'englishPuzzle__phrase', roundPhraseContainer);
    Utils.createBlockInside('div', ['phrase__number', 'phrase__number-current'], roundPhraseInnerContainer, doneRounds + 1);
    const currentPhraseContainer = Utils.createBlockInside('div', 'phrase__words', roundPhraseInnerContainer);

    roundPhrases.forEach((word) => {
      Utils.createBlockInside('div', ['phrase__word', 'empty'], currentPhraseContainer, word);
    })
  },

  /** наполнить поле с заданием (для перемешанных слов) */
  fillTaskPhrase() {
    const shuffledCurrentWord = this.settings.words.shuffledCurrentWord;
    const taskPhraseContainer = document.querySelector('.englishPuzzle__task .task__words');
    shuffledCurrentWord.forEach((word) => {
      Utils
        .createBlockInside('div', 'task__word', taskPhraseContainer, word.text, {}, { orderTask: word.order + 1 });
    });
  },

  /** повесить слушатели событий */
  addListeners() {
    const taskWordsContainer = document.querySelector('.task__words');
    taskWordsContainer.addEventListener('click', this.processTaskWordClick);

    const roundWordsContainer = document.querySelector('.englishPuzzle__phrases-round .phrase__words');
    roundWordsContainer.addEventListener('click', this.processRoundWordClick);

  },

  processTaskWordClick: ({target}) => {
    if (!target.classList.contains('task__word')){
      return;
    }

    if (target.classList.contains('empty')){
      return;
    }

    // const elementWidth = target.offsetWidth;
    const elementWidth = target.getBoundingClientRect().width;
    console.log('elementWidth', elementWidth);

    const elementText = target.innerHTML;
    const dataOrder = target.dataset.orderTask;

    target.classList.add('empty');
    target.innerHTML = '';
    target.style.width = `${elementWidth}px`;
    target.style.flexGrow = '0';
    // EnglishPuzzle.puffClickedElement()

    const firstEmptyWord = document.querySelectorAll('.phrase__word.empty')[0];
    firstEmptyWord.innerHTML = elementText;
    firstEmptyWord.classList.remove('empty');
    firstEmptyWord.style.width = `${elementWidth}px`;
    firstEmptyWord.style.flexGrow = '0';
    firstEmptyWord.dataset.orderTask = dataOrder;

    // EnglishPuzzle.checkRoundWordFilled();
  },

  // checkRoundWordFilled() {
  //   const howManyWordsInRound = this.settings.words.shuffledCurrentWord.length;
  //   const howManyWordCollected = document.querySelectorAll('.englishPuzzle__phrases-round .phrase__word:not(.empty)');
  //   if (howManyWordsInRound === howManyWordCollected.length) {
  //     howManyWordCollected.forEach((elem) => elem.style = '');
  //   }
  //   // console.log('how many words' ,this.settings.words.shuffledCurrentWord.length);
  //   // console.log('how many collected' ,howManyWordCollected.length);
  // },

  processRoundWordClick: ({target}) => {
    if (target.classList.contains('empty')){
      return;
    }

    // const elementWidth = target.offsetWidth;

    const elementWidth = target.getBoundingClientRect().width;
    console.log('elementWidth', elementWidth);


    const elementText = target.innerHTML;
    const dataOrder = target.dataset.orderTask;

    target.classList.add('empty');
    target.innerHTML = '';
    target.style.width = `${elementWidth}px`;
    target.style.flexGrow = '0';
    // EnglishPuzzle.puffClickedElement()

    const taskEmptyWord = document.querySelectorAll('.task__words .task__word')[dataOrder-1];
    taskEmptyWord.innerHTML = elementText;
    taskEmptyWord.classList.remove('empty');
    taskEmptyWord.style.width = `${elementWidth}px`;
    taskEmptyWord.style.flexGrow = '0';
    taskEmptyWord.dataset.orderTask = dataOrder;
  },
};

export default EnglishPuzzle;

{/* <div class="phrase__word"
style="width:100px;"
data-order-task="1"
data-order-round="1"
>test</div> */}