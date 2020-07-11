import '../../../css/pages/promo.scss';

const Promo = {
  render: async () => {
    const view = /* html */`
    <div class="promo">
      <div class="wrapper">
        <div class="promo__content">
          <div class="promo__content_banner">
            <h2 class="promo__content_banner-title">Изучай английский язык <span>на 30% эффективнее</span> с помощью <span>мини-игр</span> и методики <span>интервального повторения</span></h2>
          </div>
        </div>
        <div class="promo__content_text">
          <h2 class="promo__content_text-title">Английский язык? Он везде!</h2>
          <p class="promo__content_text-description">Как насчет того, чтобы смотреть в оригинале лучшие фильмы и сериалы, читать книги, и уверенно общаться с людьми за рубежом? Осталось только выучить английский язык. Хочешь сделать это быстро и эффективно? <span>Ты на верном пути</span>.</p>
        </div>
        <div class="promo__content_advantage">
          <h2 class="promo__content_advantage-title">Учить английский язык можно</h2>
          <div class="promo__content_adavntage-blocks">
            <div class="promo_advantage-fun adavntage-block">
              <p class="adavntage-block_text">Весело</p>
            </div>
            <div class="promo_advantage-method adavntage-block">
              <p class="adavntage-block_text">Эффективно</p>
            </div>
            <div class="promo_advantage-statistics adavntage-block">
              <p class="adavntage-block_text">Легко</p>

            </div>
          </div>
        </div>
        <div class="promo__content_method promo__content-block">
          <div class="promo__content_method-text content-block-text">
            <h2 class="promo__content_method-title">Методика интервального повторения</h2>
            <p class="promo__content_method-description">
            Слова на день всегда подбираются так, чтобы не дать тебе заскучать, но ты всегда можешь добавить гибкости. Считаешь, что некоторые слова слишком простые, а другие, наоборот, сложные, и постоянно забываются? Поставь отметку «Легко», и слово будет надолго исключено из показов, выбери «Сложно» - и увидишь его на следующей тренировке. 
            </p>
          </div>
          <div class="promo__content_method-image content-block-image"></div>
        </div>
        <div class="promo__content_game promo__content-block">
          <div class="promo__content_game-image content-block-image"></div>
          <div class="promo__content_game-text content-block-text">
            <h2 class="promo__content_game-title">Учиться – это весело!</h2>
            <p class="promo__content_game-description">
            Для закрепления материала у тебя есть целых 6 мини-игр с возможностью выбора уровня сложности! Тренируй понимание, произношение, грамматику, память, и даже внимательность! 
            </p>
          </div>
        </div>
        <div class="promo__content_statistic promo__content-block">
          <div class="promo__content_statistic-text content-block-text">
            <h2 class="promo__content_statistic-title">Отслеживай свой прогресс</h2>
            <p class="promo__content_statistic-description">
            Хочешь знать, какими шагами ты приближаешься к заветной цели каждый день? Удобный график и статистика всегда под рукой!            </p>
          </div>
          <div class="promo__content_statistic-image content-block-image"></div>
        </div>
      </div>
    </div>

          `;
    return view;
  },
  afterRender: async () => {

  },

};

export default Promo;
