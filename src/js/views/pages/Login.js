import '../../../css/pages/login.scss';

const Login = {
  render: async () => {
    const view = /* html */`
    <section class="section login--container">
      <div class="wrapper">
        <div class="login__card">
          <div class="login__card_control">
            <p class="login__control_button control-login selected">Авторизация</p>
            <p class="login__control_button control-signin">Регистрация</p>
          </div>
          <p class="login__card_label">Введите email</p>
          <input type="text" class="login--email__input" placeholder="Email">
          <p class="login__card_label">Введите пароль</p>
          <input type="text" class="login--password__input" placeholder="Пароль">
          <div class="login__card_buttons">
            <button class="login__card_button button-signin hidden">Зарегистрироваться</button>
            <button class="login__card_button button-login">Войти</button>
          </div>
        </div>
      </div>
    </section>
          `;

    return view;
  },
  afterRender: async (model) => {
/*     const emailInput = document.querySelector('.login--email__input');
    const passwordInput = document.querySelector('.login--password__input');
 */
    const createUserButton = document.querySelector('.button-signin');
    const loginUserButton = document.querySelector('.button-login');
    const controlLogin = document.querySelector('.login__card_control');

    controlLogin.addEventListener('click', ({ target }) => {
      if (!target.classList.contains('selected')) {
        target.classList.add('selected');
        if (target.classList.contains('control-login')) {
          document.querySelector('.control-signin').classList.remove('selected');
          document.querySelector('.button-login').classList.remove('hidden');
          document.querySelector('.button-signin').classList.add('hidden');
        } else if (target.classList.contains('control-signin')) {
          document.querySelector('.control-login').classList.remove('selected');
          document.querySelector('.button-signin').classList.remove('hidden');
          document.querySelector('.button-login').classList.add('hidden');
        }
      }
      console.log(target.classList);
    });
    createUserButton.addEventListener('click', async () => {
/*       const responce = await model.createUser({ email: emailInput.value, password: passwordInput.value });
      if (responce.error) {
      } else {
        logOutput.innerHTML = 'user created';
      } */
    });
    loginUserButton.addEventListener('click', async () => {
/*       console.log(emailInput.value + passwordInput.value);
      const responce = await model.loginUser({ email: emailInput.value, password: passwordInput.value });
      if (responce.error) {
        logOutput.innerHTML = responce.errorText;
      } else {
        logOutput.innerHTML = JSON.stringify(responce.data);
      } */
    });
  },
};

export default Login;
