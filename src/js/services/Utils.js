const Utils = {
  // --------------------------------
  //  Распарсить url на 3 составляющие - маршрут/id/действие
  // (например, post/1/update - маршрут для редактирования поста с id=1)
  //  Пример ближе к задаче - games/speakit (игры - SpeakIt)
  // --------------------------------
  parseRequestURL: () => {
    // получить из адресной строки всё после знака #, а затем разбить на массив по знаку /
    const url = window.location.hash.slice(1).toLowerCase() || '/';
    const r = url.split('/').slice(1);
    console.log('r array', r);
    const [resource, id, verb] = r;
    const request = {
      resource,
      id,
      verb,
    };

    return request;
  },

  /**
   * очистить блок с переданным селектором
   * @param string cssClass - селектор, который будет очищен
   */
  clearBlock: (cssClass) => {
    const element = document.querySelector(cssClass);
    element.innerHTML = '';
  },

  /**
   * удалить блок с переданным селектором
   * @param string cssClass - селектор, который будет удален
   */
  removeBlock: (cssClass) => {
    const element = document.querySelector(cssClass);
    element.remove();
  },
};

export default Utils;
