import '../../../css/pages/statistics.scss';
import AppModel from '../../model/AppModel'

const Statistics = {
  render: async () => {
    const view = `
    <section class="statistic statistic__background">
    <div class="statistic__card">
      <h1 class="statistic__heading">Статистика изученных слов</h1>
      <div class="statistic__container">
        <div class="statistic__numberWordsStudied"></div>
        <div class="statistic__wordList">Cписок слов</div>
      </div>
      <canvas id="canvas" width="600px" height="300px"></canvas>
      <canvas id="canvas2" width="600px" height="300px"></canvas>
     <div class="statistic__percentageLearnedWords"></div>
    </div>
    </section>
          `;
    return view;
  },
  afterRender: async () => {
    const model = new AppModel();
    const words = await model.getWordsMappedByDates();
    console.log(words);
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const learnedWordsСount = [720, 1050];
    let percentageLearnedWords = 0;
    const amountDays = [1, 2, 3];
    const x0 = 80.5;
    const y1 = 280.5;
    let x1 = 480.5;
    let y0 = 10.5;

    //рисуем сетку
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

    //добавляем подписи к графику
    ctx.font = 'small-caps 15px Arial';
    for (let i = 0; i < 6; i += 1) {
      ctx.fillText((5 - i) * 20 + "%", 38.5, i * 52 + 19);
      ctx.beginPath();
      ctx.moveTo(30.5, i * 8 + 6);
      ctx.lineTo(30, i * 8 + 6);
      ctx.stroke();
    }
    for (let i = 0; i < amountDays.length; i += 1) {
      ctx.fillText(amountDays[i] + "", 75.5 + i * 40, 300);
      ctx.beginPath();
      ctx.moveTo(50.5 + i * 50, 300);
      ctx.lineTo(50.5 + i * 50, 300);
      ctx.stroke();
    }

    function percentageWords(learnedWordsСount) {
      percentageLearnedWords = (learnedWordsСount * 100) / 3600;
      console.log(percentageLearnedWords);
      return percentageLearnedWords;
    }

    let X = 80;
    let Y = 280;

    function drawGraph(learnedWordsСount) {
      for (let i = 0; i < learnedWordsСount.length; i += 1) {
        percentageWords(learnedWordsСount[i]);
        ctx.beginPath();
        ctx.moveTo(X, Y);
        console.log((learnedWordsСount[i] * 200) / 3600 + 50.5);
        console.log((percentageLearnedWords * 125) / 100);
        ctx.lineTo((learnedWordsСount[i] * 200) / 3600 + 50, 280 - ((percentageLearnedWords * 125) / 100));
        X = (learnedWordsСount[i] * 200) / 3600 + 50;
        Y = 280 - ((percentageLearnedWords * 125) / 100);
        console.log(X);
        console.log(Y);

        ctx.closePath();
        ctx.strokeStyle = 'rgb(0, 90, 5)';
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(X, Y, 3, 0, Math.PI * 2, false);
      ctx.fillStyle = 'rgb(0, 90, 5)';
      ctx.fill();
      ctx.closePath();
      ctx.stroke();
    }

    drawGraph(learnedWordsСount);

    const canvas2 = document.getElementById('canvas2');
    const ctx2 = canvas2.getContext('2d');

    ctx2.beginPath();
    ctx2.moveTo(50.5, 10);
    ctx2.lineTo(500.5, 10);
    ctx2.closePath();
    ctx2.strokeStyle = 'rgb(65, 65, 65)';
    ctx2.stroke();

    percentageWords(learnedWordsСount[learnedWordsСount.length - 1]);
    const a = percentageLearnedWords * 5;

    ctx2.beginPath();
    ctx2.moveTo(50.5, 10);
    ctx2.lineTo(a, 10);
    ctx2.arc(a, 10, 5, 0, Math.PI * 2, false);
    ctx2.fillStyle = 'rgb(0, 90, 5)';
    ctx2.fill();
    ctx2.closePath();
    ctx2.strokeStyle = 'rgb(0, 90, 5)';
    ctx2.stroke();

    document.querySelector('.statistic__numberWordsStudied').innerHTML = `Всего слов: ${learnedWordsСount[learnedWordsСount.length - 1]}`;
    document.querySelector('.statistic__percentageLearnedWords').innerHTML = `${Math.round(percentageLearnedWords)}% слов любого текста`;
  },

};

export default Statistics;
