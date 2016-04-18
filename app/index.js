require('./less/index.less');

import App from './components/App';
import ErrorHandler from './ErrorHandler';
import { wrapDom } from './utilities/dom';
import SpinImage from './images/loading.gif';

window.onerror = ErrorHandler;
window.newsRenderer = function newsRenderer(appContainer, ...others) {
  const app = new App(wrapDom(appContainer), SpinImage, ...others);
  app.render();
};
