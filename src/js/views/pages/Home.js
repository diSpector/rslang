import '../../../css/pages/main.scss';

const Home = {
  render: async () => {
    const view = /* html */`
          <div class="mainPage">
            <div class="wrapper">
              <div class="maimPage__content">
                <div class="mainPage__content_promo">
                  <div class="mainPage_promo_image"></div>
                  <div class="mainPage_promo_text">
                    <h2 class="mainPage_promo_title">Учить английский язык с RS Lang легко и интересно</h2>
                    <p class="mainPage_promo_description">
                      RS Lang - это приложение для нескучного и эффективного изучения английского языка, в котором ты будешь изучать новые слова, проверять свои знания в различных играх и зарабатывать в них очки, а также отслеживать свой прогресс.
                    </p>
                    <div class="mainPage_promo_button">
                      <button class="mainPage_button-login" onclick="location.href='/#/login'">Войти</button>
                      <button class="mainPage_button-signin" onclick="location.href='/#/login'">Зарегистироваться</button>
                    </div>
                  </div>
                  <div class="mainPage_promo_description"></div>
                </div>
                <div class="mainPage__content_message hidden">
                <div class="mainPage_message-card">
                  <div class="mainPage_message-card_title">Раздел заблокирован</div>
                  <p class="mainPage_message-card_description">Для того чтобы перейти в этот раздел, необходимо авторизоваться.</p>
                  <button class="mainPage_message-card_button">Ok</button>
                </div>
              </div>
                <div class="mainPage__content_blocks">
                  <div class="mainPage_block-card mainPage-bigCard"">
                    <h2 class="mainPage_block-title">Карточки</h2>
                    <div class="mainPage-card-shadow"></div>
                    <div class="mainPage-card-locking"></div>
                  </div>
                  <div class="mainPage_block-game mainPage-smallCard">
                    <h2 class="mainPage_block-title">Игры</h2>
                    <div class="mainPage-card-shadow"></div>
                    <div class="mainPage-card-locking"></div>
                  </div>
                  <div class="mainPage_block-statistics mainPage-smallCard">
                    <h2 class="mainPage_block-title">Статистика</h2>
                    <div class="mainPage-card-shadow"></div>
                    <div class="mainPage-card-locking"></div>
                  </div>
                  <div class="mainPage_block-team mainPage-smallCard" onclick="location.href='/#/team'">
                    <h2 class="mainPage_block-title">О команде</h2>
                  </div>
                  <div class="mainPage_block-promo mainPage-smallCard" onclick="location.href='/#/promo'">
                    <h2 class="mainPage_block-title">Промо</h2>
                  </div>
                  <div class="mainPage_block-dictionary mainPage-bigCard">
                    <h2 class="mainPage_block-title">Словарь</h2>
                    <div class="mainPage-card-shadow"></div>
                    <div class="mainPage-card-locking"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `;

    return view;
  },
  afterRender: async (model) => {
    if (await model.checkUser()) {
      document.querySelectorAll('.mainPage-card-locking').forEach((item) => {
        item.classList.add('hidden');
      });
      document.querySelectorAll('.mainPage-card-shadow').forEach((item) => {
        item.classList.add('hidden');
      });
      document.querySelector('.mainPage__content_promo').classList.add('hidden');
      document.querySelector('.mainPage_block-card').onclick = () => {
        window.location.replace(`${window.location.origin}/#/cards`);
      };

      document.querySelector('.mainPage_block-game').onclick = () => {
        window.location.replace(`${window.location.origin}/#/games/all`);
      };

      document.querySelector('.mainPage_block-statistics').onclick = () => {
        window.location.replace(`${window.location.origin}/#/statistic`);
      };

      document.querySelector('.mainPage_block-dictionary').onclick = () => {
        window.location.replace(`${window.location.origin}/#/dictionary/:id`);
      };

    }
    document.querySelector('.mainPage__content_blocks').addEventListener('click', ({ target }) => {
      if (target.classList.contains('mainPage-card-locking')) {
        document.querySelector('.mainPage__content_message').classList.remove('hidden');
        document.querySelector('.mainPage_message-card_button').onclick = () => {
          document.querySelector('.mainPage__content_message').classList.add('hidden');
        };
      }
    });
  },
};

export default Home;
