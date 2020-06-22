export default function findingWord() {
  document.querySelector('#myTable').addEventListener('click',
    function e(element) {
      const id = element.target.id; 
      console.log(id);
      catchLetters(id);
    });

  function catchLetters(idLetters) {
    if (idLetters === 'myTable') {
      return;
    }
    if (document.getElementById(`${idLetters}`).classList.contains('td_active')) {
      document.getElementById(`${idLetters}`).classList.remove('td_active');
    } else {
      document.getElementById(`${idLetters}`).classList.add('td_active');
    }
  }
}