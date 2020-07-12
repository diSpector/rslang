import '../../../css/layout/footer.scss';

const Footer = {
  render: async () => {
    const view = /* html */`
    <div class="wrapper">
      <div class="footer__content">
        <div class="footer__links">
          <ul class="footer__navList">
            <li class="footer__navItem"><a href="#/">Главная</a></li>
            <li class="footer__navItem"><a href="#/cards">Изучение слов</a></li>
            <li class="footer__navItem"><a href="#/stats">Статистика</a></li>
            <li class="footer__navItem"><a href="#/dictionary">Словарь</a></li>
            <li class="footer__navItem"><a href="#/games/all">Игры</a></li>
            <li class="footer__navItem"><a href="#/promo">Промо-страница</a></li>
            <li class="footer__navItem"><a href="#/team">О команде</a></li>
          </ul>
        </div>
        <div class="footer__copyright">
          <span>© 2020 RSSchool Students</span>
        </div>
      </div>
    </div>
        `;
    return view;
  },
  afterRender: async () => { },
};

export default Footer;
