export default function startTimer() {
  let time = document.getElementById('timer').textContent.split(':');
  function showTimeLess() {
    function addZero(x) {
      return ((x < 10) ? '0' : '') + x;
    }
    time = Math.round(0.001 * (sessionStorage.getItem('timeset') - performance.now()));
    document.getElementById('timer').textContent = [addZero(Math.floor(time / 60)), addZero(time % 60)].join(':');
    if (time) {
      setTimeout(showTimeLess, 345);
    }
    if (!time) {
      document.querySelector('.letterSquare__game').classList.add('letterSquare-hidden');
      document.querySelector('.letterSquare__statistic').classList.remove('letterSquare-hidden');
    }
  }
  sessionStorage.setItem('timeset', (time[0] * 60 + +time[1]) * 1000);
  showTimeLess();
}
