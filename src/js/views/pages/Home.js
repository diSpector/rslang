import '../../../css/pages/home.scss';

const Home = {
  render: async () => {
    const view = /* html */`
    <section class="section login--container">
      <p>Ввести имейл (дефолтный 66group@user.com)</p>
      <input type="text" class="login--email__input" placeholder="66group@user.com" value="66group@user.com">
      <p>Ввести пароль(дефолтный Gfhjkm_123)</p>
      <input type="text" class="login--password__input" placeholder="Gfhjkm_123" value="Gfhjkm_123">
      <button class="login--create-user__button">Create user</button>
      <button class="login--login-user__button">Login user</button>
      <p>Лог и ошибки:</p>
      <div class="login--log_output"></div>
    </section>
          `;
    return view;
  },
  afterRender: async (model) => {
    const emailInput = document.querySelector('.login--email__input');
    const passwordInput = document.querySelector('.login--password__input');
    const createUserButton = document.querySelector('.login--create-user__button');
    const loginUserButton = document.querySelector('.login--login-user__button');
    const logOutput = document.querySelector('.login--log_output');
    createUserButton.addEventListener('click', async () => {
      await model.createUser({ 'email': emailInput.value, 'password': passwordInput.value });
    });
    loginUserButton.addEventListener('click', async () => {
      logOutput.innerHTML = `${emailInput.value} ${passwordInput.value}`;
      await model.loginUser({ 'email': "hello@user.com", 'password': "Gfhjkm_123" });
    });
  },

};

export default Home;
