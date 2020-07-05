import '../../../css/pages/promo.scss';

const Promo = {
  render: async () => {
    const view = /* html */`
    <div class="promo__background">
    <div class="promo">
        
        <div class="promo__quote">
            <p class="quote"><q>RSLang — лучший способ изучать английский язык</q><br>(Цитаты великих людей)</p>
        </div>
        <div class="video">!качественное видео, демонстрирующее работу приложения</div>
        <div class="promo__games">
            <div class="text">
                <h2>Оставь скуку в прошлом</h2>
                <p>Мы разработали шесть игр, которые делают изучение слов весёлым и интересным.</p>
            </div>
        </div>

        <div class="promo__game__cards">
            <div class="audition"><h3>Аудиовызов</h3></div>
            <div class="sprint"><h3>Спринт</h3></div>
            <div class="speakit"><h3>Скажи это</h3></div>
            <div class="puzzle"><h3>Пазл</h3></div>
            <div class="savannah"><h3>Саванна</h3></div>
            <div class="square"><h3>Буквенный квадрат</h3></div>
        </div>

        <div class="promo__interval, part">
            <div class="img"><img src="./src/img/promo/curve.jpg" alt=""></div>
            <div class="text">
                <h2>Повторение — мать учения</h2>
                <p>Забыть то, что уже выучено, — классическая трагедия каждого, кто изучает самостоятельно что-либо. В
                    RSLang мы внедрили методику интервального повторения, благодоря которой, запоминание будет
                    максимально эффективным, что сэкономит Вам время и увеличит скорость изучения языка.
                    !описание набора правил для определения интервала
                </p>
                <button class='repeat__button'>описание алгоритма повторения</button>
                           
        </div>
        <div class ="promo_algoritm hidden">
          <h3>Алгоритм интервального повторения RS Lang</h3>
          <p>Повторяем всё по 100500 раз и готово</p>
        </div>
        <div class="promo__responsive, part">
            <div class="text">
                <h2>Занимайся изучением всегда и везде, когда есть время</h2>
                <p>Завести ежедневную привычку — важнейший критерий успешного изучения языка, поэтому мы потрудились
                    сделать доступным RSLang на всех устройствах, чтоб Вы могли заниматься английским языком даже стоя в
                    очереди.</p>
            </div>
            <div class="img"><img src="./src/img/promo/cross-platform.png" alt=""></div>

        </div>
        <div class="promo__collection, part">
            <div class="img"><img src="./src/img/promo/graph.png" alt=""></div>
            <div class="text">
                <h2>Следи за своими достижениями</h2>
                <p>Для дополнительной мотивации, мы постарались визуализировать ваши успехи, ведь видеть свои
                    результаты бывает очень важно, чтоб не потерять задор в течение длительного обучения.
                </p>
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

export default Promo;
