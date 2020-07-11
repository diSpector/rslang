import '../../../css/pages/statistics.scss';
import AppModel from '../../model/AppModel'

const Statistics = {
  render: async () => {
    const view = `
    <section class="statistic statistic__background">
    <div class="statistic__card">
      <h1 class="statistic__heading"></h1>
      <div class="statistic__container">
        <div class="statistic__numberWordsStudied"></div>
        <div class="statistic__wordList">Cписок слов</div>
      </div>
      <canvas id="canvas" width="600px" height="300px"></canvas>
      <p class="statistic__data"></p>
      <canvas id="canvas2" width="600px" height="300px"></canvas>
     <div class="statistic__percentageLearnedWords"></div>
    </div>
    </section>
          `;
    return view;
  },
  afterRender: async (model) => {
    await model.loginUser({ email: '66group@gmail.com', password: 'Gfhjkm_123' });
    //const word = await model.getBothWordsAndCountByDates();
    //console.log(word);
    function drawStatistics(nameStatistics, dateAndWords) {
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      const learnedWordsСount = [];
      let percentageLearnedWords = 0;
      const amountDays = dateAndWords;
      const x0 = 80.5;
      const y1 = 280.5;
      let x1 = 480.5;
      let y0 = 10.5;

      /** количество дней */
      let counter = 0;
      for (let key in amountDays) {
        counter += 1;
      }

      /** даты */
      let dates = [];
      for (let key in amountDays) {
        dates.push(key);
      }

      /** массив количества слов */
      for (let i = 0; i < amountDays.length; i += 1) {
        const key = Object.values(amountDays[i]);
        learnedWordsСount.push(key[0]);
      }

      /** рисуем сетку */
      for (let i = 0; i < 6; i += 1) {
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y0);
        ctx.closePath();
        ctx.strokeStyle = 'rgb(65, 65, 65)';
        ctx.stroke();
        y0 += 54;
      }
      y0 = 10.5;
      x1 = 80.5;
      for (let i = 0; i < 6; i += 1) {
        ctx.beginPath();
        ctx.moveTo(x1, y0);
        ctx.lineTo(x1, y1);
        ctx.closePath();
        ctx.strokeStyle = 'rgb(65, 65, 65)';
        ctx.stroke();
        x1 += 80;
      }

      /** добавляем подписи к графику */
      ctx.font = 'small-caps 15px Arial';
      for (let i = 0; i < 6; i += 1) {
        ctx.fillText((5 - i) * 20 + "%", 38.5, i * 52 + 19);
        ctx.beginPath();
        ctx.moveTo(30.5, i * 8 + 6);
        ctx.lineTo(30, i * 8 + 6);
        ctx.stroke();
      }

      function percentageWords(learnedWordsСount) {
        percentageLearnedWords = (learnedWordsСount * 100) / 3600;
        return percentageLearnedWords;
      }

      let X = 80;
      let Y = 280;

      /** рисуем график */
      function drawGraph(learnedWordsСount) {
        for (let i = 0; i < learnedWordsСount.length; i += 1) {
          for (let j = 0; j < i; j += 1) {
            learnedWordsСount[i] += learnedWordsСount[j];
          }
          percentageWords(learnedWordsСount[i]);
          ctx.beginPath();
          ctx.moveTo(X, Y);
          ctx.lineTo((learnedWordsСount[i] * 400) / 3600 + 80, 280
            - ((percentageLearnedWords * 270) / 100));
          X = (learnedWordsСount[i] * 400) / 3600 + 80;
          Y = 280 - ((percentageLearnedWords * 270) / 100);
          ctx.closePath();
          ctx.strokeStyle = 'rgb(0, 90, 5)';
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(X, Y, 3, 0, Math.PI * 2, false);
          ctx.fillStyle = 'rgb(0, 90, 5)';
          ctx.fill();
          ctx.closePath();
          ctx.stroke();
        }
      }

      drawGraph(learnedWordsСount);

      /** рисуем линию с процентом изученных слов */
      const canvas2 = document.getElementById('canvas2');
      const ctx2 = canvas2.getContext('2d');
      percentageWords(learnedWordsСount[learnedWordsСount.length - 1]);
      const a = percentageLearnedWords * 5;
      console.log(a);

      ctx2.beginPath();
      ctx2.moveTo(60.5, 10);
      ctx2.lineTo(500.5, 10);
      ctx2.closePath();
      ctx2.strokeStyle = 'rgb(65, 65, 65)';
      ctx2.stroke();

      ctx2.beginPath();
      ctx2.moveTo(60.5, 10);
      ctx2.lineTo(a + 60.5, 10);
      ctx2.arc(a + 60.5, 10, 5, 0, Math.PI * 2, false);
      ctx2.fillStyle = 'rgb(0, 90, 5)';
      ctx2.fill();
      ctx2.closePath();
      ctx2.strokeStyle = 'rgb(0, 90, 5)';
      ctx2.stroke();
      document.querySelector('.statistic__heading').innerHTML = `${nameStatistics}`;
      document.querySelector('.statistic__numberWordsStudied').innerHTML = `Всего слов: ${learnedWordsСount[learnedWordsСount.length - 1]}`;
      document.querySelector('.statistic__percentageLearnedWords').innerHTML = `${Math.round(percentageLearnedWords)}% слов любого текста`;
    }
    drawStatistics('Статистика изученных слов', [{ '01.07.2020': 52 }, { '02.07.2020': 42 }, { '02.07.2020': 63 }]);


    function drawStatisticsforGame(name, array) {
      const amountDays = array;
      document.querySelector('.statistic__card').classList.add('statistic__hidden');

      let counter = 0;
      for (let key in amountDays) {
        counter += 1;
      }

      let dates = [];
      for (let i = 0; i < amountDays.length; i += 1) {
        for ( var property in amountDays[i] ) {
          dates.push(property);
          console.log( property );
        }
      }
      console.log(dates);

      const heading = document.createElement('h1');
      heading.setAttribute('class', 'statistic__heading--game');
      document.querySelector('.statistic').appendChild(heading);
      heading.innerHTML = `${name}`;

     const tableStatisticsGame = document.createElement('table');
      tableStatisticsGame.setAttribute('id', 'statistic__table');
      for (let i = 0; i < counter + 1; i += 1) {
        const tr = document.createElement('tr');
        for (let j = 0; j < 4; j += 1) {
          const td = document.createElement('td');
          td.setAttribute('id', `${i}${j}`);
          td.setAttribute('class', 'statistic__td');
          tr.appendChild(td);
        }
        tableStatisticsGame.appendChild(tr);
      }
      document.querySelector('.statistic').appendChild(tableStatisticsGame);
      document.getElementById('00').innerHTML = 'Даты игры:';
      document.getElementById('01').innerHTML = 'Количество сыгранных игр:';
      document.getElementById('02').innerHTML = 'Правильные ответы:';
      document.getElementById('03').innerHTML = 'Неправильные ответы:';

      for (let i = 1; i < counter + 1; i += 1) {
        const j = 0;
        document.getElementById(`${i}${j}`).innerHTML = `${dates[i - 1]}`;
      }
    }

    drawStatisticsforGame('English puzzle', [{ '01.07.2020': 52 }, { '02.07.2020': 42 }, { '02.07.2020': 63 }]);

  },


};

export default Statistics;
