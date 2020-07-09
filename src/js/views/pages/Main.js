import '../../../css/pages/main.scss';

const Login = {
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
                      <button class="mainPage_button-login">Войти</button>
                      <button class="mainPage_button-signin">Зарегистироваться</button>
                    </div>
                  </div>
                  <div class="mainPage_promo_description"></div>
                </div>
                <div class="mainPage__content_blocks">
                  <div class="mainPage_block-card mainPage-bigCard">карточки</div>
                  <div class="mainPage_block-game mainPage-smallCard">игры</div>
                  <div class="mainPage_block-statistics mainPage-smallCard">статистика</div>
                  <div class="mainPage_block-team mainPage-smallCard">о команде</div>
                  <div class="mainPage_block-promo mainPage-smallCard">промо</div>
                  <div class="mainPage_block-dictionary mainPage-bigCard">словарь</div>
                </div>
              </div>
            </div>
          </div>
          `;

    return view;
  },
  afterRender: async () => {

  },
};

export default Login;
