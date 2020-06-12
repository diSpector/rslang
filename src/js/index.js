import App from '@modules/app';
import appConfig from '@settings/appConfig';
import apiConfig from '@settings/apiConfig';

import '../css/style.css';
import '../css/module.css';

const app = new App( 
  appConfig.obj,
  apiConfig.obj
);
app.init();
