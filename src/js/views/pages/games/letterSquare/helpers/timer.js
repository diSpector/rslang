import generateStatistic from './generateStatistic';

let timer;
let time = 120;

const timerw = () => {
  document.querySelector('.letterSquare--game__time').innerHTML = time;
  time -= 1;
  if (time < 0) {
    clearTimeout(timer);
    if (document.querySelector('.letterSquare__statistic').classList.contains('letterSquare-hidden')) {
      generateStatistic();
    }
  } else {
    timer = setTimeout(timerw, 1000);
  }
};

export default timerw;
