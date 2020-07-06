import '../../../css/pages/learn.scss';
import HomeHandler from './HomeHandler';

const Home = {
  render: async () => {
    const view = `
    <div class="learn  wrapper">
        <section class="learn--progress">
            <div class="learn--progress__done">10</div>
            <div class="learn--progress__background">
                <div class="learn--progress__bar"></div>
            </div>
            <div class="learn--progress__total">30</div>
            </section>
        </section>

        <section class="learn--card">
            <header class="learn--card__header">
                <div class="learn--card__icon  learn--card__icon-book" title="Включить/выключить отбражение перевода"></div>
                <div class="learn--card__icon  learn--card__icon-inactive  learn--card__icon-headphones" title="Включить/выключить автовоспроизведение звука"></div>
                <div class="learn--card__icon  learn--card__icon-brain" title="Поместить слово в группу 'Сложные'"></div>
                <div class="learn--card__icon  learn--card__icon-delete" title="Удалить слово из изучения"></div>
                <div class="learn--card__icon  learn--card__icon-settings" title="Настройки"></div>
            </header>
            <main class="learn--card__content">
                <div class="learn--card__wrapper">
                    <img class="learn--card__image" src="https://raw.githubusercontent.com/dispector/rslang-data/master/files/06_0102.jpg">
                    <div class="learn--card__sentences">
                        <p class="learn--card__textMeaning">An <i>attribute</i> is a characteristic of a person or thing.</p>
                        <p class="learn--card__textMeaningTranslate">Атрибут является характеристикой человека или вещи</p>
                        <p class="learn--card__textExample">He isn’t very clever, but he does have some other positive <b>attributes</b>.</p>
                        <p class="learn--card__textExampleTranslate">Он не очень умен, но у него есть некоторые другие положительные качества</p>
                    </div>
                </div>
                <input class="learn--card__input" type="text">
                <p class="learn--card__transcription">[ǽtribjùːt]</p>
                <p class="learn--card__wordTranslate">атрибут</p>
            </main>
            <footer class="learn--card__complexity">
                <span class="learn--card__complexity-repeat">Снова</span>
                <span class="learn--card__complexity-hard">Трудно</span>
                <span class="learn--card__complexity-well">Хорошо</span>
                <span class="learn--card__complexity-easy">Легко</span>
            </footer>
        </section>

        <div class="learn--buttons">
            <button class="learn--button  learn--button-show">Показать ответ</button>
            <button class="learn--button  learn--button-next">Дальше</button>
        </div>
    </div>
    `;

    return view;
  },
  afterRender: async (model) => {
    const word = await model.getNewUnknownWord();
    console.log(word);
    HomeHandler.initHomeHandler();
  },

};

export default Home;
