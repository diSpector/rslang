import '../../../css/pages/home.scss';

const Home = {
  render: async () => {
    const view = /* html */`
    <section class="section login--container">
      <p>Ввести имейл (дефолтный 66group@gmail.com)</p>
      <input type="text" class="login--email__input" placeholder="66group@gmail.com" value="66group@gmail.com">
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
      const responce = await model.createUser({ email: emailInput.value, password: passwordInput.value });
      if (responce.error) {
        logOutput.innerHTML = responce.errorText;
      } else {
        logOutput.innerHTML = 'user created';
      }
    });
    loginUserButton.addEventListener('click', async () => {
      console.log(emailInput.value + passwordInput.value);
      const responce = await model.loginUser({ email: emailInput.value, password: passwordInput.value });
      if (responce.error) {
        logOutput.innerHTML = responce.errorText;
      } else {
        logOutput.innerHTML = JSON.stringify(responce.data);
      }
    });
  },

};

export default Home;
