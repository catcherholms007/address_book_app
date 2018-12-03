import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react/';

import App from './containters/App';
import ContactStore from './stores/contactStore';
import PageStore from './stores/pageStore';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const stores = {
  contactStore: new ContactStore(),
  pageStore: new PageStore(),
};

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
