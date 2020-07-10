import '../../../css/layout/header.scss';
import AppModel from '../../model/AppModel';


const Header = {
  render: async () => {
    const view = /* html */`
    <div class="header__content">
  <div class="burger">
    <a id="hamburger-icon" class="open-close-btn">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </a>
  </div>
  <h1 class="header__logo"><a href="/#">RS Lang</a></h1>
  <div id="myNav" class="overlay">
    <div class="overlay-content">
      <li class="header__navItem"><a href="#/">Главная</a></li>
      <li class="header__navItem"><a href="#/cards">Изучение слов</a></li>
      <li class="header__navItem"><a href="#/stats">Статистика</a></li>
      <li class="header__navItem"><a href="#/dictionary">Словарь</a></li>
      <li class="header__navItem"><a href="#/games/all">Игры</a></li>
      <li class="header__navItem"><a href="#/promo">Промо-страница</a></li>
      <li class="header__navItem"><a href="#/team">О команде</a></li>
      <li class="header__navItem"><a href="#/login" class ='logout'>Войти</a></li>
    </div>
  </div>
</div>
    `;
    return view;
  },
  afterRender: async () => {
    const model = new AppModel();

    document.querySelector('.open-close-btn').addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('.overlay').classList.toggle('overlay-open');
      document.querySelector('#hamburger-icon').classList.toggle('hamburger-open');
    });
    const log = document.querySelector('.logout');

    if (await model.checkUser()){
      log.onclick = () => model.logOutUser();
      log.textContent = 'Выйти';
      log.setAttribute('href', '#/');
    }

    console.log(await model.checkUser());
    
  },


};

export default Header;
