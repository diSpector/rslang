import '../../../css/layout/header.scss';
import AppModel from '../../model/AppModel';


const Header = {
  render: async () => {
    const view = /* `
    <div class="header__content wrapper">
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
      
      <li class="header__navItem"><a href="#/cards">Изучение слов</a></li>
      <li class="header__navItem"><a href="#/stats">Статистика</a></li>
      <li class="header__navItem"><a href="#/dictionary">Словарь</a></li>
      <li class="header__navItem"><a href="#/games/all">Игры</a></li>
      <li class="header__navItem"><a href="#/promo">Промо-страница</a></li>
      <li class="header__navItem"><a href="#/team">О команде</a></li>
      <li class="header__navItem"><a href="#/login" class ='logout'>Войти</a></li>
    </div>
  </div>
</div>`
html */
`
<div class="header__wrapper">
            <div id="burger">
                <button class="header__burger"></button>
                <div class="header__burger-navigation notdisplay">
                    <div class="header__burger-nav">
                        <button class="header__burger rotate"></button>
                        <a href="#" class="logo logo-burger">
                            <h1>RS Lang</h1>
                        </a>
                        <nav class="header__navigation">
                            <a href="#/cards">Изучение слов</a>
                            <a href="#/stats">Статистика</a>
                            <a href="#/dictionary">Словарь</a>
                            <a href="#/games/all">Игры</a>
                            <a href="#/promo">О приложении</a>
                            <a href="#/team">Команда</a>
                            <a href="#/login" class='logout'>Войти</a>
                        </nav>
                    </div>
                </div>

            </div>
            <a href="#" class="logo">
                <h1>RS Lang</h1>
            </a>
            <nav class="header__navigation">
                <ul id="navigation">
                    <li class="nav-item__navigation"><a href="#/cards">Изучение слов</a></li>
                    <li class="nav-item__navigation"><a href="#/stats">Статистика</a></li>
                    <li class="nav-item__navigation"><a href="#/dictionary">Словарь</a></li>
                    <li class="nav-item__navigation"><a href="#/games/all">Игры</a></li>
                    <li class="nav-item__navigation"><a href="#/login" class='logout'>Войти</a></li>
                </ul>

            </nav>
        </div>
`

    ;
    return view;
  },
  afterRender: async () => {
    const model = new AppModel();
    const BURGER_BUTTON = document.querySelector('#burger');
   /* document.querySelector('.open-close-btn').addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('.overlay').classList.toggle('overlay-open');
      document.querySelector('#hamburger-icon').classList.toggle('hamburger-open');
    });

    */
    BURGER_BUTTON.addEventListener('click', (event) => {
    if (event.target.classList.contains('header__burger')) {
        if (document.querySelector('.header__burger-navigation').classList.contains('notdisplay')) {
            document.querySelector('.header__burger-navigation').classList.remove('notdisplay')
        }
        else {
            document.querySelector('.header__burger-navigation').classList.add('notdisplay')
        }
    }
})

    const logList = document.querySelectorAll('.logout');
    const logArray = Array.from(logList);

    if (await model.checkUser()){
      logArray.forEach(log => {
        log.onclick = () => model.logOutUser();
        log.textContent = 'Выйти';
        log.setAttribute('href', '#/');
      });
      
    }

    console.log(await model.checkUser());
  },


};

export default Header;
