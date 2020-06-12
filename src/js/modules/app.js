// import dummyImg from '../../img/bg1.jpg'; // для webpack

export default class App {
  constructor(appConfig, apiConfig) {
    this.appConfig = appConfig;
    this.apiConfig = apiConfig;
  }

  init() {
    console.log('Hello world');
  }

}