const WordsHelper = {
  /** вернуть массив НЕудаленных слов */
  removeDeletedWords: (wordsArr) => {
    return wordsArr.filter((wordObj) => wordObj.optional.state !== 'deleted');
  },

  /** вернуть слова, у которых дата совпадает с переданной датой */
  filterWordsWithDate: (wordsArr, date) => {
    return wordsArr.filter((wordObj) => wordObj.optional.date === date);
  },

  /** вернуть слова, у которых дата указана, и она не соответствует переданной */
  filterWordsDateSpecNotToday: (wordsArr, date) => {
    return wordsArr.filter((wordObj) =>
      (wordObj.optional.date !== "none" && wordObj.optional.date !== date)
    );
  },

  /** 
   * сформировать готовый массив выученных слов 
   * @param {Array} wordsArraysObj - {
   *  wordsWithDateToday - слова с датой на сегодня, 
   *  wordsWithoutDate - слова без даты,
   *  wordsWithDateSpecified - слова с датой, но НЕ сегодняшней
   * @param {Number} needToBeLearnedWords - массив какой длины должен быть на выходе
   * 
   * @return {Array} - массив переданной длины или меньше
   * */
  formLearnedArray: (wordsArraysObj, needToBeLearnedWords) => {
    const { todayWords, withoutDateWords, withDateWords } = wordsArraysObj;
    let resArr = todayWords.slice(0, needToBeLearnedWords + 1);
    if (resArr.length >= needToBeLearnedWords) {
      return resArr;
    }

    resArr = resArr.concat(withoutDateWords).slice(0, needToBeLearnedWords + 1);
    if (resArr >= needToBeLearnedWords) {
      return resArr;
    }

    resArr = resArr.concat(withDateWords).slice(0, needToBeLearnedWords + 1);
    return resArr;
  },

  /** получить массив из id-шников  */
  getIdsFromBook: (wordsArr) => {
    return wordsArr.map((wordObj) => wordObj.optional.idInBook);
  },

  /** получить id книг (по 600 слов) на основании id слов */
  getBooksIds: (wordsIdsArr) => {
    return wordsIdsArr.map((wordId) => (Math.floor(wordId / 600) + 1));
  },

  /** вернуть массив из wordId переданных слов */
  getWordsIds: (wordsArr) => {
    return wordsArr.map((word) => word.wordId);
  },

  /** 
   * подготовить объект для поиска по агрегированным словам 
   * @param {Array} wordsIdsArr - массив айдишников [idInBook],
   * 
   * @return {Object} - объект для запроса по агрегированным словамм
   * */
  getAggrWordsIds: (wordsIdsArr) => {
    const resArr = [];
    wordsIdsArr.forEach((id) => {
      const resObj = { 'userWord.optional.wordId': id };
      // const resObj = { 'userWord.optional.idInBook': id };
      resArr.push(resObj);
    });
    return { '$or': resArr };
  },

  /** подготовить массив для вывода на карточках 
   * @return {Array}:
   * все свойства из объекта слова (как в bookN.json) плюс:
   * userWord: {Object} - объект слова с бэкенда,
   * isNew: {Bool} - новое слово или изученное
  */
  prepareArrayForOutput: (wordsArr, isNewWord = false) => {
    return wordsArr.map((wordObj) => {
      const newWordObj = { ...wordObj };
      newWordObj.isNew = isNewWord;
      return newWordObj;
    });
  },

  addNewMark: (wordsArr) => {
    return wordsArr.map((id) => ({id : id, isNew: true}));
  },

  /** создать массив айдишников заданной длины */
  createArrOfIds: (countEls, startFrom, prefix) => {
    const newArr = Array(countEls);
    newArr.fill(startFrom);
    for (let i = 0; i < countEls; i +=1) {
      newArr[i] = newArr[i] + i;
    }

    return newArr.map((id) => `${prefix}${id.toString(16)}`);
  },

  /** сконвертировать id-шники из hex в dec */
  convertIdsFromHex: (idsArr) => {
    return idsArr.map((id) => parseInt(id.slice(id.length - 5), 16));
  },

  /** перемешать массив и вернуть новый перемешанный массив */
  shuffleArray: (arr) => {
    const newArr = arr.slice(0);
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  },

  /** вычислить group и page слова по его id */
  getGroupPageById: (id) => {
    const group = Math.floor(id / 600);
    const div = group % 600;
    const page = Math.floor(div / 20);
    return { group: group, page: page };
  },

  findWordInBatch: (batchArr, word) => {
    return batchArr.filter((wordObj) => wordObj.word === word)[0];
  }

};

export default WordsHelper;